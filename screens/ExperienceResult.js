import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';
import { submitFittingResult } from '../services/api';

export default function ExperienceResult({ navigate, route }) {
  const [stage, setStage] = useState('evaluation');
  const [impression, setImpression] = useState('');
  const [memo, setMemo] = useState('');
  const [satisfactionScore, setSatisfactionScore] = useState(5);
  const [showComplete, setShowComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const reservationId = route?.params?.reservationId;
  const fittingData = route?.params?.fittingData || {};

  const impressionOptions = [
    { key: 'positive', label: '긍정적' },
    { key: 'confident', label: '자신감 있음' },
    { key: 'neutral', label: '중립' },
    { key: 'dislike', label: '선호하지 않음' },
  ];

  const handleNextStep = () => {
    if (stage === 'evaluation') {
      if (!impression) {
        Alert.alert('오류', '인상을 선택해주세요');
        return;
      }
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
        materialFeel: fittingData.material || '',
        sizeFeel: fittingData.size || '',
        storageFeel: fittingData.storage || '',
        wearComfort: fittingData.wear || '',
        weight: fittingData.weight || '',
        overallSatisfaction: satisfactionScore,
        staffMemo: memo,
        impression,
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-progress')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {stage === 'evaluation' ? '체험 평가' : '결과 확인'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* STAGE 1: 평가 */}
        {stage === 'evaluation' && (
          <View style={styles.content}>
            <Text style={styles.stepLabel}>최종 평가</Text>
            <Text style={styles.stepDescription}>
              체험에 대한 종합 평가를 작성해주세요.
            </Text>

            <Text style={styles.sectionTitle}>전체적인 인상</Text>
            <View style={styles.optionGroup}>
              {impressionOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.option,
                    impression === opt.key && styles.optionSelected,
                  ]}
                  onPress={() => setImpression(opt.key)}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      impression === opt.key && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>만족도 점수</Text>
            <View style={styles.scoreContainer}>
              {[1, 2, 3, 4, 5].map((score) => (
                <TouchableOpacity
                  key={score}
                  style={[
                    styles.scoreButton,
                    satisfactionScore === score && styles.scoreButtonActive,
                  ]}
                  onPress={() => setSatisfactionScore(score)}
                >
                  <Text
                    style={[
                      styles.scoreText,
                      satisfactionScore === score && styles.scoreTextActive,
                    ]}
                  >
                    {score}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>추가 메모</Text>
            <View style={styles.memoInput}>
              <TextInput
                style={styles.memoText}
                multiline
                placeholder="체험 중 관찰한 내용을 입력하세요"
                placeholderTextColor={colors.titleSub}
                value={memo}
                onChangeText={setMemo}
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="이전"
                variant="outline"
                style={{ flex: 1 }}
                onPress={() => navigate('experience-progress')}
              />
              <Button
                title="결과 확인"
                style={{ flex: 1, marginLeft: 8 }}
                onPress={handleNextStep}
              />
            </View>
          </View>
        )}

        {/* STAGE 2: 결과 확인 */}
        {stage === 'result' && (
          <View style={styles.content}>
            <Text style={styles.stepLabel}>체험 결과</Text>
            <Text style={styles.stepDescription}>
              입력하신 내용을 확인해주세요.
            </Text>

            <View style={styles.resultCard}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>전체 인상</Text>
                <Text style={styles.resultValue}>
                  {impressionOptions.find(o => o.key === impression)?.label || '-'}
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>만족도</Text>
                <Text style={styles.resultValue}>⭐ {satisfactionScore}/5</Text>
              </View>
              {memo && (
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>메모</Text>
                  <Text style={styles.resultValue}>{memo}</Text>
                </View>
              )}
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="수정"
                variant="outline"
                style={{ flex: 1 }}
                onPress={handlePrevStep}
              />
              <Button
                title="저장 및 완료"
                style={{ flex: 1, marginLeft: 8 }}
                onPress={handleNextStep}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showComplete} transparent animationType="fade" onRequestClose={handleComplete}>
        <View style={styles.overlay}>
          <View style={styles.completeCard}>
            <Text style={styles.icon}>✅</Text>
            <Text style={styles.completeTitle}>체험 기록 완료!</Text>
            <Text style={styles.completeDesc}>
              고객님의 체험 정보가{'\n'}
              성공적으로 저장되었습니다.
            </Text>
            <Button title="확인" onPress={handleComplete} />
          </View>
        </View>
      </Modal>
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
  content: { marginBottom: 20 },
  stepLabel: { fontSize: 13, fontWeight: '700', color: colors.main, marginBottom: 4 },
  stepDescription: { fontSize: 14, color: colors.text, marginBottom: 20, fontWeight: '500' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 12, marginTop: 16 },
  optionGroup: { gap: 8, marginBottom: 16 },
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
  scoreContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  scoreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  scoreButtonActive: { backgroundColor: colors.main },
  scoreText: { fontSize: 14, fontWeight: '700', color: colors.main },
  scoreTextActive: { color: colors.white },
  memoInput: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 12,
    backgroundColor: colors.white,
    minHeight: 100,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  memoText: { fontSize: 13, color: colors.text },
  resultCard: {
    backgroundColor: colors.accent1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  resultRow: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  resultRow: { paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
  resultLabel: { fontSize: 13, color: colors.titleSub, fontWeight: '500' },
  resultValue: { fontSize: 13, color: colors.text, fontWeight: '600' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 20 },
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
  },
  icon: { fontSize: 40, marginBottom: 16 },
  completeTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 12 },
  completeDesc: { fontSize: 13, color: colors.titleSub, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
});
