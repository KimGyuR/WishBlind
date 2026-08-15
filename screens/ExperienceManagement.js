import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

const RESERVATIONS = [
  {
    id: 1,
    date: '2024-08-20',
    time: '14:00',
    storeName: '송파점',
    status: '대기중',
    statusColor: colors.blue.text,
    memo: '기본 상담 예정',
  },
  {
    id: 2,
    date: '2024-08-18',
    time: '11:00',
    storeName: '강남점',
    status: '진행중',
    statusColor: colors.green.text,
    memo: '체험 진행 중',
  },
  {
    id: 3,
    date: '2024-08-15',
    time: '15:30',
    storeName: '명동점',
    status: '완료',
    statusColor: colors.yellow.text,
    memo: '취향 진단 완료',
  },
];

export default function ExperienceManagement({ navigate }) {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReservations = RESERVATIONS.filter((res) => {
    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'pending') return res.status === '대기중';
    if (selectedStatus === 'progress') return res.status === '진행중';
    if (selectedStatus === 'completed') return res.status === '완료';
    return true;
  });

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

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterBtn, selectedStatus === 'all' && styles.filterBtnActive]}
            onPress={() => setSelectedStatus('all')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedStatus === 'all' && styles.filterBtnTextActive,
              ]}
            >
              전체
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedStatus === 'pending' && styles.filterBtnActive]}
            onPress={() => setSelectedStatus('pending')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedStatus === 'pending' && styles.filterBtnTextActive,
              ]}
            >
              대기중
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedStatus === 'progress' && styles.filterBtnActive]}
            onPress={() => setSelectedStatus('progress')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedStatus === 'progress' && styles.filterBtnTextActive,
              ]}
            >
              진행중
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, selectedStatus === 'completed' && styles.filterBtnActive]}
            onPress={() => setSelectedStatus('completed')}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedStatus === 'completed' && styles.filterBtnTextActive,
              ]}
            >
              완료
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reservationList}>
          {filteredReservations.map((res) => (
            <TouchableOpacity
              key={res.id}
              style={styles.reservationCard}
              onPress={() => navigate('experience-detail', { reservation: res })}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.date}>{res.date} {res.time}</Text>
                  <Text style={styles.storeName}>{res.storeName}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: res.statusColor + '20' }]}>
                  <Text style={[styles.statusBadgeText, { color: res.statusColor }]}>
                    {res.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.memo}>{res.memo}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: colors.main,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.main,
    backgroundColor: colors.white,
  },
  filterBtnActive: {
    backgroundColor: colors.main,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.main,
  },
  filterBtnTextActive: {
    color: colors.white,
  },
  reservationList: {
    gap: 12,
  },
  reservationCard: {
    backgroundColor: colors.accent1,
    borderRadius: 16,
    padding: 16,
    paddingRight: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  date: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: 2,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  memo: {
    fontSize: 13,
    color: colors.subtitle,
    marginBottom: 8,
  },
  arrow: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'right',
  },
});
