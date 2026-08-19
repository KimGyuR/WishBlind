import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceProgress({ navigate, route }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    product: '',
    material: '',
    size: '',
    storage: '',
    wear: '',
    weight: '',
  });

  const reservationId = route?.params?.reservationId;

  const stepIndicators = [
    { num: 1, active: currentStep >= 1, label: '소재' },
    { num: 2, active: currentStep >= 2, label: '크기' },
    { num: 3, active: currentStep >= 3, label: '색상' },
  ];

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('experience-result', {
        reservationId,
        fittingData: selections,
      });
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
          <Text style={styles.title}>
            {currentStep === 1 && '소재 평가'}
            {currentStep === 2 && '크기 평가'}
            {currentStep === 3 && '색상 평가'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.stepIndicator}>
          {stepIndicators.map((step, idx) => (
            <View key={step.num} style={styles.stepRow}>
              <View style={[styles.stepDot, step.active && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step.active && styles.stepNumActive]}>
                  {step.num}
                </Text>
              </View>
              {idx < 2 && <View style={[styles.stepLine, step.active && styles.stepLineActive]} />}
            </View>
          ))}
        </View>

        <Text style={styles.stepLabel}>STEP 0{currentStep}</Text>
        <Text style={styles.stepDescription}>
          {currentStep === 1 && '제품의 소재 감촉을 평가해주세요.'}
          {currentStep === 2 && '제품의 크기를 평가해주세요.'}
          {currentStep === 3 && '제품의 색상을 평가해주세요.'}
        </Text>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>만족도 선택</Text>
          <View style={styles.optionGroup}>
            {['매우 만족', '만족', '보통', '불만족'].map((option) => {
              const fieldKey = currentStep === 1 ? 'material' : currentStep === 2 ? 'size' : 'wear';
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    selections[fieldKey] === option && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, [fieldKey]: option })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections[fieldKey] === option && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            title="이전"
            variant="outline"
            style={{ flex: 1 }}
            onPress={handlePrev}
            disabled={currentStep === 1}
          />
          <Button
            title={currentStep === 3 ? '다음' : '다음'}
            style={{ flex: 1, marginLeft: 8 }}
            onPress={handleNext}
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
  },
  backButton: { fontSize: 26, color: colors.text, lineHeight: 26 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  stepIndicator: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center' },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  stepDotActive: { backgroundColor: colors.main, borderColor: colors.main },
  stepNum: { fontSize: 14, fontWeight: '700', color: colors.text },
  stepNumActive: { color: colors.white },
  stepLine: { width: 20, height: 1.5, backgroundColor: colors.border, marginHorizontal: 4 },
  stepLineActive: { backgroundColor: colors.main },
  stepLabel: { fontSize: 13, fontWeight: '700', color: colors.main, marginBottom: 4 },
  stepDescription: { fontSize: 14, color: colors.text, marginBottom: 20, fontWeight: '500' },
  content: { marginBottom: 20 },
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
  optionSelected: { backgroundColor: colors.accent1, borderColor: colors.main },
  optionRadio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: colors.main, marginRight: 10 },
  optionRadioSelected: { backgroundColor: colors.main, borderColor: colors.main },
  optionText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 20 },
});
