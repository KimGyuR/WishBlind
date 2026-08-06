import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const MATERIALS = ['패브릭', '가죽', '헤링본', '기타'];
const LOGOS = ['거의 없음', '작게 보임', '눈에 띄어도 괜찮음'];

export default function TasteTest3({ navigate }) {
  const [materials, setMaterials] = useState([]);
  const [logo, setLogo] = useState([]);

  const toggleMaterial = (opt) => {
    setMaterials((prev) => (prev.includes(opt) ? prev.filter((m) => m !== opt) : [...prev, opt]));
  };

  const toggleLogo = (opt) => setLogo([opt]);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-2')} />

        <StepIndicator stepNum={3} stepDesc="소재와 디테일 취향을 알려주세요." totalDots={5} activeDot={2} />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>선호 소재</Text>
          <Chips options={MATERIALS} selected={materials} onToggle={toggleMaterial} />
        </View>

        <View style={{ marginBottom: 16, marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>로고 노출</Text>
          <Chips options={LOGOS} selected={logo} onToggle={toggleLogo} />
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button title="다음" full onPress={() => navigate('taste-4')} />
        </View>
      </ScrollView>
    </View>
  );
}
