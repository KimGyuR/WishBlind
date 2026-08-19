import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, FormGroup, FormInput, FormTextarea, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';
import { setDelivery } from '../services/api';

export default function GiftDelivery({ navigate }) {
  const [method, setMethod] = useState('SHIP');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('오류', '이름을 입력해주세요');
      return;
    }

    if (method === 'SHIP' && !phone.trim()) {
      Alert.alert('오류', '전화번호를 입력해주세요');
      return;
    }

    if (method === 'SHIP' && !address.trim()) {
      Alert.alert('오류', '배송 주소를 입력해주세요');
      return;
    }

    if (method === 'STORE_PICKUP' && !date.trim()) {
      Alert.alert('오류', '예약 날짜를 입력해주세요');
      return;
    }

    if (method === 'STORE_PICKUP' && !time.trim()) {
      Alert.alert('오류', '시간을 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const userId = global.userId;
      const sessionId = global.currentSessionId;

      if (!userId || !sessionId) {
        Alert.alert('오류', '필수 정보가 없습니다');
        return;
      }

      const deliveryData = {
        method,
        recipientName: name,
        message,
      };

      if (method === 'SHIP') {
        deliveryData.phone = phone;
        deliveryData.address = address;
      } else {
        deliveryData.reserveDate = date;
        deliveryData.reserveTime = time;
      }

      const response = await setDelivery(userId, sessionId, deliveryData);
      if (response.code === 'SUCCESS') {
        global.currentSessionId = sessionId;
        navigate('gift-payment', { sessionId });
      } else {
        Alert.alert('오류', response.message || '배송 정보 저장에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '배송 정보 저장 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

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
          <Button title="홈으로" style={{ paddingHorizontal: 40 }} onPress={() => {
            global.currentSessionId = null;
            navigate('home');
          }} />
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
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
          style={[styles.deliveryOpt, method === 'SHIP' && styles.deliveryOptActive]}
          onPress={() => setMethod('SHIP')}
        >
          <View style={[styles.radio, method === 'SHIP' && styles.radioActive]}>
            {method === 'SHIP' && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.optLabel}>🚚 배송하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deliveryOpt, method === 'STORE_PICKUP' && styles.deliveryOptActive]}
          onPress={() => setMethod('STORE_PICKUP')}
        >
          <View style={[styles.radio, method === 'STORE_PICKUP' && styles.radioActive]}>
            {method === 'STORE_PICKUP' && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.optLabel}>🏪 매장 방문 수령</Text>
        </TouchableOpacity>

        {method === 'SHIP' && (
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

        {method === 'STORE_PICKUP' && (
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
          <Button title="다음 (결제)" style={{ flex: 1 }} onPress={handleSubmit} disabled={loading} />
        </BtnRow>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24, paddingBottom: 28 },
  completeWrap: { justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 40, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 12, textAlign: 'center' },
  desc: { fontSize: 14, color: colors.titleSub, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 12 },
  deliveryOpt: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.main, borderRadius: 12, backgroundColor: colors.white },
  deliveryOptActive: { backgroundColor: colors.accent1 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.main, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: colors.main },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.main },
  optLabel: { fontSize: 14, fontWeight: '500', color: colors.text },
});
