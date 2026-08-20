import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header } from '../components/Shared';
import { colors } from '../theme';
import { getStaffFittings } from '../services/api';

export default function ExperienceManagement({ navigate }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadReservations();
  }, [selectedDate]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const response = await getStaffFittings(selectedDate);
      if (response.code === 'SUCCESS' && response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setReservations(data);
      }
    } catch (err) {
      Alert.alert('오류', err.message || '예약 정보를 불러올 수 없습니다');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      SCHEDULED: { label: '체험 대기...', color: colors.main },
      IN_PROGRESS: { label: '체험 중...', color: colors.main },
      COMPLETED: { label: '완료', color: colors.green.text },
      CANCELLED: { label: '취소', color: colors.textMuted },
    };
    return statusMap[status] || { label: status, color: colors.text };
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
      <ScrollView contentContainerStyle={styles.screen}>
        <Header title="매장 체험 관리" onBack={() => navigate('home')} />

        <View style={styles.todaySection}>
          <Text style={styles.todayTitle}>오늘의 예약</Text>
          <Text style={styles.todayDate}>
            {selectedDate.split('-').join('.')}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardCount}>{reservations.length}건</Text>

          {reservations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>예약이 없습니다</Text>
            </View>
          ) : (
            reservations.map((res, idx) => {
              const statusInfo = getStatusInfo(res.status);
              const isCancelled = res.status === 'CANCELLED';
              return (
                <View key={res.id}>
                  {idx > 0 && <View style={styles.divider} />}
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigate('experience-detail', { reservationId: res.id })}
                  >
                    <View style={styles.itemTopRow}>
                      <Text style={[styles.itemTime, isCancelled && styles.itemTimeMuted]}>
                        {res.reserveTime || '시간 미정'}
                      </Text>
                      <Text style={[styles.itemStatus, { color: statusInfo.color }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                    <Text style={[styles.itemCustomer, isCancelled && styles.itemTimeMuted]}>
                      {res.customerName || '고객'}
                    </Text>
                    <Text style={styles.itemProgram} numberOfLines={1}>
                      {res.program || '매장 체험'}
                    </Text>
                    <Text style={styles.itemDetailLink}>자세히 보기 ›</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  todaySection: { alignItems: 'center', marginTop: 4, marginBottom: 20 },
  todayTitle: { fontSize: 14, fontWeight: '700', color: colors.main, marginBottom: 4 },
  todayDate: { fontSize: 20, fontWeight: '700', color: colors.text },
  card: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 24,
    padding: 20,
  },
  cardCount: { fontSize: 13, fontWeight: '600', color: colors.titleSub, textAlign: 'right', marginBottom: 8 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14, color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  item: { gap: 4 },
  itemTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTime: { fontSize: 15, fontWeight: '700', color: colors.text },
  itemTimeMuted: { color: colors.textMuted, textDecorationLine: 'line-through' },
  itemStatus: { fontSize: 13, fontWeight: '600' },
  itemCustomer: { fontSize: 14, fontWeight: '600', color: colors.text, marginTop: 4 },
  itemProgram: { fontSize: 13, color: colors.titleSub },
  itemDetailLink: { fontSize: 13, fontWeight: '600', color: colors.main, textAlign: 'right', marginTop: 6 },
});
