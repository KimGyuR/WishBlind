import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button, LogoBlock } from '../components/Shared';
import { colors } from '../theme';

const HISTORY = [
  { id: 1, status: 'ai_done', title: '기념일 선물', sub: '남명이 사자', statusLabel: 'AI 추천 완료', color: 'green' },
  { id: 2, status: 'delivering', title: '취업 축하 선물', sub: '이여친구', statusLabel: '배송 진행 중', color: 'blue' },
  { id: 3, status: 'waiting', title: '생일 선물', sub: '친구A', statusLabel: '취향 입력 대기', color: 'yellow' },
];

export default function Home({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={{ alignItems: 'flex-end', paddingTop: 6, paddingBottom: 4 }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 22 }}>👤</Text>
          </TouchableOpacity>
        </View>

        <LogoBlock style={{ marginBottom: 28, marginTop: 8 }} />

        <Button title="선물 시작하기" full style={{ marginBottom: 10 }} onPress={() => navigate('gift-step1')} />
        <Button
          title="초대받고 취향 입력하기"
          full
          variant="secondary"
          style={{ marginBottom: 24 }}
          onPress={() => navigate('invite-confirm')}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>최근 진행한 선물</Text>
          <Text style={styles.cardCount}>({HISTORY.length}건)</Text>

          {HISTORY.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎁</Text>
              <Text style={styles.emptyText}>
                아직 진행중인 선물이 없습니다.{'\n'}
                <Text style={styles.emptyLink} onPress={() => navigate('gift-step1')}>
                  새로운 선물을 준비해보세요!
                </Text>
              </Text>
            </View>
          ) : (
            HISTORY.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyItem}
                onPress={() => (item.status === 'ai_done' ? navigate('ai-results') : null)}
              >
                <View>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historySub}>{item.sub}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <View style={[styles.badge, { backgroundColor: colors[item.color].bg }]}>
                    <Text style={{ color: colors[item.color].text, fontSize: 11, fontWeight: '600' }}>
                      ● {item.statusLabel}
                    </Text>
                  </View>
                  <Text style={styles.historyArrow}>›</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  cardCount: { fontSize: 12, color: colors.textMuted, marginBottom: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  emptyLink: { color: colors.main, fontWeight: '600', textDecorationLine: 'underline' },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent1,
  },
  historyTitle: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 4 },
  historySub: { fontSize: 12, color: colors.textMuted },
  badge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10 },
  historyArrow: { fontSize: 16, color: colors.textMuted },
});
