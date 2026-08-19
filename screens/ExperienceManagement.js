import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, Button } from '../components/Shared';
import { colors } from '../theme';
import { getStaffFittings } from '../services/api';

export default function ExperienceManagement({ navigate }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
      SCHEDULED: { label: '계획 대기', color: colors.blue?.text || '#2196F3' },
      IN_PROGRESS: { label: '진행 중', color: colors.green?.text || '#4CAF50' },
      COMPLETED: { label: '완료', color: colors.yellow?.text || '#FFC107' },
      CANCELLED: { label: '취소', color: '#999' },
    };
    return statusMap[status] || { label: status, color: colors.text };
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const todayReservations = reservations;

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('home')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>매장 체험 관리</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={() => handleDateChange(-1)}>
            <Text style={styles.dateArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.todaySection}>
            <View style={styles.todayHeader}>
              <Text style={styles.todayTitle}>예약 현황</Text>
              <Text style={styles.todayCount}>{todayReservations.length}건</Text>
            </View>
            <Text style={styles.todayDate}>
              {selectedDate.split('-')[1]}.{selectedDate.split('-')[2]}
            </Text>
          </View>

          <TouchableOpacity onPress={() => handleDateChange(1)}>
            <Text style={styles.dateArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reservationList}>
          {todayReservations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>예약이 없습니다</Text>
            </View>
          ) : (
            todayReservations.map((res) => {
              const statusInfo = getStatusInfo(res.status);
              return (
                <TouchableOpacity
                  key={res.id}
                  style={styles.reservationCard}
                  onPress={() => navigate('experience-detail', { reservationId: res.id })}
                >
                  <View style={styles.timeSection}>
                    <Text style={styles.time}>
                      {res.reserveTime || '시간 미정'}
                    </Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.customerName}>{res.customerName || '고객'}</Text>
                    <Text style={styles.program} numberOfLines={1}>
                      {res.program || '매장 체험'}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '20' }]}>
                      <Text style={[styles.statusBadgeText, { color: statusInfo.color }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                    <Text style={styles.detailLink}>› </Text>
                  </View>
                </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: { fontSize: 26, color: colors.text, lineHeight: 26 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  dateNavigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dateArrow: { fontSize: 24, color: colors.main, fontWeight: '700' },
  todaySection: { flex: 1, alignItems: 'center', marginHorizontal: 16 },
  todayHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 },
  todayTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  todayCount: { fontSize: 15, fontWeight: '600', color: colors.main },
  todayDate: { fontSize: 18, fontWeight: '700', color: colors.main, marginTop: 4 },
  reservationList: { gap: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14, color: colors.textMuted },
  reservationCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.accent2,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSection: { marginRight: 12 },
  time: { fontSize: 13, fontWeight: '700', color: colors.main, backgroundColor: colors.accent1, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  infoSection: { flex: 1 },
  customerName: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 2 },
  program: { fontSize: 12, color: colors.titleSub },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '600' },
  detailLink: { fontSize: 16, color: colors.textMuted },
});
