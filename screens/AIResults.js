import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header } from '../components/Shared';
import { colors } from '../theme';

const CANDIDATES = [
  { id: 'a', name: '후보 A 이름', match: 92, best: true, tags: ['실용적인 선물', '블라 취향 반영'] },
  { id: 'b', name: '후보 B 이름', match: 73, best: false, tags: ['취향 반영'] },
  { id: 'c', name: '후보 C 이름', match: 65, best: false, tags: ['예산 적합'] },
];

export default function AIResults({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="AI 추천 결과" onBack={() => navigate('home')} />

        <Text style={styles.desc}>두 사람의 정보를 분석하여{'\n'}가장 적합한 상품을 골랐습니다.</Text>

        {CANDIDATES.map((c) => (
          <View key={c.id} style={[styles.card, c.best && styles.cardBest]}>
            {c.best && (
              <View style={styles.bestTag}>
                <Text style={styles.bestTagText}>[BEST] 후보 A</Text>
              </View>
            )}
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{c.name}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>취향 일치 {c.match}%</Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              {c.tags.map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>✔ {t}</Text>
                </View>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.footerNote}>블라 취향 납량</Text>
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
  desc: { fontSize: 13, color: colors.textMuted, marginBottom: 18, textAlign: 'center' },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: colors.accent1,
  },
  cardBest: { borderColor: colors.main },
  bestTag: {
    backgroundColor: colors.main,
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  bestTagText: { color: colors.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardName: { fontSize: 15, fontWeight: '700', color: colors.text },
  matchBadge: { backgroundColor: '#fdf0f3', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 9 },
  matchBadgeText: { fontSize: 11, fontWeight: '700', color: colors.main },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  tag: { backgroundColor: colors.accent1, borderRadius: 8, paddingVertical: 3, paddingHorizontal: 9 },
  tagText: { fontSize: 11, color: colors.textMuted },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerNote: { fontSize: 12, color: colors.textMuted },
  seeMore: { fontSize: 12, color: colors.main, fontWeight: '600', textDecorationLine: 'underline' },
});
