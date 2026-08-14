import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, Button } from '../components/Shared';
import { colors } from '../theme';

const MATERIALS = ['패브릭', '가죽', '메탈', '기타'];
const LOGOS = ['거의 없음', '작게 보임', '눈에 띄어도 괜찮음'];

export default function TasteTest3({ navigate }) {
  const [materials, setMaterials] = useState(['패브릭']);
  const [logo, setLogo] = useState(['작게 보임']);

  const toggleMaterial = (opt) => {
    setMaterials((prev) => (prev.includes(opt) ? prev.filter((m) => m !== opt) : [...prev, opt]));
  };

  const toggleLogo = (opt) => setLogo([opt]);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-2')} />

        <StepIndicator stepNum={3} stepDesc="소재와 디테일 취향을 알려주세요." totalDots={5} activeDot={2} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>선호 소재</Text>
          <View style={[styles.chipBox, { marginBottom: 20 }]}>
            <Chips options={MATERIALS} selected={materials} onToggle={toggleMaterial} />
          </View>

          <Text style={styles.label}>로고 노출</Text>
          <View style={styles.chipBox}>
            <Chips options={LOGOS} selected={logo} onToggle={toggleLogo} />
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Button title="다음" onPress={() => navigate('taste-4')} />
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