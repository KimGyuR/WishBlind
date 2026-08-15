import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

const RESERVATIONS = [
  {
    id: 1,
    date: '2026-08-06',
    timeStart: '14:00',
    timeEnd: '15:00',
    customerName: '김사자',
    program: '기본 ~ 취향 축하 선물',
    status: '계획 대기',
    statusColor: colors.blue.text,
  },
  {
    id: 2,
    date: '2026-08-06',
    timeStart: '18:00',
    timeEnd: '19:00',
    customerName: '김사자',
    program: '기본 ~ 취향 축하 선물',
    status: '계획 중',
    statusColor: colors.green.text,
  },
  {
    id: 3,
    date: '2026-08-06',
    timeStart: '14:00',
    timeEnd: '15:00',
    customerName: '김사자',
    program: '기본 ~ 취향 축하 선물',
    status: '완료',
    statusColor: colors.yellow.text,
  },
];

export default function ExperienceManagement({ navigate }) {
  const todayReservations = RESERVATIONS.filter((res) => res.date === '2026-08-06');

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

        <View style={styles.todaySection}>
          <View style={styles.todayHeader}>
            <Text style={styles.todayTitle}>오늘의 예약</Text>
            <Text style={styles.todayCount}>{todayReservations.length}건</Text>
          </View>
          <Text style={styles.todayDate}>2026.08.06</Text>
        </View>

        <View style={styles.reservationList}>
          {todayReservations.map((res) => (
            <TouchableOpacity
              key={res.id}
              style={styles.reservationCard}
              onPress={() => navigate('experience-detail', { reservation: res })}
            >
              <View style={styles.timeSection}>
                <Text style={styles.time}>{res.timeStart} ~ {res.timeEnd}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.customerName}>{res.customerName}</Text>
                <Text style={styles.program}>{res.program}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={[styles.statusBadge, { backgroundColor: res.statusColor + '20' }]}>
                  <Text style={[styles.statusBadgeText, { color: res.statusColor }]}>
                    {res.status}
                  </Text>
                </View>
                <Text style={styles.detailLink}>자세히 보기 ›</Text>
              </View>
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
  todaySection: {
    marginBottom: 20,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  todayCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.main,
  },
  todayDate: {
    fontSize: 14,
    color: colors.subtitle,
  },
  reservationList: {
    gap: 12,
  },
  reservationCard: {
    backgroundColor: colors.accent1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSection: {
    marginBottom: 12,
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  infoSection: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  program: {
    fontSize: 13,
    color: colors.subtitle,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailLink: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
