import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Chips, FormInput, Button } from '../components/Shared';
import { colors } from '../theme';

const AVOIDS = ['큰 로고', '무거운 패품', '화려한 색상', '작은 수납공간', '관리가 어려운 소재', '특별이 없음'];

export default function TasteTest5({ navigate }) {
  const [selected, setSelected] = useState([]);
  const [extra, setExtra] = useState('');

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]));
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트" onBack={() => navigate('gift-step4')} />

        <StepIndicator stepNum={5} stepDesc="피하고 싶은 요소를 알려주세요." totalDots={5} activeDot={4} />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>
            피하고 싶은 요소
          </Text>
          <Chips options={AVOIDS} selected={selected} onToggle={toggle} />
        </View>

        <View style={{ marginBottom: 16, marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
            추가로 피하고 싶은 것이 있나요?
          </Text>
          <FormInput placeholder="피하고 싶은 취향을 입력해주세요." value={extra} onChangeText={setExtra} />
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button title="입력 완료" full onPress={() => navigate('taste-complete-sender')} />
        </View>
      </ScrollView>
    </View>
  );
}
