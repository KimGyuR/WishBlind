import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';

const CANDIDATES = ['후보 A', '후보 B', '후보 C'];
const MATERIAL_SCALE = ['매우 좋음', '좋음', '보통', '불만족', '매우 불만족'];
const SIZES = ['Small', 'Medium', 'Large'];
const STORAGE = ['충분함', '보통', '부족함'];
const WEAR = ['매우 편함', '편함', '보통', '불편함'];
const WEIGHT = ['가벼움', '적당함', '무거움'];

function RadioGroup({ options, value, onChange }) {
  return (
    <View style={styles.optionGroup}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[styles.option, value === opt && styles.optionSelected]}
          onPress={() => onChange(opt)}
        >
          <View style={[styles.optionRadio, value === opt && styles.optionRadioSelected]} />
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ScaleSelect({ options, value, onChange }) {
  return (
    <View style={styles.scaleWrap}>
      <View style={styles.scaleDotsRow}>
        {options.map((opt, idx) => (
          <React.Fragment key={opt}>
            <TouchableOpacity onPress={() => onChange(opt)} style={styles.scaleDotTouch}>
              <View style={[styles.scaleDot, value === opt && styles.scaleDotActive]} />
            </TouchableOpacity>
            {idx < options.length - 1 && <View style={styles.scaleLine} />}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.scaleLabelsRow}>
        {options.map((opt) => (
          <Text key={opt} style={styles.scaleLabel}>{opt}</Text>
        ))}
      </View>
    </View>
  );
}

export default function ExperienceProgress({ navigate, route }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    candidate: '',
    materialFeel: '',
    materialMemo: '',
    size: '',
    storage: '',
    wear: '',
    weight: '',
  });

  const reservationId = route?.params?.reservationId;

  const set = (key, val) => setSelections((prev) => ({ ...prev, [key]: val }));

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
        <Header
          title={currentStep === 1 ? '체험 진행 화면' : '취향 정보 입력'}
          onBack={() => navigate('experience-detail')}
        />

        <StepIndicator
          stepNum={currentStep}
          stepDesc={
            currentStep === 1
              ? '소재를 확인해 주세요.'
              : currentStep === 2
              ? '크기를 확인해 주세요.'
              : '착용감을 확인해 주세요.'
          }
          totalDots={4}
          activeDot={currentStep - 1}
        />

        <Card style={{ marginTop: 16 }}>
          {currentStep === 1 && (
            <>
              <Text style={styles.sectionTitle}>고객이 가장 선호한 제품</Text>
              <RadioGroup options={CANDIDATES} value={selections.candidate} onChange={(v) => set('candidate', v)} />

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>소재체험</Text>
              <ScaleSelect
                options={MATERIAL_SCALE}
                value={selections.materialFeel}
                onChange={(v) => set('materialFeel', v)}
              />

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>직원 메모(선택)</Text>
              <PillInput
                placeholder="메모를 입력하세요"
                value={selections.materialMemo}
                onChangeText={(v) => set('materialMemo', v)}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <Text style={styles.sectionTitle}>선호 크기</Text>
              <RadioGroup options={SIZES} value={selections.size} onChange={(v) => set('size', v)} />

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>수납감</Text>
              <RadioGroup options={STORAGE} value={selections.storage} onChange={(v) => set('storage', v)} />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Text style={styles.sectionTitle}>착용감</Text>
              <RadioGroup options={WEAR} value={selections.wear} onChange={(v) => set('wear', v)} />

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>무게</Text>
              <RadioGroup options={WEIGHT} value={selections.weight} onChange={(v) => set('weight', v)} />
            </>
          )}

          {currentStep === 1 ? (
            <View style={{ alignItems: 'flex-end', marginTop: 24 }}>
              <Button title="다음" onPress={handleNext} />
            </View>
          ) : (
            <View style={styles.buttonGroup}>
              <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={handlePrev} />
              <Button title="다음" style={{ flex: 1, marginLeft: 8 }} onPress={handleNext} />
            </View>
          )}
        </Card>
      </ScrollView>
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
  scaleWrap: { paddingHorizontal: 4 },
  scaleDotsRow: { flexDirection: 'row', alignItems: 'center' },
  scaleDotTouch: { padding: 4 },
  scaleDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: colors.main, backgroundColor: colors.white },
  scaleDotActive: { backgroundColor: colors.main },
  scaleLine: { flex: 1, height: 1.5, backgroundColor: colors.border },
  scaleLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  scaleLabel: { fontSize: 10, color: colors.titleSub, flex: 1, textAlign: 'center' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 24 },
});
