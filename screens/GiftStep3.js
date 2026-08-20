import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, FormGroup, PillSelect, PillInput, Button } from '../components/Shared';

export default function GiftStep3({ navigate }) {
  const [color, setColor] = useState(global.giftData?.colors?.[0] || '');
  const [style, setStyle] = useState(global.giftData?.material || '');
  const [avoid, setAvoid] = useState(global.giftData?.avoid?.join(', ') || '');
  const [wear, setWear] = useState(global.giftData?.wearStyle || '');

  const handleNext = () => {
    global.giftData = global.giftData || {};
    global.giftData.colors = color ? [color] : [];
    global.giftData.material = style;
    global.giftData.avoid = avoid ? avoid.split(',').map(a => a.trim()) : [];
    global.giftData.wearStyle = wear;
    navigate('gift-step4');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="취향 정보 입력" onBack={() => navigate('gift-step2')} />

        <StepIndicator stepNum={3} stepDesc="상대방의 취향을 알려주세요." totalDots={4} activeDot={2} />

        <Card style={{ marginTop: 16 }}>
          <FormGroup label="색상">
            <PillSelect
              value={color}
              onChange={setColor}
              placeholder="색상을 선택해주세요"
              options={['화이트/아이보리', '블랙', '브라운/베이지', '그린', '블루', '핑크/레드', '기타']}
            />
          </FormGroup>

          <FormGroup label="스타일">
            <PillSelect
              value={style}
              onChange={setStyle}
              placeholder="스타일을 선택해주세요"
              options={['미니멀', '캐주얼', '클래식', '트렌디', '스포티']}
            />
          </FormGroup>

          <FormGroup label="피하고 싶은 취향">
            <PillInput placeholder="피하고 싶은 취향을 입력하세요." value={avoid} onChangeText={setAvoid} />
          </FormGroup>

          <FormGroup label="착용방식" style={{ marginBottom: 20 }}>
            <PillInput placeholder="카테고리 착용 방식을 입력하세요." value={wear} onChangeText={setWear} />
          </FormGroup>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="이전" onPress={() => navigate('gift-step2')} />
            <Button title="다음" onPress={handleNext} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}