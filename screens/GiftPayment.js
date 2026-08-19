import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, Modal, TextInput } from 'react-native';
import { FakeStatusBar, Header, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';
import { preparePayment, confirmPayment } from '../services/api';

export default function GiftPayment({ navigate, route }) {
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [loading, setLoading] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const sessionId = route?.params?.sessionId || global.currentSessionId;

  useEffect(() => {
    preparePaymentInfo();
  }, []);

  const preparePaymentInfo = async () => {
    try {
      setPreparing(true);
      if (!sessionId) {
        Alert.alert('오류', '세션 정보가 없습니다');
        return;
      }

      const response = await preparePayment(sessionId);
      if (response.code === 'SUCCESS' && response.data) {
        setPaymentInfo(response.data);
      } else {
        Alert.alert('오류', response.message || '결제 준비에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '결제 준비 중 오류가 발생했습니다');
    } finally {
      setPreparing(false);
    }
  };

  const validateCardInfo = () => {
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      Alert.alert('오류', '카드번호는 16자리 숫자여야 합니다');
      return false;
    }
    if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
      Alert.alert('오류', '유효기간은 MM/YY 형식이어야 합니다');
      return false;
    }
    if (!cardCvc.match(/^\d{3}$/)) {
      Alert.alert('오류', 'CVC는 3자리 숫자여야 합니다');
      return false;
    }
    if (!cardHolder.trim()) {
      Alert.alert('오류', '카드 소유자명을 입력해주세요');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'CARD' && !validateCardInfo()) {
      return;
    }

    setLoading(true);
    try {
      if (!sessionId || !paymentInfo) {
        Alert.alert('오류', '필수 정보가 없습니다');
        return;
      }

      // 백엔드는 mock 결제라 orderId/paymentKey/method만 받는다.
      // 카드 정보는 UI 검증용일 뿐 서버로 보내면 알 수 없는 필드라며 요청 자체를 거부한다.
      // simulateFail은 스웨거상 선택 필드지만 실제로는 값이 없으면 요청이 거부된다.
      const paymentData = {
        orderId: paymentInfo.orderId,
        paymentKey: paymentInfo.paymentKey,
        method: paymentMethod,
        simulateFail: false,
      };

      const response = await confirmPayment(sessionId, paymentData);
      if (response.code === 'SUCCESS') {
        setShowComplete(true);
      } else {
        Alert.alert('결제 실패', response.message || '결제 처리 중 오류가 발생했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '결제 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  if (preparing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.main} />
        <Text style={{ marginTop: 16, color: colors.text }}>결제 처리 중...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="결제" onBack={() => navigate('gift-delivery')} />

        {/* 주문 요약 */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>주문 요약</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>주문번호</Text>
            <Text style={styles.summaryValue}>{paymentInfo?.orderId || '-'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>결제금액</Text>
            <Text style={[styles.summaryValue, { fontWeight: '700' }]}>
              ₩{paymentInfo?.amount?.toLocaleString() || '0'}
            </Text>
          </View>
        </View>

        {/* 결제 수단 선택 */}
        <Text style={styles.sectionTitle}>결제 수단</Text>
        <View style={styles.methodGroup}>
          <TouchableOpacity
            style={[styles.methodBtn, paymentMethod === 'CARD' && styles.methodBtnActive]}
            onPress={() => setPaymentMethod('CARD')}
          >
            <View style={[styles.methodRadio, paymentMethod === 'CARD' && styles.methodRadioActive]} />
            <Text style={styles.methodText}>💳 신용카드</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodBtn, paymentMethod === 'EASY_PAY' && styles.methodBtnActive]}
            onPress={() => setPaymentMethod('EASY_PAY')}
          >
            <View style={[styles.methodRadio, paymentMethod === 'EASY_PAY' && styles.methodRadioActive]} />
            <Text style={styles.methodText}>📱 간편결제</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodBtn, paymentMethod === 'BANK_TRANSFER' && styles.methodBtnActive]}
            onPress={() => setPaymentMethod('BANK_TRANSFER')}
          >
            <View style={[styles.methodRadio, paymentMethod === 'BANK_TRANSFER' && styles.methodRadioActive]} />
            <Text style={styles.methodText}>🏦 계좌이체</Text>
          </TouchableOpacity>
        </View>

        {/* 카드 정보 입력 */}
        {paymentMethod === 'CARD' && (
          <View style={styles.cardInfoSection}>
            <Text style={styles.sectionTitle}>카드 정보</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>카드번호</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={colors.textMuted}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>유효기간</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor={colors.textMuted}
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>CVC</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000"
                  placeholderTextColor={colors.textMuted}
                  value={cardCvc}
                  onChangeText={setCardCvc}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>카드 소유자명</Text>
              <TextInput
                style={styles.input}
                placeholder="HONG GILDONG"
                placeholderTextColor={colors.textMuted}
                value={cardHolder}
                onChangeText={setCardHolder}
              />
            </View>
          </View>
        )}

        {paymentMethod === 'EASY_PAY' && (
          <View style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              결제 버튼을 누르면 간편결제 앱으로 이동합니다
            </Text>
          </View>
        )}

        {paymentMethod === 'BANK_TRANSFER' && (
          <View style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              계좌이체 정보는 주문 완료 후 이메일로 발송됩니다
            </Text>
          </View>
        )}

        <BtnRow>
          <Button
            title="취소"
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => navigate('gift-delivery')}
          />
          <Button
            title="결제하기"
            style={{ flex: 1 }}
            onPress={() => setShowConfirm(true)}
            disabled={loading}
          />
        </BtnRow>
      </ScrollView>

      {/* 결제 확인 모달 */}
      <Modal visible={showConfirm} transparent animationType="fade" onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.overlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmIcon}>💳</Text>
            <Text style={styles.confirmTitle}>결제 확인</Text>
            <Text style={styles.confirmAmount}>
              ₩{paymentInfo?.amount?.toLocaleString() || '0'}
            </Text>
            <Text style={styles.confirmDesc}>
              이 금액으로 결제를 진행하시겠습니까?
            </Text>
            <BtnRow>
              <Button
                title="취소"
                variant="outline"
                style={{ flex: 1 }}
                onPress={() => setShowConfirm(false)}
              />
              <Button
                title="확인"
                style={{ flex: 1 }}
                onPress={() => {
                  setShowConfirm(false);
                  handlePayment();
                }}
              />
            </BtnRow>
          </View>
        </View>
      </Modal>

      {/* 결제 완료 모달 */}
      <Modal visible={showComplete} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.overlay}>
          <View style={styles.completeCard}>
            <Text style={styles.completeIcon}>✅</Text>
            <Text style={styles.completeTitle}>결제 완료!</Text>
            <Text style={styles.completeDesc}>
              선물이 성공적으로{'\n'}
              결제되었습니다.{'\n\n'}
              상대방이 기뻐할 모습을{'\n'}
              기대해보세요!
            </Text>
            <Button
              title="홈으로"
              onPress={() => {
                global.currentSessionId = null;
                navigate('home');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.accent1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  summaryLabel: { fontSize: 13, color: colors.titleSub },
  summaryValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 12, marginTop: 16 },
  methodGroup: { gap: 8, marginBottom: 24 },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  methodBtnActive: { backgroundColor: colors.accent1 },
  methodRadio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.main,
    marginRight: 10,
  },
  methodRadioActive: { backgroundColor: colors.main, borderColor: colors.main },
  methodText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  cardInfoSection: { marginBottom: 20 },
  formGroup: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.white,
  },
  row: { flexDirection: 'row', gap: 8 },
  noticeCard: {
    backgroundColor: colors.accent1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    marginTop: 16,
  },
  noticeText: { fontSize: 12, color: colors.text, textAlign: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  confirmCard: {
    backgroundColor: colors.bg,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  confirmIcon: { fontSize: 32, marginBottom: 12 },
  confirmTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
  confirmAmount: { fontSize: 20, fontWeight: '700', color: colors.main, marginBottom: 16 },
  confirmDesc: { fontSize: 13, color: colors.titleSub, textAlign: 'center', marginBottom: 20 },
  completeCard: {
    backgroundColor: colors.bg,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  completeIcon: { fontSize: 40, marginBottom: 12 },
  completeTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 12 },
  completeDesc: { fontSize: 13, color: colors.titleSub, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
});
