import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, FormGroup, Select, FormInput, Button, BtnRow } from '../components/Shared';

export default function GiftStep3({ navigate }) {
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [avoid, setAvoid] = useState('');
  const [wear, setWear] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 정보 입력" onBack={() => navigate('gift-step2')} />

        <StepIndicator stepNum={3} stepDesc="상대방의 취향을 알려주세요." totalDots={4} activeDot={2} />

        <FormGroup label="색상" emoji="🎨">
          <Select
            value={color}
            onChange={setColor}
            placeholder="색상을 선택해주세요"
            options={['화이트/아이보리', '블랙', '브라운/베이지', '그린', '블루', '핑크/레드', '기타']}
          />
        </FormGroup>

        <FormGroup label="스타일" emoji="👗">
          <Select
            value={style}
            onChange={setStyle}
            placeholder="스타일을 선택해주세요"
            options={['미니멀', '캐주얼', '클래식', '트렌디', '스포티']}
          />
        </FormGroup>

        <FormGroup label="피하고 싶은 취향" emoji="🚫">
          <FormInput placeholder="피하고 싶은 취향을 입력해주세요" value={avoid} onChangeText={setAvoid} />
        </FormGroup>

        <FormGroup label="착용방식" emoji="📦">
          <FormInput placeholder="카테고리 적용 방식을 입력해주세요" value={wear} onChangeText={setWear} />
        </FormGroup>

        <BtnRow>
          <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={() => navigate('gift-step2')} />
          <Button title="다음" style={{ flex: 1 }} onPress={() => navigate('gift-step4')} />
        </BtnRow>
      </ScrollView>
    </View>
  );
}
