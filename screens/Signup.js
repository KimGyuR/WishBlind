import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FakeStatusBar, UnderlineInput, Button, LogoBlock } from '../components/Shared';
import { colors } from '../theme';
import { authSignup, setTokens, decodeUserIdFromToken } from '../services/api';

export default function Signup({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    setError('');

    if (!email.trim()) {
      setError('이메일을 입력해주세요');
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('유효한 이메일을 입력해주세요');
      return false;
    }
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요');
      return false;
    }
    if (password.length < 8 || password.length > 64) {
      setError('비밀번호는 8자 이상 64자 이하여야 합니다');
      return false;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return false;
    }
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요');
      return false;
    }
    if (!agreeTerms) {
      setError('약관에 동의해야 합니다');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      console.log('회원가입 시도:', { email, nickname });

      // 약관 동의 체크박스 하나로 필수 약관(서비스 이용약관, 개인정보 처리방침) 동의를 함께 처리
      const terms = [
        { termsType: 'SERVICE', version: '1.0', agreed: true },
        { termsType: 'PRIVACY', version: '1.0', agreed: true },
      ];
      const response = await authSignup(email, password, nickname, phone, terms);

      console.log('회원가입 응답:', response);

      if (response.code === 'SUCCESS' && response.data) {
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        global.userId = decodeUserIdFromToken(accessToken);
        Alert.alert('성공', '회원가입이 완료되었습니다', [
          { text: '확인', onPress: () => navigate('home') }
        ]);
      } else {
        setError(response.message || '회원가입에 실패했습니다');
      }
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError(err.message || '회원가입 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>새로운 계정을 만들어주세요</Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>이메일</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              keyboardType="email-address"
              style={{ paddingRight: 32 }}
            />
            {!!email && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setEmail('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>비밀번호 (8-64자)</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry
              style={{ paddingRight: 32 }}
            />
            {!!password && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setPassword('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="비밀번호를 다시 입력해주세요"
              secureTextEntry
              style={{ paddingRight: 32 }}
            />
            {!!confirmPassword && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setConfirmPassword('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>닉네임</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="사용할 닉네임을 입력해주세요"
              style={{ paddingRight: 32 }}
            />
            {!!nickname && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setNickname('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={styles.label}>전화번호 (선택)</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={phone}
              onChangeText={setPhone}
              placeholder="010-0000-0000"
              keyboardType="phone-pad"
              style={{ paddingRight: 32 }}
            />
            {!!phone && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setPhone('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <Text style={styles.checkboxMark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            이용약관 및 개인정보 처리방침에 동의합니다
          </Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          title={loading ? '가입 중...' : '회원가입'}
          full
          onPress={handleSignup}
          disabled={loading}
          style={{ marginTop: 16 }}
        />

        <TouchableOpacity
          style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}
          onPress={() => navigate('login')}
        >
          <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
          <Text style={styles.loginLink}>로그인</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 13, color: colors.titleSub },
  label: { fontSize: 14, fontWeight: '500', color: colors.textMuted, marginBottom: 4 },
  inputRow: { position: 'relative', justifyContent: 'center' },
  clearBtn: {
    position: 'absolute',
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: { color: 'white', fontSize: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: colors.main, borderColor: colors.main },
  checkboxMark: { color: 'white', fontSize: 11 },
  checkboxLabel: { fontSize: 12, color: colors.text, flex: 1, lineHeight: 18 },
  errorText: { fontSize: 13, color: '#d32f2f', marginBottom: 16, textAlign: 'center', fontWeight: '500' },
  loginText: { fontSize: 13, color: colors.textMuted },
  loginLink: { fontSize: 13, color: colors.main, fontWeight: '600' },
});
