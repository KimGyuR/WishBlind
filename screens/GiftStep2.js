import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, PillInput, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const MOODS = ['실용적', '특별한', '기념용', '럭셔리', '감동적인', '기타'];
const MAX_MOODS = 2;

export default function GiftStep2({ navigate }) {
  const [meaning, setMeaning] = useState(global.giftData?.meaning || '');
  const [moods, setMoods] = useState(global.giftData?.moods || []);

  const toggleMood = (opt) => {
    setMoods((prev) => {
      if (prev.includes(opt)) return prev.filter((m) => m !== opt);
      if (prev.length >= MAX_MOODS) return prev;
      return [...prev, opt];
    });
  };

  const handleNext = () => {
    global.giftData = global.giftData || {};
    global.giftData.meaning = meaning;
    global.giftData.moods = moods;
    navigate('gift-step3');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="선물 의미 입력" onBack={() => navigate('gift-step1')} />

        <StepIndicator stepNum={2} stepDesc="어떤 마음을 전하고 싶나요?" totalDots={4} activeDot={1} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>전하고 싶은 의미</Text>
          <PillInput
            placeholder={'예) 취업을 축하하고,\n오래 사용할 수 있는 선물이었으면 좋겠어요.'}
            value={meaning}
            onChangeText={setMeaning}
            multiline
            style={styles.textarea}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>선물 분위기</Text>
          <View style={styles.moodBox}>
            <Text style={styles.helper}>최대 {MAX_MOODS}개까지 선택할 수 있어요.</Text>
            <Chips options={MOODS} selected={moods} onToggle={toggleMood} />
          </View>

          <View style={styles.btnRow}>
            <Button title="이전" onPress={() => navigate('gift-step1')} />
            <Button title="다음" onPress={handleNext} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 },
  textarea: { height: 118, textAlign: 'center', fontSize: 13 },
  moodBox: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 16,
    alignItems: 'center',
  },
  helper: { fontSize: 12, color: colors.titleSub, marginBottom: 10 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
});