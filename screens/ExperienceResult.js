import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';
import { submitFittingResult } from '../services/api';

const REACTIONS = ['매우 만족', '만족', '보통', '선호하지 않음'];

export default function ExperienceResult({ navigate, route }) {
  const [stage, setStage] = useState('evaluation');
  const [reaction, setReaction] = useState('');
  const [memo, setMemo] = useState('');
  const [summary, setSummary] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const reservationId = route?.params?.reservationId;
  const fittingData = route?.params?.fittingData || {};

  const handleNextStep = () => {
    if (stage === 'evaluation') {
      if (!reaction) {
        Alert.alert('오류', '전체적인 반응을 선택해주세요');
        return;
      }
      setSummary({
        materialFeel: fittingData.materialMemo?.trim() || fittingData.materialFeel || '-',
        sizeFeel: fittingData.size ? `${fittingData.size} 선호` : '-',
        wearComfort: fittingData.wear || '-',
        weight: fittingData.weight ? `${fittingData.weight} 제품 선호` : '-',
        staffMemo: memo || '-',
      });
      setStage('result');
    } else if (stage === 'result') {
      submitResult();
    }
  };

  const submitResult = async () => {
    setLoading(true);
    try {
      if (!reservationId) {
        Alert.alert('오류', '예약 정보가 없습니다');
        return;
      }

      const response = await submitFittingResult(reservationId, {
        materialFeel: summary.materialFeel,
        sizeFeel: summary.sizeFeel,
        storageFeel: fittingData.storage || '',
        wearComfort: summary.wearComfort,
        weight: summary.weight,
        overallSatisfaction: reaction,
        staffMemo: summary.staffMemo,
      });

      if (response.code === 'SUCCESS') {
        setShowComplete(true);
      } else {
        Alert.alert('오류', response.message || '결과 저장에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '결과 저장 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevStep = () => {
    if (stage === 'result') {
      setStage('evaluation');
    } else {
      navigate('experience-progress');
    }
  };

  const handleComplete = () => {
    setShowComplete(false);
    navigate('experience-management');
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
        <Header title="체험 결과 확인" onBack={handlePrevStep} />

        {/* STAGE 1: 평가 (STEP 04) */}
        {stage === 'evaluation' && (
          <>
            <StepIndicator
              stepNum={4}
              stepDesc={'고객님의 전체적 만족도를 선택해주세요.'}
              totalDots={4}
              activeDot={3}
            />

            <Card style={{ marginTop: 16 }}>
              <Text style={styles.sectionTitle}>전체적인 반응</Text>
              <View style={styles.optionGroup}>
                {REACTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.option, reaction === opt && styles.optionSelected]}
                    onPress={() => setReaction(opt)}
                  >
                    <View style={[styles.optionRadio, reaction === opt && styles.optionRadioSelected]} />
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>추가 메모</Text>
              <PillInput
                placeholder="고객님의 반응을 입력하세요"
                value={memo}
                onChangeText={setMemo}
                multiline
                style={{ minHeight: 70 }}
              />

              <View style={styles.buttonGroup}>
                <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={handlePrevStep} />
                <Button title="다음" style={{ flex: 1, marginLeft: 8 }} onPress={handleNextStep} />
              </View>
            </Card>
          </>
        )}

        {/* STAGE 2: 결과 확인 */}
        {stage === 'result' && summary && (
          <View style={styles.content}>
            <Text style={styles.reviewDesc}>
              김사자 고객님의{'\n'}취향 결과를 확인해주세요.
            </Text>

            <View style={styles.reviewGroup}>
              <Text style={styles.reviewLabel}>소재</Text>
              <View style={styles.reviewBox}>
                <Text style={styles.reviewValue}>{summary.materialFeel}</Text>
              </View>
            </View>

            <View style={styles.reviewGroup}>
              <Text style={styles.reviewLabel}>크기</Text>
              <View style={styles.reviewBox}>
                <Text style={styles.reviewValue}>{summary.sizeFeel}</Text>
              </View>
            </View>

            <View style={styles.reviewGroup}>
              <Text style={styles.reviewLabel}>착용감</Text>
              <View style={styles.reviewBox}>
                <Text style={styles.reviewValue}>{summary.wearComfort}</Text>
              </View>
            </View>

            <View style={styles.reviewGroup}>
              <Text style={styles.reviewLabel}>무게</Text>
              <View style={styles.reviewBox}>
                <Text style={styles.reviewValue}>{summary.weight}</Text>
              </View>
            </View>

            <View style={styles.reviewGroup}>
              <Text style={styles.reviewLabel}>직원 메모</Text>
              <View style={[styles.reviewBox, { minHeight: 60 }]}>
                <Text style={styles.reviewValue}>{summary.staffMemo}</Text>
              </View>
            </View>

            <View style={styles.buttonGroup}>
              <Button title="수정하기" variant="outline" style={{ flex: 1 }} onPress={handlePrevStep} />
              <Button title="완료" style={{ flex: 1, marginLeft: 8 }} onPress={handleNextStep} />
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showComplete} transparent animationType="fade" onRequestClose={handleComplete}>
        <View style={styles.overlay}>
          <View style={styles.completeCard}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.completeTitle}>체험이 완료되었습니다.</Text>
            <Text style={styles.completeDesc}>
              입력된 체험 결과가{'\n'}AI 추천 정보에 반영됩니다.
            </Text>
            <Button title="확인" full onPress={handleComplete} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 12 },
  optionGroup: { gap: 8 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  optionSelected: { backgroundColor: colors.accent1 },
  optionRadio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: colors.main, marginRight: 10 },
  optionRadioSelected: { backgroundColor: colors.main, borderColor: colors.main },
  optionText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 24 },
  content: { marginTop: 4 },
  reviewDesc: { fontSize: 15, fontWeight: '600', color: colors.text, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  reviewGroup: { marginBottom: 16 },
  reviewLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 },
  reviewBox: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  reviewValue: { fontSize: 13, color: colors.text },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  completeCard: {
    backgroundColor: colors.bg,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkMark: { fontSize: 20, color: colors.white, fontWeight: '700' },
  completeTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 8, textAlign: 'center' },
  completeDesc: { fontSize: 13, color: colors.titleSub, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
});
