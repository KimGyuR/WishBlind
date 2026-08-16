import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import { FakeStatusBar, Header, Button, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';

function ToggleRow({ label, value, onChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.toggleSwitch}>
        <TouchableOpacity
          style={[styles.toggleSide, value && styles.toggleSideOn]}
          onPress={() => onChange(true)}
        >
          <Text style={[styles.toggleText, value && styles.toggleTextOn]}>ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleSide, !value && styles.toggleSideOff]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.toggleText, !value && styles.toggleTextOff]}>OFF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ClearableInput({ value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.inputBox}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.inputInner}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {!!value && (
        <TouchableOpacity style={styles.clearBtn} onPress={() => onChangeText('')}>
          <Text style={styles.clearBtnText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function Personal({ navigate }) {
  const [nickname, setNickname] = useState('멋쟁이사자');
  const [email, setEmail] = useState('aa12345@naver.com');
  const [password, setPassword] = useState('**********');
  const [notifyAll, setNotifyAll] = useState(true);
  const [notifyGift, setNotifyGift] = useState(true);
  const [notifyTaste, setNotifyTaste] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <Header title="내 페이지" onBack={() => navigate('home')} />

        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <ProfileIcon size={48} color={colors.main} />
          </View>
          <TouchableOpacity style={styles.photoBtn}>
            <Text style={styles.photoBtnText}>사진 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>닉네임</Text>
          <ClearableInput value={nickname} onChangeText={setNickname} placeholder="닉네임을 입력해주세요" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>이메일</Text>
          <ClearableInput value={email} onChangeText={setEmail} placeholder="이메일을 입력해주세요" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>비밀번호 변경</Text>
          <ClearableInput value={password} onChangeText={setPassword} secureTextEntry placeholder="비밀번호를 입력해주세요" />
        </View>

        <View style={{ marginTop: 8, marginBottom: 24 }}>
          <ToggleRow label="알림 설정" value={notifyAll} onChange={setNotifyAll} />
          <ToggleRow label="선물진행 알림" value={notifyGift} onChange={setNotifyGift} />
          <ToggleRow label="취향 진행 알림" value={notifyTaste} onChange={setNotifyTaste} />
        </View>

        <Button title="정보 수정 완료" full onPress={() => navigate('home')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  avatarWrap: { alignItems: 'center', marginTop: 8, marginBottom: 24 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoBtn: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  photoBtnText: { fontSize: 12, color: colors.main, fontWeight: '600' },

  formGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8 },

  inputBox: { position: 'relative', justifyContent: 'center' },
  inputField: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingRight: 44,
  },
  inputInner: {
    fontSize: 14,
    color: colors.text,
    padding: 0,
    margin: 0,
    ...Platform.select({ web: { outlineStyle: 'none', boxShadow: 'none' }, default: {} }),
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: { color: 'white', fontSize: 11 },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: colors.text },
  toggleSwitch: {
    flexDirection: 'row',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.accent1,
  },
  toggleSide: { paddingVertical: 6, paddingHorizontal: 16 },
  toggleSideOn: { backgroundColor: colors.main, borderRadius: 999 },
  toggleSideOff: { backgroundColor: '#9a9491', borderRadius: 999 },
  toggleText: { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  toggleTextOn: { color: colors.white },
  toggleTextOff: { color: colors.white },
});