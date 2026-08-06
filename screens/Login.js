import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FakeStatusBar, FormInput, Button, LogoBlock } from '../components/Shared';
import { colors } from '../theme';

export default function Login({ navigate }) {
  const [id, setId] = useState('sssuin_');
  const [pw, setPw] = useState('••••••••••••');
  const [auto, setAuto] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <LogoBlock style={{ marginBottom: 36, marginTop: 20 }} />

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.inputRow}>
            <FormInput
              value={id}
              onChangeText={setId}
              placeholder="아이디를 입력해주세요"
              style={{ paddingRight: 40 }}
            />
            {!!id && (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setId('')}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputRow}>
            <FormInput
              value={pw}
              onChangeText={setPw}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry
              style={{ paddingRight: 40 }}
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

        <Button title="로그인" full onPress={() => navigate('home')} />

        <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={() => navigate('home')}>
          <Text style={styles.signupText}>지금 바로 회원가입 ›</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: 14 }}>
          <TouchableOpacity style={styles.googleBtn}>
            <Text style={{ fontSize: 18 }}>G</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28, justifyContent: 'center' },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  inputRow: { position: 'relative', justifyContent: 'center' },
  clearBtn: {
    position: 'absolute',
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: { color: 'white', fontSize: 11 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.main, borderColor: colors.main },
  checkboxMark: { color: 'white', fontSize: 11 },
  checkboxLabel: { fontSize: 13, color: colors.text },
  findText: { fontSize: 12, color: colors.textMuted },
  signupText: { fontSize: 13, color: colors.main, fontWeight: '600', textDecorationLine: 'underline' },
  googleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
