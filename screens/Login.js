import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, UnderlineInput, Button, LogoBlock } from '../components/Shared';
import { colors } from '../theme';

export default function Login({ navigate }) {
  const [id, setId] = useState('user123');
  const [pw, setPw] = useState('0000');
  const [auto, setAuto] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!id.trim() || !pw.trim()) {
      setError('아이디와 비밀번호를 입력해주세요');
      return;
    }

    // admin account -> employee page
    if (id === 'admin' && pw === '1234') {
      navigate('employee');
    }
    // personal account -> home page
    else if (id === 'user123' && pw === '0000') {
      navigate('home');
    }
    else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <LogoBlock style={{ marginBottom: 32, marginTop: 20 }} />

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.inputRow}>
            <UnderlineInput
              value={id}
              onChangeText={setId}
              placeholder="아이디를 입력해주세요"
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

        <Button title="로그인" full onPress={handleLogin} />

        <TouchableOpacity
          style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}
          onPress={() => navigate('home')}
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
  signupText: { fontSize: 14, color: colors.main, fontWeight: '500' },
  signupArrow: { fontSize: 13, color: colors.main },
});