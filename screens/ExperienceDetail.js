import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceDetail({ navigate, route }) {
  const reservation = route?.params?.reservation || {};

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-management')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>체험 예약 상세</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>예약 정보</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>예약일시</Text>
              <Text style={styles.value}>{reservation.date} {reservation.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>매장</Text>
              <Text style={styles.value}>{reservation.storeName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>상태</Text>
              <View style={[styles.statusBadge, { backgroundColor: reservation.statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: reservation.statusColor }]}>
                  {reservation.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>고객 정보</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>이름</Text>
              <Text style={styles.value}>김철수</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>연락처</Text>
              <Text style={styles.value}>010-1234-5678</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>이메일</Text>
              <Text style={styles.value}>kim@example.com</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>체험 정보</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>체험 프로그램</Text>
              <Text style={styles.value}>AI 취향 진단</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>예상 소요시간</Text>
              <Text style={styles.value}>약 30분</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>특이사항</Text>
              <Text style={styles.value}>기본 상담 필요</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {reservation.status === '대기중' && (
            <Button
              title="체험 시작"
              full
              onPress={() => navigate('experience-progress')}
            />
          )}
          {reservation.status === '진행중' && (
            <Button
              title="진행 중..."
              full
              variant="secondary"
              onPress={() => navigate('experience-progress')}
            />
          )}
          {reservation.status === '완료' && (
            <Button
              title="결과 확인"
              full
              onPress={() => navigate('experience-result')}
            />
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
  card: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.subtitle,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
