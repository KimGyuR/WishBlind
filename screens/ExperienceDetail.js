import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceDetail({ navigate, route }) {
  const reservation = route?.params?.reservation || {};

  const brands = ['[BEST] 듀거니터', '듀거니터', '듀거니터'];
  const details = ['소재', '크기', '우게', '저장강'];

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

        {/* 예약 정보 카드 */}
        <View style={styles.reservationCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.cardLabel}>제목데이</Text>
              <Text style={styles.customerInfo}>
                {reservation.customerName || '김사자'} 고객님
              </Text>
              <Text style={styles.program}>
                {reservation.program || '취향 축하 선물'} ~ 기업
              </Text>
            </View>
            <View>
              <Text style={styles.dateLabel}>
                8월 6일 {reservation.timeStart || '14:00'}
              </Text>
            </View>
          </View>
        </View>

        {/* 예약정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>예약정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>브랜드</Text>
            <Text style={styles.infoValue}>CHANEL</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>예약정보</Text>
            <Text style={styles.infoValue}>AA-1234</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>수량</Text>
            <Text style={styles.infoValue}>3개</Text>
          </View>
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              AI가 추천한 모델은 구매하되 취향에 맞춰세요.
            </Text>
          </View>

          {/* 브랜드 이미지들 */}
          <View style={styles.brandGrid}>
            {brands.map((brand, index) => (
              <View key={index} style={styles.brandItem}>
                <View style={styles.brandImagePlaceholder}>
                  <Text style={styles.brandImageText}>👜</Text>
                </View>
                <Text style={styles.brandName}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 체험 협력 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>체험 협력</Text>
          <View style={styles.detailsRow}>
            {details.map((detail, index) => (
              <View key={index} style={styles.detailBadge}>
                <Text style={styles.detailText}>{detail}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="체험 시작하기"
          full
          onPress={() => navigate('experience-progress')}
          style={{ marginTop: 20 }}
        />
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
  reservationCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.main,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.main,
    marginBottom: 4,
  },
  customerInfo: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 4,
  },
  program: {
    fontSize: 13,
    color: colors.subtitle,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.main,
    textAlign: 'right',
  },
  section: {
    backgroundColor: colors.accent1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  infoLabel: {
    fontSize: 13,
    color: colors.subtitle,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  noteBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  noteText: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
  },
  brandGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  brandItem: {
    flex: 1,
    alignItems: 'center',
  },
  brandImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandImageText: {
    fontSize: 32,
  },
  brandName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});
