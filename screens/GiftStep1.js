import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, FormGroup, PillSelect, PillInput, Button } from '../components/Shared';

export default function GiftStep1({ navigate }) {
  const [relation, setRelation] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="기본 정보 입력" onBack={() => navigate('home')} />

        <StepIndicator stepNum={1} stepDesc="기본 정보를 알려주세요." totalDots={4} activeDot={0} />

        <Card style={{ marginTop: 16 }}>
          <FormGroup label="관계" emoji="👥">
            <PillSelect
              value={relation}
              onChange={setRelation}
              placeholder="관계를 선택해주세요"
              options={['연인', '친구', '부모님', '형제/자매', '동료']}
            />
          </FormGroup>

          <FormGroup label="기념일" emoji="🎂">
            <PillSelect
              value={anniversary}
              onChange={setAnniversary}
              placeholder="기념일을 선택해주세요."
              options={['생일', '기념일', '졸업', '취업', '크리스마스', '기타']}
            />
          </FormGroup>

          <FormGroup label="예산" emoji="💰">
            <PillSelect
              value={budget}
              onChange={setBudget}
              placeholder="예산을 선택해주세요."
              options={['3만원 이하', '3~5만원', '5~10만원', '10~20만원', '20~50만원', '50만원 이상']}
            />
          </FormGroup>

          <FormGroup label="카테고리" emoji="👜">
            <PillInput placeholder="카테고리를 입력해주세요." value={category} onChangeText={setCategory} />
          </FormGroup>

          <FormGroup label="브랜드" emoji="🏷" style={{ marginBottom: 20 }}>
            <PillInput placeholder="선호 브랜드를 입력해주세요." value={brand} onChangeText={setBrand} />
          </FormGroup>

          <View style={{ alignItems: 'flex-end' }}>
            <Button title="다음" onPress={() => navigate('gift-step2')} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}