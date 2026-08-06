import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, FormTextarea, Chips, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';

const MOODS = ['설레는', '특별한', '기쁨', '따뜻한', '감동적인', '기타'];

export default function GiftStep2({ navigate }) {
  const [meaning, setMeaning] = useState('');
  const [moods, setMoods] = useState([]);

  const toggleMood = (opt) => {
    setMoods((prev) => (prev.includes(opt) ? prev.filter((m) => m !== opt) : [...prev, opt]));
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="선물 의미 입력" onBack={() => navigate('gift-step1')} />

        <StepIndicator stepNum={2} stepDesc="어떤 마음을 전하고 싶나요?" totalDots={4} activeDot={1} />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 7 }}>
            전하고 싶은 의미
          </Text>
          <FormTextarea
            placeholder={'예) 항상 곁에 있어줘서 고마워,\n앞으로도 함께 할 수 있는 선물이었으면 좋겠어.'}
            value={meaning}
            onChangeText={setMeaning}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 12 }}>선물 분위기</Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 10 }}>
            피하고자 하는 선택을 할 수 있어요.
          </Text>
          <Chips options={MOODS} selected={moods} onToggle={toggleMood} />
        </View>

        <BtnRow>
          <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={() => navigate('gift-step1')} />
          <Button title="다음" style={{ flex: 1 }} onPress={() => navigate('gift-step3')} />
        </BtnRow>
      </ScrollView>
    </View>
  );
}
