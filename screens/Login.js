import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { FakeStatusBar, UnderlineInput, Button, LogoBlock } from '../components/Shared';
import { colors } from '../theme';
import { authLogin, setTokens, decodeUserIdFromToken } from '../services/api';

export default function Login({ navigate }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [auto, setAuto] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleLogin = async () => {
    setError('');

    if (!id.trim() || !pw.trim()) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const response = await authLogin(id, pw);
      if (response.code === 'SUCCESS' && response.data) {
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        global.userId = decodeUserIdFromToken(accessToken);
        global.userEmail = id.trim();
        navigate('home');
      } else {
        setError(response.message || '로그인에 실패했습니다');
      }
    } catch (err) {
      setError(err.message || '로그인 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setSocialLoading('google');
    // WebView 스크린으로 이동
    navigate('socialLoginWebView', { provider: 'google' });
  };

  const handleKakaoLogin = () => {
    setSocialLoading('kakao');
    // WebView 스크린으로 이동
    navigate('socialLoginWebView', { provider: 'kakao' });
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <LogoBlock style={{ marginBottom: 32, marginTop: 20 }} />

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>이메일</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={id}
              onChangeText={setId}
              placeholder="이메일을 입력해주세요"
              style={{ paddingRight: 32 }}
            />
            {!!id && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setId('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={pw}
              onChangeText={setPw}
              placeholder="비밀번호를 입력해주세요"
              style={{ paddingRight: 32 }}
            />
            {!!pw && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setPw('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAuto(!auto)}>
            <View style={[styles.checkbox, auto && styles.checkboxChecked]}>
              {auto && <Text style={styles.checkboxMark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>자동로그인</Text>
          </TouchableOpacity>
          <Text style={styles.findText}>아이디/비밀번호 찾기</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button title={loading ? '로그인 중...' : '로그인'} full onPress={handleLogin} disabled={loading} />

        {/* 소셜 로그인 버튼 */}
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>또는</Text>
          <View style={styles.socialBtns}>
            <TouchableOpacity
              style={[styles.socialBtn, { borderColor: '#4285F4', backgroundColor: '#f0f7ff' }]}
              onPress={handleGoogleLogin}
              disabled={socialLoading !== null}
              activeOpacity={0.7}
            >
              {socialLoading === 'google' ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <Text style={styles.socialIconGoogle}>G</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, { borderColor: '#FFE812', backgroundColor: '#fffbf0' }]}
              onPress={handleKakaoLogin}
              disabled={socialLoading !== null}
              activeOpacity={0.7}
            >
              {socialLoading === 'kakao' ? (
                <ActivityIndicator size="small" color="#FFE812" />
              ) : (
                <Text style={styles.socialIconKakao}>K</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.socialHint}>소셜 로그인으로 빠르게 시작하세요</Text>
        </View>

        <TouchableOpacity
          style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}
          onPress={() => navigate('signup')}
        >
          <Text style={styles.signupText}>지금 바로 회원가입</Text>
          <Text style={styles.signupArrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28, justifyContent: 'center' },
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.main, borderColor: colors.main },
  checkboxMark: { color: 'white', fontSize: 11 },
  checkboxLabel: { fontSize: 12, color: colors.text },
  findText: { fontSize: 12, color: colors.findText },
  errorText: { fontSize: 13, color: '#d32f2f', marginBottom: 16, textAlign: 'center', fontWeight: '500' },
  socialContainer: { marginTop: 24, alignItems: 'center' },
  orText: { fontSize: 12, color: colors.textMuted, marginBottom: 12 },
  socialBtns: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  socialIconGoogle: { fontSize: 20, fontWeight: '700', color: '#4285F4' },
  socialIconKakao: { fontSize: 20, fontWeight: '700', color: '#FFE812' },
  socialHint: { fontSize: 11, color: colors.textMuted, marginTop: 12 },
  signupText: { fontSize: 14, color: colors.main, fontWeight: '500' },
  signupArrow: { fontSize: 13, color: colors.main },
});