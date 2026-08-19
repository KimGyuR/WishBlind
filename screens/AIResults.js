import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header } from '../components/Shared';
import { colors } from '../theme';
import { getRecommendations, generateRecommendations } from '../services/api';

export default function AIResults({ navigate, route }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionId = route?.params?.sessionId || global.currentSessionId;

  useEffect(() => {
    // AIDetail/GiftDelivery/GiftPayment는 route params가 아니라 global.currentSessionId를 읽으므로
    // route로 sessionId를 받아 들어온 경우 여기서 반드시 동기화해줘야 한다.
    global.currentSessionId = sessionId;
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const userId = global.userId;
      if (!userId || !sessionId) {
        Alert.alert('오류', '세션 정보가 없습니다');
        navigate('home');
        return;
      }

      // 아직 추천이 생성된 적 없는 세션일 수 있으므로 먼저 조회해보고,
      // 비어있으면 생성(POST)까지 이어서 시도한다 — 이걸 트리거하는 곳이 여기 말고는 없음.
      let data = [];
      try {
        const response = await getRecommendations(userId, sessionId);
        if (response.code === 'SUCCESS' && response.data) {
          data = Array.isArray(response.data) ? response.data : [response.data];
        }
      } catch (e) {
        // 아직 생성 전이면 조회가 실패할 수 있음 — 아래에서 생성 시도
      }

      if (data.length === 0) {
        const genResponse = await generateRecommendations(userId, sessionId);
        if (genResponse.code === 'SUCCESS' && genResponse.data) {
          data = Array.isArray(genResponse.data) ? genResponse.data : [genResponse.data];
        } else {
          Alert.alert('오류', genResponse.message || '추천 결과를 생성할 수 없습니다');
        }
      }

      setCandidates(data);
    } catch (err) {
      Alert.alert('오류', err.message || '추천 결과 조회 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="AI 추천 결과" onBack={() => navigate('home')} />

        <Text style={styles.desc}>두 사람의 정보를 분석하여{'\n'}가장 적합한 후보를 찾았습니다.</Text>

        {candidates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>추천 결과가 없습니다</Text>
          </View>
        ) : (
          candidates.map((c, idx) => (
            <View key={c.recommendationId || idx} style={{ marginBottom: 16 }}>
              {idx === 0 && <Text style={styles.bestLabel}>[BEST] {c.productName}</Text>}
              <View style={[styles.card, idx === 0 && styles.cardBest]}>
                <Text style={styles.cardName}>{c.productName}</Text>

                {idx === 0 ? (
                  <>
                    <Text style={styles.stars}>
                      ★★★★★ <Text style={styles.starLabel}>가장 추천</Text>
                    </Text>
                    <Text style={styles.matchText}>취향 일치 {c.matchRate}%</Text>
                    {c.tags && c.tags.map((t) => (
                      <Text key={t} style={styles.tagLine}>
                        ✓ {t}
                      </Text>
                    ))}
                  </>
                ) : (
                  <Text style={styles.matchText}>취향 일치 {c.matchRate}%</Text>
                )}

                <TouchableOpacity onPress={() => {
                  global.currentRecommendationId = c.recommendationId;
                  navigate('ai-detail', { recommendationId: c.recommendationId });
                }}>
                  <Text style={styles.seeMore}>자세히 보기 ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: { fontSize: 13, color: colors.stepDesc, textAlign: 'center', marginBottom: 20 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 14, color: colors.textMuted },
  bestLabel: { fontSize: 13, fontWeight: '700', color: colors.main, marginBottom: 6, marginLeft: 4 },
  card: {
    borderWidth: 1,
    borderColor: '#f0d6dc',
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white,
  },
  cardBest: { borderColor: colors.main, borderWidth: 1.5 },
  cardName: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 6 },
  stars: { fontSize: 13, color: colors.main, marginBottom: 4 },
  starLabel: { fontSize: 12, color: colors.textMuted },
  matchText: { fontSize: 13, color: colors.titleSub, marginBottom: 6 },
  tagLine: { fontSize: 13, color: colors.text, marginBottom: 2 },
  seeMore: { fontSize: 13, color: colors.main, fontWeight: '600', marginTop: 8, textAlign: 'right' },
});
