import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceResult({ navigate }) {
  const [shareVisible, setShareVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-management')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>체험 결과 확인</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>취향 분석 완료!</Text>
            <Text style={styles.resultSubtitle}>당신의 선호도가 분석되었습니다.</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 분석 결과</Text>

            <View style={styles.resultItem}>
              <View style={styles.resultLabel}>
                <Text style={styles.resultLabelText}>선호 색상</Text>
              </View>
              <View style={styles.resultValue}>
                <View style={[styles.colorPill, { backgroundColor: '#6D1F32' }]} />
                <View style={[styles.colorPill, { backgroundColor: '#8B4789' }]} />
                <View style={[styles.colorPill, { backgroundColor: '#C4A69D' }]} />
              </View>
            </View>

            <View style={styles.resultItem}>
              <View style={styles.resultLabel}>
                <Text style={styles.resultLabelText}>스타일</Text>
              </View>
              <Text style={styles.resultValueText}>클래식 & 모던</Text>
            </View>

            <View style={styles.resultItem}>
              <View style={styles.resultLabel}>
                <Text style={styles.resultLabelText}>선호도</Text>
              </View>
              <Text style={styles.resultValueText}>정교함 70% | 캐주얼 30%</Text>
            </View>

            <View style={styles.resultItem}>
              <View style={styles.resultLabel}>
                <Text style={styles.resultLabelText}>취향 점수</Text>
              </View>
              <View style={styles.scoreContainer}>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreFill, { width: '85%' }]} />
                </View>
                <Text style={styles.scoreText}>85점</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎁 추천 선물</Text>
            <View style={styles.recommendationBox}>
              <Text style={styles.recommendationText}>
                분석된 취향을 바탕으로 맞춤형 선물을 추천합니다.
              </Text>
              <View style={styles.recommendationItems}>
                <View style={styles.recommendationItem}>
                  <Text style={styles.itemTitle}>프리미엄 향수</Text>
                  <Text style={styles.itemDescription}>고급스러운 향기</Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.itemTitle}>명품 악세서리</Text>
                  <Text style={styles.itemDescription}>세련된 스타일</Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.itemTitle}>프리미엄 와인</Text>
                  <Text style={styles.itemDescription}>좋은 맛과 향</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💬 상담사 의견</Text>
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>
                고객님은 정교한 감각과 세련된 취향을 갖추고 계신 것으로 분석됩니다. 고급 브랜드와
                프리미엄 제품을 선호하시며, 기능성과 미적 가치의 균형을 중시하시는 경향이 있습니다.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="결과 공유하기"
            full
            variant="secondary"
            onPress={() => setShareVisible(true)}
            style={{ marginBottom: 12 }}
          />
          <Button
            title="홈으로 돌아가기"
            full
            onPress={() => navigate('home')}
          />
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
  resultCard: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.main,
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: colors.subtitle,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  resultLabel: {
    flex: 1,
  },
  resultLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  resultValue: {
    flexDirection: 'row',
    gap: 8,
  },
  colorPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultValueText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.white,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    backgroundColor: colors.main,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.main,
    minWidth: 40,
  },
  recommendationBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
  },
  recommendationText: {
    fontSize: 13,
    color: colors.subtitle,
    marginBottom: 12,
  },
  recommendationItems: {
    gap: 8,
  },
  recommendationItem: {
    backgroundColor: colors.accent1,
    padding: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  itemDescription: {
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 2,
  },
  feedbackBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
  },
  feedbackText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
