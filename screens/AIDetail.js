import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';
import { getRecommendationDetail, finalizeGiftSession } from '../services/api';

export default function AIDetail({ navigate, route }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const recommendationId = route?.params?.recommendationId || global.currentRecommendationId;
  const sessionId = global.currentSessionId;

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const userId = global.userId;
      if (!userId || !recommendationId) {
        Alert.alert('오류', '추천 정보가 없습니다');
        navigate('ai-results');
        return;
      }

      const response = await getRecommendationDetail(userId, recommendationId);
      if (response.code === 'SUCCESS' && response.data) {
        setDetail(response.data);
      } else {
        Alert.alert('오류', response.message || '추천 상세 정보를 불러올 수 없습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '추천 상세 조회 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = async () => {
    if (!sessionId || !recommendationId) {
      Alert.alert('오류', '필수 정보가 없습니다');
      return;
    }

    setSelecting(true);
    try {
      const response = await finalizeGiftSession(global.userId, sessionId, recommendationId);
      if (response.code === 'SUCCESS') {
        setShowModal(true);
      } else {
        Alert.alert('오류', response.message || '상품 선택에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '상품 선택 중 오류가 발생했습니다');
    } finally {
      setSelecting(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>정보를 불러올 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="AI 추천 상세" onBack={() => navigate('ai-results')} />

        <View style={styles.productImg}>
          {detail.imageUrl ? (
            <Image source={{ uri: detail.imageUrl }} style={styles.productImage} resizeMode="cover" />
          ) : (
            <Text style={styles.productEmoji}>🎁</Text>
          )}
        </View>

        <Text style={styles.productName}>{detail.productName}</Text>
        {detail.brand && <Text style={styles.brand}>{detail.brand}</Text>}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>AI 추천 이유</Text>
        <View style={{ marginBottom: 14, gap: 3 }}>
          {detail.reasons ? (
            Array.isArray(detail.reasons) ? (
              detail.reasons.map((r) => (
                <Text key={r} style={styles.checkLine}>
                  ✓ {r}
                </Text>
              ))
            ) : (
              <Text style={styles.checkLine}>✓ {detail.reasons}</Text>
            )
          ) : (
            <Text style={styles.checkLine}>✓ AI가 추천한 상품입니다</Text>
          )}
        </View>

        <View style={styles.divider} />

        {detail.tasteAnalysis && (
          <>
            <Text style={styles.sectionTitle}>취향 분석</Text>
            <View style={{ marginBottom: 14 }}>
              {[
                ['색상', detail.tasteAnalysis.colorStars],
                ['스타일', detail.tasteAnalysis.styleStars],
                ['실용성', detail.tasteAnalysis.practicalityStars],
              ].map(([label, stars]) => (
                <View key={label} style={styles.scoreRow}>
                  <Text style={styles.scoreLabel}>{label}</Text>
                  <Text style={styles.stars}>{'★'.repeat(stars || 0)}{'☆'.repeat(5 - (stars || 0))}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />
          </>
        )}

        {detail.aiComment && (
          <>
            <Text style={styles.sectionTitle}>AI 코멘트</Text>
            <View style={[styles.box, { marginBottom: 14 }]}>
              <Text style={styles.boxText}>{detail.aiComment}</Text>
            </View>

            <View style={styles.divider} />
          </>
        )}

        {detail.considerations && (
          <>
            <Text style={styles.sectionTitle}>고려할 점</Text>
            <View style={[styles.box, { marginBottom: 20 }]}>
              {Array.isArray(detail.considerations) ? (
                detail.considerations.map((c) => (
                  <Text key={c} style={styles.considerLine}>
                    • {c}
                  </Text>
                ))
              ) : (
                <Text style={styles.considerLine}>• {detail.considerations}</Text>
              )}
            </View>
          </>
        )}

        <BtnRow>
          <Button title="다시 보기" onPress={() => navigate('ai-results')} />
          <Button title="이 상품 선택" onPress={handleSelectProduct} disabled={selecting} />
        </BtnRow>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.overlay}>
          <View style={styles.completeCard}>
            <Text style={styles.icon}>🎉</Text>
            <Text style={styles.title}>상품 선택 완료!</Text>
            <Text style={styles.desc}>
              선택하신 상품으로{'\n'}
              선물이 결정되었습니다.{'\n\n'}
              이제 배송 정보를 입력하고{'\n'}
              결제를 진행해주세요.
            </Text>
            <Button
              title="다음 단계"
              onPress={() => {
                setShowModal(false);
                navigate('gift-delivery');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  productImg: { height: 200, borderRadius: 16, backgroundColor: colors.accent1, justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%' },
  productEmoji: { fontSize: 64 },
  productName: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4, textAlign: 'center' },
  brand: { fontSize: 13, color: colors.titleSub, textAlign: 'center', marginBottom: 16 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  checkLine: { fontSize: 13, color: colors.text, lineHeight: 20 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  scoreLabel: { fontSize: 13, color: colors.titleSub },
  stars: { fontSize: 13, color: colors.main },
  box: { borderWidth: 1, borderColor: colors.main, borderRadius: 12, padding: 12, backgroundColor: colors.white },
  boxText: { fontSize: 12, color: colors.text, lineHeight: 18 },
  considerLine: { fontSize: 12, color: colors.text, lineHeight: 18, marginBottom: 6 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  completeCard: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  icon: { fontSize: 28, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 20 },
  desc: { fontSize: 13, color: '#595959', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
});
