import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, Button, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';
import { getUser, updateUser, authLogout, clearTokens } from '../services/api';

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
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [notifyGift, setNotifyGift] = useState(true);
  const [notifyTaste, setNotifyTaste] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const userId = global.userId;

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (!userId) {
        Alert.alert('오류', '사용자 정보를 불러올 수 없습니다');
        return;
      }

      const response = await getUser(userId);
      if (response.code === 'SUCCESS' && response.data) {
        const data = response.data;
        setNickname(data.nickname || '');
        setEmail(data.email || '');
        setNotifyEnabled(data.notifyEnabled !== false);
        setNotifyGift(data.notifyGiftProgress !== false);
        setNotifyTaste(data.notifyTasteProgress !== false);
      }
    } catch (err) {
      Alert.alert('오류', err.message || '사용자 정보를 불러올 수 없습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요');
      return;
    }

    setSaving(true);
    try {
      if (!userId) {
        Alert.alert('오류', '사용자 정보가 없습니다');
        return;
      }

      const response = await updateUser(userId, {
        nickname,
        notifyEnabled,
        notifyGiftProgress: notifyGift,
        notifyTasteProgress: notifyTaste,
      });

      if (response.code === 'SUCCESS') {
        Alert.alert('성공', '정보가 저장되었습니다', [
          { text: '확인', onPress: () => navigate('home') }
        ]);
      } else {
        Alert.alert('오류', response.message || '정보 저장에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '정보 저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', onPress: () => {} },
      {
        text: '로그아웃',
        onPress: async () => {
          try {
            await authLogout();
            clearTokens();
            global.userId = null;
            global.userEmail = null;
            global.giftData = null;
            navigate('login');
          } catch (err) {
            console.error('Logout error:', err);
            clearTokens();
            global.userId = null;
            global.userEmail = null;
            global.giftData = null;
            navigate('login');
          }
        },
        style: 'destructive',
      },
    ]);
  };

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
          <View style={styles.inputBox}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>

        <View style={{ marginTop: 8, marginBottom: 24 }}>
          <ToggleRow label="알림 설정" value={notifyEnabled} onChange={setNotifyEnabled} />
          <ToggleRow label="선물진행 알림" value={notifyGift} onChange={setNotifyGift} />
          <ToggleRow label="취향 진행 알림" value={notifyTaste} onChange={setNotifyTaste} />
        </View>

        <Button
          title={saving ? '저장 중...' : '정보 수정 완료'}
          full
          onPress={handleSave}
          disabled={saving}
        />

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  avatarWrap: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent1, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  photoBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: colors.accent1, borderRadius: 16 },
  photoBtnText: { fontSize: 12, color: colors.main, fontWeight: '600' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 },
  inputBox: { borderWidth: 1, borderColor: colors.main, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: colors.white, position: 'relative' },
  inputField: { flex: 1 },
  inputInner: { fontSize: 14, color: colors.text, padding: 0, margin: 0 },
  emailText: { fontSize: 14, color: colors.titleSub },
  clearBtn: { position: 'absolute', right: 10, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.main, justifyContent: 'center', alignItems: 'center' },
  clearBtnText: { color: 'white', fontSize: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleLabel: { fontSize: 14, color: colors.text },
  toggleSwitch: { flexDirection: 'row', borderWidth: 1, borderColor: colors.main, borderRadius: 16, overflow: 'hidden' },
  toggleSide: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: colors.bg },
  toggleSideOn: { backgroundColor: colors.main },
  toggleSideOff: { backgroundColor: colors.bg },
  toggleText: { fontSize: 11, fontWeight: '600', color: colors.main },
  toggleTextOn: { color: 'white' },
  toggleTextOff: { color: colors.main },
  logoutBtn: { marginTop: 16, paddingVertical: 12, alignItems: 'center' },
  logoutText: { fontSize: 14, color: '#d32f2f', fontWeight: '600' },
});
