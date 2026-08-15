import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceProgress({ navigate }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          if (prev === 33) setCurrentStep(2);
          if (prev === 66) setCurrentStep(3);
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('taste-test', { fromExperience: true });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-detail')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>체험 진행 중</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, currentStep >= 1 && styles.stepDotActive]}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={[styles.stepLine, currentStep >= 2 && styles.stepLineActive]} />
            <View style={[styles.stepDot, currentStep >= 2 && styles.stepDotActive]}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={[styles.stepLine, currentStep >= 3 && styles.stepLineActive]} />
            <View style={[styles.stepDot, currentStep >= 3 && styles.stepDotActive]}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
          </View>

          <View style={styles.stepLabels}>
            <Text style={[styles.stepLabel, currentStep === 1 && styles.stepLabelActive]}>
              상담
            </Text>
            <Text style={[styles.stepLabel, currentStep === 2 && styles.stepLabelActive]}>
              취향진단
            </Text>
            <Text style={[styles.stepLabel, currentStep === 3 && styles.stepLabelActive]}>
              결과분석
            </Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.content}>
            {currentStep === 1 && (
              <>
                <Text style={styles.contentTitle}>기본 상담 진행 중</Text>
                <Text style={styles.contentText}>
                  고객님의 선호도와 라이프스타일에 대해 상담하고 있습니다.
                </Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>• 음식 선호도 확인</Text>
                  <Text style={styles.infoText}>• 라이프스타일 파악</Text>
                  <Text style={styles.infoText}>• 예산 및 목표 설정</Text>
                </View>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Text style={styles.contentTitle}>AI 취향 진단 진행 중</Text>
                <Text style={styles.contentText}>
                  고급 AI 알고리즘으로 고객님의 취향을 분석하고 있습니다.
                </Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>• 색상 선호도 분석</Text>
                  <Text style={styles.infoText}>• 스타일 패턴 추출</Text>
                  <Text style={styles.infoText}>• 맞춤 추천 생성</Text>
                </View>
              </>
            )}

            {currentStep === 3 && (
              <>
                <Text style={styles.contentTitle}>결과 분석 중</Text>
                <Text style={styles.contentText}>
                  분석된 데이터를 바탕으로 최종 결과를 정리하고 있습니다.
                </Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>• 맞춤 취향 프로필 생성</Text>
                  <Text style={styles.infoText}>• 추천 선물 큐레이션</Text>
                  <Text style={styles.infoText}>• 최종 리포트 작성</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <Button
          title={currentStep < 3 ? '다음 단계' : '취향 정보 입력'}
          full
          onPress={handleNext}
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
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.accent1,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.main,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: colors.subtitle,
    textAlign: 'right',
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepDotActive: {
    backgroundColor: colors.main,
    borderColor: colors.main,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: colors.main,
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabel: {
    fontSize: 12,
    color: colors.subtitle,
    textAlign: 'center',
    flex: 1,
  },
  stepLabelActive: {
    color: colors.main,
    fontWeight: '600',
  },
  contentCard: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  content: {},
  contentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: colors.subtitle,
    marginBottom: 16,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
  },
  infoText: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 8,
  },
});
