import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceResult({ navigate }) {
  const [stage, setStage] = useState('step04'); // 'step04' -> 'result' -> 'complete'
  const [impression, setImpression] = useState('positive');
  const [showComplete, setShowComplete] = useState(false);

  const [resultData, setResultData] = useState({
    texture: '부드러운 가죽 선호',
    size: 'Small 선호',
    color: '밝은 우즉',
    weight: '가벼운 제품 선호',
    memo: '스트럴이 길고 가벼운 제품에 금정적인 반응을 보임.',
  });

  const impressionOptions = [
    { key: 'light', label: '따운 인상' },
    { key: 'confident', label: '단호' },
    { key: 'soft', label: '보음' },
    { key: 'dislike', label: '선호하지 않음' },
  ];

  const handleNextStep = () => {
    if (stage === 'step04') {
      setStage('result');
    } else if (stage === 'result') {
      setShowComplete(true);
    }
  };

  const handlePrevStep = () => {
    if (stage === 'result') {
      setStage('step04');
    }
  };

  const handleComplete = () => {
    navigate('experience-management');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('experience-detail')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {stage === 'step04' ? '체험 결과 확인' : '취향 결과 확인'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* STEP 04: 전체 인상 선택 */}
        {stage === 'step04' && (
          <View style={styles.content}>
            <Text style={styles.stepLabel}>STEP 04</Text>
            <Text style={styles.stepDescription}>
              고객의 전체의 관종을 선태해주세요.
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

            <Text style={styles.sectionTitle}>추가 메모</Text>
            <View style={styles.memoInput}>
              <TextInput
                style={styles.memoText}
                multiline
                placeholder="스타일이 간 제품을 더 편하게 누가는 것으로 평되임"
                placeholderTextColor={colors.subtitle}
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="이전"
                variant="secondary"
                onPress={handlePrevStep}
                style={{ flex: 1 }}
              />
              <Button
                title="다음"
                onPress={handleNextStep}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}

        {/* 취향 결과 확인 */}
        {stage === 'result' && (
          <View style={styles.content}>
            <Text style={styles.resultDescription}>
              김사자 고객님의 위한 권고을 확인해세요.
            </Text>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>소재</Text>
              <View style={styles.resultInputBox}>
                <TextInput
                  style={styles.resultInputText}
                  value={resultData.texture}
                  onChangeText={(text) =>
                    setResultData({ ...resultData, texture: text })
                  }
                />
              </View>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>크기</Text>
              <View style={styles.resultInputBox}>
                <TextInput
                  style={styles.resultInputText}
                  value={resultData.size}
                  onChangeText={(text) =>
                    setResultData({ ...resultData, size: text })
                  }
                />
              </View>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>색상감</Text>
              <View style={styles.resultInputBox}>
                <TextInput
                  style={styles.resultInputText}
                  value={resultData.color}
                  onChangeText={(text) =>
                    setResultData({ ...resultData, color: text })
                  }
                />
              </View>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>무게</Text>
              <View style={styles.resultInputBox}>
                <TextInput
                  style={styles.resultInputText}
                  value={resultData.weight}
                  onChangeText={(text) =>
                    setResultData({ ...resultData, weight: text })
                  }
                />
              </View>
            </View>

            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>직원 메모</Text>
              <View style={styles.resultInputBox}>
                <TextInput
                  style={[styles.resultInputText, styles.resultMemoInput]}
                  value={resultData.memo}
                  onChangeText={(text) =>
                    setResultData({ ...resultData, memo: text })
                  }
                  multiline
                />
              </View>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="수정하기"
                variant="secondary"
                onPress={handlePrevStep}
                style={{ flex: 1 }}
              />
              <Button
                title="완료"
                onPress={handleNextStep}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}

        {/* 완료 팝업 */}
        <Modal visible={showComplete} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
              <Text style={styles.completeTitle}>체험이 완료되었습니다.</Text>
              <Text style={styles.completeDescription}>
                실시간 김사자 고객가 AI 추천 정보에 반영됩니다.
              </Text>
              <Button
                title="확인"
                onPress={handleComplete}
                style={{ marginTop: 24 }}
              />
            </View>
          </View>
        </Modal>
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
  content: {
    marginBottom: 24,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.main,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  resultDescription: {
    fontSize: 14,
    color: colors.subtitle,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  optionGroup: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.accent1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.white,
    borderColor: colors.main,
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
  },
  optionRadioSelected: {
    borderColor: colors.main,
    backgroundColor: colors.main,
  },
  optionText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  memoInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minHeight: 80,
  },
  memoText: {
    fontSize: 13,
    color: colors.text,
    textAlignVertical: 'top',
  },
  resultItem: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  resultInputBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  resultInputText: {
    fontSize: 13,
    color: colors.text,
  },
  resultMemoInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    maxWidth: 300,
  },
  checkmark: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmarkText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.main,
  },
  completeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  completeDescription: {
    fontSize: 13,
    color: colors.subtitle,
    textAlign: 'center',
    lineHeight: 20,
  },
});
