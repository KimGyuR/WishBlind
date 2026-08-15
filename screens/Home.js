import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { FakeStatusBar, Button, LogoBlock, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';

const HISTORY = [
  { id: 1, status: 'ai_done', title: '기념일 선물', sub: '멋쟁이 사자', statusLabel: 'AI 추천 완료', dot: '🟢', color: colors.green.text },
  { id: 2, status: 'delivering', title: '취업 축하 선물', sub: '여자친구', statusLabel: '배송 준비 중', dot: '🔵', color: colors.blue.text },
  { id: 3, status: 'waiting', title: '생일 선물', sub: '친구A', statusLabel: '취향 입력 대기', dot: '🟡', color: colors.yellow.text },
];

export default function Home({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={{ alignItems: 'flex-end', paddingTop: 6, paddingBottom: 4 }}>
          <TouchableOpacity onPress={() => navigate('personal')}>
            <ProfileIcon size={22} color={colors.main} />
          </TouchableOpacity>
        </View>

        <LogoBlock style={{ marginBottom: 24, marginTop: 4 }} />

        <View style={{ gap: 14, marginBottom: 20 }}>
          <Button title="선물 시작하기" full onPress={() => navigate('gift-step1')} />
          <Button title="초대받고 취향 입력하기" full onPress={() => navigate('invite-confirm')} />
          <Button title="매장 체험 관리" full variant="secondary" onPress={() => navigate('experience-management')} />
        </View>

        <View style={styles.topDivider} />

        <View style={styles.outerCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>최근 진행한 선물</Text>
            <Text style={styles.cardCount}>({HISTORY.length}건)</Text>
          </View>

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
            <View style={{ gap: 12 }}>
              {HISTORY.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.historyItem}
                  onPress={() => (item.status === 'ai_done' ? navigate('ai-results') : null)}
                >
                  <View style={styles.historyTopRow}>
                    <Text style={[styles.statusText, { color: item.color }]}>
                      {item.dot} {item.statusLabel}
                    </Text>
                    <Text style={styles.historyArrow}>›</Text>
                  </View>
                  <View style={styles.historyBottomRow}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <Text style={styles.historySub}>{item.sub}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  topDivider: { height: 1, backgroundColor: colors.border, marginBottom: 20 },
  outerCard: {
    backgroundColor: colors.accent1,
    borderRadius: 32,
    padding: 20,
  },
  sectionHeader: { alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: '500', color: colors.subtitle },
  cardCount: { fontSize: 15, color: colors.subtitle },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  emptyLink: { color: colors.main, fontWeight: '600', textDecorationLine: 'underline' },
  historyItem: {
    backgroundColor: colors.bg,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  historyTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusText: { fontSize: 14, fontWeight: '500' },
  historyArrow: { fontSize: 16, color: colors.textMuted },
  historyBottomRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  historyTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  historySub: { fontSize: 14, color: colors.titleSub },
});