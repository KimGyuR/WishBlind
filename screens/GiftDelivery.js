import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, FormGroup, FormInput, FormTextarea, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';

export default function GiftDelivery({ navigate }) {
  const [method, setMethod] = useState('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <View style={{ flex: 1 }}>
        <FakeStatusBar />
        <View style={[styles.screen, styles.completeWrap]}>
          <Text style={styles.icon}>🎉</Text>
          <Text style={styles.title}>선물 전달 완료!</Text>
          <Text style={styles.desc}>
            선물이 성공적으로 전달됐습니다.{'\n'}
            상대방이 기뻐할 모습을 기대해보세요!
          </Text>
          <Button title="홈으로" style={{ paddingHorizontal: 40 }} onPress={() => navigate('home')} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="선물 전달" onBack={() => navigate('ai-detail')} />

        <Text style={styles.sectionTitle}>선물 전달 방법</Text>

        <TouchableOpacity
          style={[styles.deliveryOpt, method === 'delivery' && styles.deliveryOptActive]}
          onPress={() => setMethod('delivery')}
        >
          <View style={[styles.radio, method === 'delivery' && styles.radioActive]}>
            {method === 'delivery' && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.optLabel}>🚚 배송하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deliveryOpt, method === 'store' && styles.deliveryOptActive]}
          onPress={() => setMethod('store')}
        >
          <View style={[styles.radio, method === 'store' && styles.radioActive]}>
            {method === 'store' && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.optLabel}>🏪 매장 방문 수령</Text>
        </TouchableOpacity>

        {method === 'delivery' && (
          <View style={{ marginTop: 16 }}>
            <FormGroup label="배송자 이름">
              <FormInput placeholder="이름" value={name} onChangeText={setName} />
            </FormGroup>
            <FormGroup label="전화번호">
              <FormInput placeholder="010-0000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </FormGroup>
            <FormGroup label="배송 주소">
              <FormInput placeholder="주소를 입력해주세요" value={address} onChangeText={setAddress} />
            </FormGroup>
          </View>
        )}

        {method === 'store' && (
          <View style={{ marginTop: 16 }}>
            <FormGroup label="이름">
              <FormInput placeholder="이름" value={name} onChangeText={setName} />
            </FormGroup>
            <FormGroup label="예약 날짜">
              <FormInput placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
            </FormGroup>
            <FormGroup label="시간 선택">
              <FormInput placeholder="HH:MM" value={time} onChangeText={setTime} />
            </FormGroup>
          </View>
        )}

        <FormGroup label="메세지 작성">
          <FormTextarea placeholder="주고 싶은 메세지를 작성해주세요." value={message} onChangeText={setMessage} />
        </FormGroup>

        <BtnRow>
          <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={() => navigate('ai-detail')} />
          <Button title="전달하기" style={{ flex: 1 }} onPress={() => setDone(true)} />
        </BtnRow>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 22, paddingBottom: 28 },
  completeWrap: { alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 58, marginBottom: 18 },
  title: { fontSize: 22, fontWeight: '800', color: colors.main, marginBottom: 12 },
  desc: { fontSize: 14, color: colors.textMuted, lineHeight: 24, textAlign: 'center', marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  deliveryOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 10,
  },
  deliveryOptActive: { borderColor: colors.main, backgroundColor: colors.deliveryActiveBg },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: colors.main },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.main },
  optLabel: { fontSize: 14, fontWeight: '600', color: colors.text },
});
