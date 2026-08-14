import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';

const AVOIDS = ['큰 로고', '무거운 제품', '화려한 색상', '작은 수납공간', '관리가 어려운 소재', '특별히 없음'];

export default function TasteTest5({ navigate }) {
  const [selected, setSelected] = useState(['무거운 제품', '화려한 색상']);
  const [extra, setExtra] = useState('');

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]));
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-4')} />

        <StepIndicator stepNum={5} stepDesc="피하고 싶은 요소를 입력하세요." totalDots={5} activeDot={4} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>피하고 싶은 요소</Text>
          <View style={[styles.chipBox, { marginBottom: 20 }]}>
            <Chips options={AVOIDS} selected={selected} onToggle={toggle} />
          </View>

          <Text style={styles.label}>추가로 피하고 싶은 것이 있나요?</Text>
          <PillInput
            placeholder="피하고 싶은 취향을 입력하세요."
            value={extra}
            onChangeText={setExtra}
          />

          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Button title="입력 완료" onPress={() => navigate('taste-complete')} />
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