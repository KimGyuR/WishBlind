import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header } from '../components/Shared';
import { colors } from '../theme';
import { getRecommendations } from '../services/api';

export default function AIResults({ navigate, route }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionId = route?.params?.sessionId || global.currentSessionId;

  useEffect(() => {
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

      const response = await getRecommendations(userId, sessionId);
      if (response.code === 'SUCCESS' && response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setCandidates(data);
      } else {
        Alert.alert('오류', response.message || '추천 결과를 불러올 수 없습니다');
      }
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
            <View key={c.id || idx} style={{ marginBottom: 16 }}>
              {idx === 0 && <Text style={styles.bestLabel}>[BEST] {c.productName}</Text>}
              <View style={[styles.card, idx === 0 && styles.cardBest]}>
                <Text style={styles.cardName}>{c.productName}</Text>

                {idx === 0 ? (
                  <>
                    <Text style={styles.stars}>
                      ★★★★★ <Text style={styles.starLabel}>가장 추천</Text>
                    </Text>
                    <Text style={styles.matchText}>취향 일치 {c.matchPercentage || 95}%</Text>
                    {c.tags && c.tags.map((t) => (
                      <Text key={t} style={styles.tagLine}>
                        ✓ {t}
                      </Text>
                    ))}
                  </>
                ) : (
                  <Text style={styles.matchText}>취향 일치 {c.matchPercentage || 80}%</Text>
                )}

                <TouchableOpacity onPress={() => {
                  global.currentRecommendationId = c.id;
                  navigate('ai-detail', { recommendationId: c.id });
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
