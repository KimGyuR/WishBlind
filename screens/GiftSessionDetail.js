import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, Card, FormGroup, FormInput, FormTextarea, Button } from '../components/Shared';
import { colors } from '../theme';
import { getGiftSession, getDelivery, setDelivery } from '../services/api';

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function GiftSessionDetail({ navigate, route }) {
  const sessionId = route?.params?.sessionId;

  const [session, setSession] = useState(null);
  const [delivery, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [method, setMethod] = useState('SHIP');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const userId = global.userId;
      if (!userId || !sessionId) {
        Alert.alert('오류', '선물 정보를 찾을 수 없습니다');
        navigate('home');
        return;
      }

      const res = await getGiftSession(userId, sessionId);
      if (res.code === 'SUCCESS' && res.data) {
        setSession(res.data);
      }

      try {
        const dRes = await getDelivery(userId, sessionId);
        if (dRes.code === 'SUCCESS' && dRes.data) {
          const d = dRes.data;
          setDeliveryData(d);
          setMethod(d.method || 'SHIP');
          setName(d.recipientName || '');
          setPhone(d.phone || '');
          setAddress(d.address || '');
          setMessage(d.message || '');
          setDate(d.reserveDate || '');
          setTime(d.reserveTime || '');
        }
      } catch (e) {
        // 아직 배송 정보를 입력하지 않은 상태 — 정상
      }
    } catch (err) {
      Alert.alert('오류', err.message || '선물 정보를 불러올 수 없습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDelivery = async () => {
    if (!name.trim()) {
      Alert.alert('오류', '이름을 입력해주세요');
      return;
    }
    if (method === 'SHIP' && (!phone.trim() || !address.trim())) {
      Alert.alert('오류', '전화번호와 배송 주소를 입력해주세요');
      return;
    }
    if (method === 'STORE_PICKUP' && (!date.trim() || !time.trim())) {
      Alert.alert('오류', '예약 날짜와 시간을 입력해주세요');
      return;
    }

    setSaving(true);
    try {
      const userId = global.userId;
      const deliveryData = { method, recipientName: name, message };
      if (method === 'SHIP') {
        deliveryData.phone = phone;
        deliveryData.address = address;
      } else {
        deliveryData.reserveDate = date;
        deliveryData.reserveTime = time;
      }

      const res = await setDelivery(userId, sessionId, deliveryData);
      if (res.code === 'SUCCESS') {
        setDeliveryData({ ...delivery, ...deliveryData });
        setEditing(false);
      } else {
        Alert.alert('오류', res.message || '저장에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  }

  if (!session) return null;

  const canViewResults = !['CREATED', 'INVITED'].includes(session.status);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <Header title="선물 상세" onBack={() => navigate('home')} />

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>{session.statusLabel}</Text>
          <Text style={styles.dateLabel}>{session.createdAt ? session.createdAt.split('T')[0] : ''}</Text>
        </View>

        <Card style={{ marginTop: 12 }}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          <InfoRow label="관계" value={session.relationship} />
          <InfoRow label="기념일" value={session.occasion} />
          <InfoRow
            label="예산"
            value={
              session.budgetMin != null && session.budgetMax != null
                ? `${session.budgetMin.toLocaleString()}원 ~ ${session.budgetMax.toLocaleString()}원`
                : ''
            }
          />
          <InfoRow label="카테고리" value={session.category} />
          <InfoRow label="브랜드" value={session.brand} />
          <InfoRow label="전하고 싶은 의미" value={session.meaning} />
          <InfoRow label="분위기" value={session.moods && session.moods.length ? session.moods.join(', ') : ''} />
        </Card>

        {!canViewResults && session.inviteCode && (
          <Card style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>초대 정보</Text>
            <InfoRow label="초대 코드" value={session.inviteCode} />
            <Text style={styles.helperText}>상대방이 아직 취향을 입력하지 않았어요. 초대 코드를 다시 공유해보세요.</Text>
          </Card>
        )}

        {canViewResults && (
          <Button
            title="AI 추천 결과 보기"
            full
            style={{ marginTop: 16 }}
            onPress={() => {
              global.currentSessionId = sessionId;
              navigate('ai-results', { sessionId });
            }}
          />
        )}

        <Card style={{ marginTop: 16 }}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>배송 정보</Text>
            {!editing && (
              <TouchableOpacity onPress={() => setEditing(true)}>
                <Text style={styles.editLink}>{delivery ? '수정' : '입력'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {editing ? (
            <>
              <View style={styles.methodRow}>
                <TouchableOpacity
                  style={[styles.methodOpt, method === 'SHIP' && styles.methodOptActive]}
                  onPress={() => setMethod('SHIP')}
                >
                  <Text style={styles.methodOptText}>🚚 배송하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.methodOpt, method === 'STORE_PICKUP' && styles.methodOptActive]}
                  onPress={() => setMethod('STORE_PICKUP')}
                >
                  <Text style={styles.methodOptText}>🏪 매장 방문 수령</Text>
                </TouchableOpacity>
              </View>

              <FormGroup label="이름">
                <FormInput placeholder="이름" value={name} onChangeText={setName} />
              </FormGroup>

              {method === 'SHIP' ? (
                <>
                  <FormGroup label="전화번호">
                    <FormInput placeholder="010-0000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                  </FormGroup>
                  <FormGroup label="배송 주소">
                    <FormInput placeholder="주소를 입력해주세요" value={address} onChangeText={setAddress} />
                  </FormGroup>
                </>
              ) : (
                <>
                  <FormGroup label="예약 날짜">
                    <FormInput placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
                  </FormGroup>
                  <FormGroup label="시간">
                    <FormInput placeholder="HH:MM" value={time} onChangeText={setTime} />
                  </FormGroup>
                </>
              )}

              <FormGroup label="메시지">
                <FormTextarea placeholder="주고 싶은 메시지를 작성해주세요." value={message} onChangeText={setMessage} />
              </FormGroup>

              <View style={styles.btnRow}>
                <Button title="취소" variant="outline" style={{ flex: 1 }} onPress={() => setEditing(false)} />
                <Button
                  title={saving ? '저장 중...' : '저장'}
                  style={{ flex: 1, marginLeft: 8 }}
                  onPress={handleSaveDelivery}
                  disabled={saving}
                />
              </View>
            </>
          ) : delivery ? (
            <>
              <InfoRow label="전달 방법" value={delivery.methodLabel || delivery.method} />
              <InfoRow label="받는 분" value={delivery.recipientName} />
              <InfoRow label="주소" value={delivery.address} />
              <InfoRow label="전화번호" value={delivery.phone} />
              <InfoRow label="예약일시" value={delivery.reserveDate ? `${delivery.reserveDate} ${delivery.reserveTime || ''}` : ''} />
              <InfoRow label="메시지" value={delivery.message} />
            </>
          ) : (
            <Text style={styles.emptyText}>아직 배송 정보를 입력하지 않았습니다.</Text>
          )}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 },
  statusLabel: { fontSize: 15, fontWeight: '700', color: colors.main },
  dateLabel: { fontSize: 12, color: colors.titleSub },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 12 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  editLink: { fontSize: 13, fontWeight: '600', color: colors.main },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: 13, color: colors.titleSub },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.text, flex: 1, textAlign: 'right', marginLeft: 12 },
  helperText: { fontSize: 12, color: colors.titleSub, marginTop: 10, lineHeight: 18 },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingVertical: 12 },
  methodRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  methodOpt: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  methodOptActive: { backgroundColor: colors.accent1 },
  methodOptText: { fontSize: 13, fontWeight: '500', color: colors.text },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
