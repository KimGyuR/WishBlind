import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const VIBES = ['심플한', '모던한', '트렌디한', '화려한', '클래식한', '상큼발랄'];

export default function TasteTest2({ navigate }) {
  const [selected, setSelected] = useState([]);

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]));
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-1')} />

        <StepIndicator stepNum={2} stepDesc="어떤 디자인 분위기를 선호하나요?" totalDots={5} activeDot={1} />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>분위기</Text>
          <Chips options={VIBES} selected={selected} onToggle={toggle} />
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button title="다음" full onPress={() => navigate('taste-3')} />
        </View>
      </ScrollView>
    </View>
  );
}
