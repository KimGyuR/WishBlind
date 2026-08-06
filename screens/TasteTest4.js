import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const SIZES = ['문게', '기본 길이', '얇게', '상관 없음'];
const WEARS = ['작고 섬세한', '적당한 존재감', '포인트가 되는 크기'];

export default function TasteTest4({ navigate }) {
  const [size, setSize] = useState([]);
  const [wear, setWear] = useState([]);

  const toggleSize = (opt) => setSize([opt]);
  const toggleWear = (opt) => setWear([opt]);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-3')} />

        <StepIndicator stepNum={4} stepDesc="상세한 착용 방식을 알려주세요." totalDots={5} activeDot={3} />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>원하는 크기</Text>
          <Chips options={SIZES} selected={size} onToggle={toggleSize} />
        </View>

        <View style={{ marginBottom: 16, marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 10 }}>착용 방식</Text>
          <Chips options={WEARS} selected={wear} onToggle={toggleWear} />
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button title="다음" full onPress={() => navigate('taste-complete')} />
        </View>
      </ScrollView>
    </View>
  );
}
