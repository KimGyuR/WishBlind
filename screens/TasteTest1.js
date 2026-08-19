import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const COLORS = ['브라운', '화이트', '베이지', '블랙', '그린', '상관없음', '컬러 포인트'];

export default function TasteTest1({ navigate }) {
  const [selected, setSelected] = useState(global.tasteAnswers?.colors || []);

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt]));
  };

  const handleNext = () => {
    global.tasteAnswers = global.tasteAnswers || {};
    global.tasteAnswers.colors = selected;
    navigate('taste-2');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('invite-confirm')} />

        <StepIndicator
          stepNum={1}
          stepDesc={'선호하는 색상을 골라주세요.\n복수 선택할 수 있어요.'}
          totalDots={5}
          activeDot={0}
        />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>색상</Text>
          <View style={styles.chipBox}>
            <Chips options={COLORS} selected={selected} onToggle={toggle} />
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