import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const COLORS = ['브라운', '베이지', '화이트', '블랙', '살구민트', '그린', '철수 포인트'];

export default function TasteTest1({ navigate }) {
  const [selected, setSelected] = useState([]);

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt]));
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트" onBack={() => navigate('invite-confirm')} />

        <StepIndicator stepNum={1} stepDesc="선호하는 색상을 골라주세요." totalDots={5} activeDot={0} />

        <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 14 }}>복수 선택할 수 있어요.</Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>색상</Text>
          <Chips options={COLORS} selected={selected} onToggle={toggle} />
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button title="다음" full onPress={() => navigate('taste-2')} />
        </View>
      </ScrollView>
    </View>
  );
}
