import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function ExperienceProgress({ navigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    product: 'A',
    texture: 2,
    size: 'Large',
    subgan: 'medium',
    color: 'bright',
    weight: 'light',
  });

  const stepIndicators = [
    { num: 1, active: currentStep >= 1 },
    { num: 2, active: currentStep >= 2 },
    { num: 3, active: currentStep >= 3 },
  ];

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('experience-result');
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
            {currentStep === 1 && '체험 진행 화면'}
            {currentStep === 2 && '취향 정보 입력'}
            {currentStep === 3 && '취향 정보 입력'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Step indicators */}
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

        <Text style={styles.stepLabel}>
          STEP 0{currentStep}
        </Text>
        <Text style={styles.stepDescription}>
          {currentStep === 1 && '소재를 택인해 주세요.'}
          {currentStep === 2 && '크기를 택인해 주세요.'}
          {currentStep === 3 && '색상감을 택인해 주세요.'}
        </Text>

        {/* STEP 01: 소재 선택 */}
        {currentStep === 1 && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>고객이 자신 선호 제품</Text>
            <View style={styles.optionGroup}>
              {['A', 'B', 'C'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.option,
                    selections.product === item && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, product: item })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections.product === item && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>품목 {item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>소재체험</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderFill,
                    { width: `${(selections.texture / 5) * 100}%` },
                  ]}
                />
              </View>
              <View style={styles.sliderLabels}>
                {['무늘음', '미끄럼', '단단', '밝음', '빨간 밝음'].map((label, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelections({ ...selections, texture: idx + 1 })}
                  >
                    <Text
                      style={[
                        styles.sliderLabel,
                        selections.texture === idx + 1 && styles.sliderLabelActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>직원 메모(선택)</Text>
            <View style={styles.memoBox}>
              <Text style={styles.memoText}>보드로운 가죽 소재를 선호함</Text>
            </View>
          </View>
        )}

        {/* STEP 02: 크기 및 수브감 */}
        {currentStep === 2 && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>선호 크기</Text>
            <View style={styles.optionGroup}>
              {['Small', 'Medium', 'Large'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.option,
                    selections.size === item && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, size: item })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections.size === item && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>수브감</Text>
            <View style={styles.optionGroup}>
              {[
                { key: 'medium', label: '중부감' },
                { key: 'bo', label: '보음' },
                { key: 'bujo', label: '부조음' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.option,
                    selections.subgan === item.key && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, subgan: item.key })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections.subgan === item.key && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 03: 색상감 및 무게 */}
        {currentStep === 3 && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>색상감</Text>
            <View style={styles.optionGroup}>
              {[
                { key: 'light', label: '빠운 판금' },
                { key: 'normal', label: '판금' },
                { key: 'bright', label: '보음' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.option,
                    selections.color === item.key && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, color: item.key })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections.color === item.key && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>무게</Text>
            <View style={styles.optionGroup}>
              {[
                { key: 'light', label: '가벼움' },
                { key: 'medium', label: '적당함' },
                { key: 'heavy', label: '무거움' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.option,
                    selections.weight === item.key && styles.optionSelected,
                  ]}
                  onPress={() => setSelections({ ...selections, weight: item.key })}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      selections.weight === item.key && styles.optionRadioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.buttonGroup}>
          {currentStep > 1 && (
            <Button
              title="이전"
              variant="secondary"
              onPress={handlePrev}
              style={{ flex: 1 }}
            />
          )}
          <Button
            title={currentStep < 3 ? '다음' : '다음'}
            onPress={handleNext}
            style={{ flex: 1 }}
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  stepNum: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  stepNumActive: {
    color: colors.white,
  },
  stepLine: {
    width: 32,
    height: 2,
    backgroundColor: colors.border,
  },
  stepLineActive: {
    backgroundColor: colors.main,
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
    marginBottom: 20,
  },
  content: {
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
  sliderContainer: {
    marginBottom: 12,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: colors.accent1,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: colors.main,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  sliderLabel: {
    fontSize: 11,
    color: colors.subtitle,
    textAlign: 'center',
    flex: 1,
  },
  sliderLabelActive: {
    color: colors.main,
    fontWeight: '600',
  },
  memoBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  memoText: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
});
