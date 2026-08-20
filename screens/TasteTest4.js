import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const SIZES = ['짧게', '기본 길이', '길게', '상관 없음'];
const WEARS = ['작고 섬세함', '적당한 존재감', '포인트가 되는 크기'];

export default function TasteTest4({ navigate }) {
  const [size, setSize] = useState(global.tasteAnswers?.size || '기본 길이');
  const [wear, setWear] = useState(global.tasteAnswers?.wearStyle || '적당한 존재감');

  const handleNext = () => {
    global.tasteAnswers = global.tasteAnswers || {};
    global.tasteAnswers.size = size;
    global.tasteAnswers.wearStyle = wear;
    navigate('taste-5');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-3')} />

        <StepIndicator stepNum={4} stepDesc="상세한 착용 방식을 알려주세요." totalDots={5} activeDot={3} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>원하는 크기</Text>
          <View style={[styles.chipBox, { marginBottom: 20 }]}>
            <Chips options={SIZES} selected={[size]} onToggle={setSize} />
          </View>

          <Text style={styles.label}>착용 방식</Text>
          <View style={styles.chipBox}>
            <Chips options={WEARS} selected={[wear]} onToggle={setWear} />
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