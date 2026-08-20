import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const VIBES = ['심플한', '모던한', '트렌디한', '화려한', '클래식한', '상관없음'];

export default function TasteTest2({ navigate }) {
  const [selected, setSelected] = useState(global.tasteAnswers?.mood || '심플한');

  const handleNext = () => {
    global.tasteAnswers = global.tasteAnswers || {};
    global.tasteAnswers.mood = selected;
    navigate('taste-3');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-1')} />

        <StepIndicator stepNum={2} stepDesc="어떤 디자인 분위기를 선호하나요?" totalDots={5} activeDot={1} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>분위기</Text>
          <View style={styles.chipBox}>
            <Chips options={VIBES} selected={[selected]} onToggle={setSelected} />
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Button title="다음" onPress={handleNext} />
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 },
  chipBox: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 16,
    alignItems: 'center',
  },
});