import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { FakeStatusBar, Button, LogoBlock, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';
import { getGiftSessions } from '../services/api';

// 라벨은 서버가 내려주는 statusLabel을 그대로 쓰고(새 상태가 추가돼도 항상 맞음),
// 여기서는 색상/점 표시만 상태별로 매핑한다.
const STATUS_STYLE = {
  CREATED: { dot: '⚪', color: colors.titleSub },
  INVITED: { dot: '🟡', color: colors.yellow?.text || '#FFC107' },
  ANALYZING: { dot: '🔵', color: colors.blue?.text || '#2196F3' },
  RECOMMENDED: { dot: '🟢', color: colors.green?.text || '#4CAF50' },
  SELECTED: { dot: '✅', color: colors.green?.text || '#4CAF50' },
  PREPARING: { dot: '📦', color: '#FF9800' },
  PAID: { dot: '💰', color: colors.green?.text || '#4CAF50' },
  DELIVERED: { dot: '✔️', color: colors.green?.text || '#4CAF50' },
  OPENED: { dot: '🎉', color: colors.green?.text || '#4CAF50' },
};

const getStatusInfo = (item) => {
  const style = STATUS_STYLE[item.status] || { dot: '❓', color: colors.text };
  return { ...style, label: item.statusLabel || item.status };
};

// 백엔드에 권한 개념이 없어서 프론트에서만 특정 계정을 직원으로 취급한다(진짜 보안 아님, 데모용).
const STAFF_EMAILS = ['admin@wishblind.com'];

export default function Home({ navigate }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = global.userId;
  const isStaff = STAFF_EMAILS.includes(global.userEmail);

  useEffect(() => {
    loadGiftSessions();
  }, []);

  const loadGiftSessions = async () => {
    try {
      if (!userId) return;
      const response = await getGiftSessions(userId);
      if (response.code === 'SUCCESS' && response.data) {
        setHistory(response.data);
      }
    } catch (err) {
      console.error('Failed to load gift sessions:', err);
    } finally {
      setLoading(false);
    }
  };

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
          {isStaff && (
            <Button title="매장 체험 관리" full variant="secondary" onPress={() => navigate('experience-management')} />
          )}
        </View>

        <View style={styles.topDivider} />

        <View style={styles.outerCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>최근 진행한 선물</Text>
            <Text style={styles.cardCount}>({history.length}건)</Text>
          </View>

          {history.length === 0 ? (
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
              {history.map((item) => {
                const statusInfo = getStatusInfo(item);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.historyItem}
                    onPress={() => {
                      global.currentSessionId = item.id;
                      navigate('gift-session-detail', { sessionId: item.id });
                    }}
                  >
                    <View style={styles.historyTopRow}>
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.dot} {statusInfo.label}
                      </Text>
                      <Text style={styles.historyArrow}>›</Text>
                    </View>
                    <View style={styles.historyBottomRow}>
                      <Text style={styles.historyTitle}>{item.occasion || '선물'}</Text>
                      <Text style={styles.historySub}>{item.relationship}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
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
