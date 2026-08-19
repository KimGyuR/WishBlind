import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';
import { getFittingDetail, startFitting } from '../services/api';

export default function ExperienceDetail({ navigate, route }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const reservationId = route?.params?.reservationId;

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      if (!reservationId) {
        Alert.alert('오류', '예약 정보를 찾을 수 없습니다');
        navigate('experience-management');
        return;
      }

      const response = await getFittingDetail(reservationId);
      if (response.code === 'SUCCESS' && response.data) {
        setDetail(response.data);
      } else {
        Alert.alert('오류', response.message || '예약 정보를 불러올 수 없습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '예약 정보 조회 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleStartFitting = async () => {
    setStarting(true);
    try {
      const response = await startFitting(reservationId);
      if (response.code === 'SUCCESS') {
        navigate('experience-progress', { reservationId });
      } else {
        Alert.alert('오류', response.message || '체험 시작에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '체험 시작 중 오류가 발생했습니다');
    } finally {
      setStarting(false);
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
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-management')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>체험 예약 상세</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 예약 정보 카드 */}
        <View style={styles.reservationCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.cardLabel}>예약 정보</Text>
              <Text style={styles.customerInfo}>
                {detail.customerName || '고객'} 고객님
              </Text>
              <Text style={styles.program}>
                {detail.giftSession?.occasion || '선물'} 체험
              </Text>
            </View>
            <View>
              <Text style={styles.dateLabel}>
                {detail.reserveDate?.split('-')[1]}.{detail.reserveDate?.split('-')[2]} {detail.reserveTime || '시간 미정'}
              </Text>
            </View>
          </View>
        </View>

        {/* 예약정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>예약정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>카테고리</Text>
            <Text style={styles.infoValue}>{detail.giftSession?.category || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>브랜드</Text>
            <Text style={styles.infoValue}>{detail.giftSession?.brand || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>예산</Text>
            <Text style={styles.infoValue}>{detail.giftSession?.budgetMax || '-'}</Text>
          </View>
          {detail.giftSession?.meaning && (
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                {detail.giftSession.meaning}
              </Text>
            </View>
          )}

          {/* 추천 상품들 */}
          {detail.recommendationCandidates && detail.recommendationCandidates.length > 0 && (
            <View style={styles.brandGrid}>
              {detail.recommendationCandidates.map((rec, index) => (
                <View key={index} style={styles.brandItem}>
                  <View style={styles.brandImagePlaceholder}>
                    <Text style={styles.brandImageText}>👜</Text>
                  </View>
                  <Text style={styles.brandName} numberOfLines={2}>
                    {index === 0 ? '[BEST] ' : ''}{rec.productName}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 체험 항목 섹션 */}
        {detail.fittingItems && detail.fittingItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>체험 항목</Text>
            <View style={styles.detailsRow}>
              {detail.fittingItems.map((item, index) => (
                <View key={index} style={styles.detailBadge}>
                  <Text style={styles.detailText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Button
          title={starting ? '시작 중...' : '체험 시작하기'}
          full
          onPress={handleStartFitting}
          disabled={starting}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: { fontSize: 26, color: colors.text, lineHeight: 26 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  reservationCard: {
    backgroundColor: colors.accent1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: { fontSize: 12, color: colors.titleSub, marginBottom: 4 },
  customerInfo: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  program: { fontSize: 13, color: colors.titleSub },
  dateLabel: { fontSize: 13, fontWeight: '700', color: colors.main },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: 13, color: colors.titleSub },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  noteBox: { backgroundColor: colors.accent1, borderRadius: 12, padding: 12, marginTop: 12 },
  noteText: { fontSize: 12, color: colors.text, lineHeight: 18 },
  brandGrid: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  brandItem: { flex: 1, alignItems: 'center' },
  brandImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: colors.accent1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandImageText: { fontSize: 32 },
  brandName: { fontSize: 12, color: colors.text, textAlign: 'center' },
  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  detailBadge: { backgroundColor: colors.accent1, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  detailText: { fontSize: 12, color: colors.main, fontWeight: '600' },
});
