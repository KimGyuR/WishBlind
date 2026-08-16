import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header } from '../components/Shared';
import { colors } from '../theme';

const CANDIDATES = [
  {
    id: 'a',
    name: '후보 A 이름',
    best: true,
    match: 92,
    stars: '★★★★★',
    starLabel: '가장 추천',
    tags: ['실용적인 선물', '블랙 취향 반영'],
  },
  { id: 'b', name: '후보 B 이름', best: false, match: 73 },
  { id: 'c', name: '후보 C 이름', best: false, match: 67 },
];

export default function AIResults({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="AI 추천 결과" onBack={() => navigate('home')} />

        <Text style={styles.desc}>두 사람의 정보를 분석하여{'\n'}가장 적합한 후보를 찾았습니다.</Text>

        {CANDIDATES.map((c) => (
          <View key={c.id} style={{ marginBottom: 16 }}>
            {c.best && <Text style={styles.bestLabel}>[BEST] {c.name}</Text>}
            <View style={[styles.card, c.best && styles.cardBest]}>
              <Text style={styles.cardName}>{c.best ? c.name : c.name}</Text>

              {c.best ? (
                <>
                  <Text style={styles.stars}>
                    {c.stars} <Text style={styles.starLabel}>{c.starLabel}</Text>
                  </Text>
                  <Text style={styles.matchText}>취향 일치 {c.match}%</Text>
                  {c.tags.map((t) => (
                    <Text key={t} style={styles.tagLine}>
                      ✓ {t}
                    </Text>
                  ))}
                </>
              ) : (
                <Text style={styles.matchText}>취향 일치 {c.match}%</Text>
              )}

              <TouchableOpacity onPress={() => navigate('ai-detail')}>
                <Text style={styles.seeMore}>자세히 보기 ›</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: { fontSize: 13, color: colors.stepDesc, textAlign: 'center', marginBottom: 20 },
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