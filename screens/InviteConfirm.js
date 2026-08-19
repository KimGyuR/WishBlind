import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FakeStatusBar, Header, Card, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';
import { verifyInviteCode, getInviteInfo, getTasteForm } from '../services/api';

export default function InviteConfirm({ navigate }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const input = code.trim();
    if (!input) {
      Alert.alert('오류', '초대 코드나 링크를 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      // 링크(https://.../invite/{token})로 붙여넣은 경우와 짧은 코드를 직접 입력한 경우를 구분
      const linkMatch = input.match(/\/invite\/([^/?#\s]+)/);

      let inviteToken;
      let inviteData;

      if (linkMatch) {
        inviteToken = linkMatch[1];
        const infoResponse = await getInviteInfo(inviteToken);
        if (infoResponse.code !== 'SUCCESS' || !infoResponse.data) {
          Alert.alert('오류', infoResponse.message || '유효하지 않은 초대 링크입니다');
          return;
        }
        inviteData = infoResponse.data;
      } else {
        const response = await verifyInviteCode(input);
        if (response.code !== 'SUCCESS' || !response.data) {
          Alert.alert('오류', response.message || '유효하지 않은 초대 코드입니다');
          return;
        }
        inviteToken = response.data.inviteToken || input;
        inviteData = response.data;
      }

      global.inviteData = { token: inviteToken, ...inviteData };

      // 취향 폼 조회
      const formResponse = await getTasteForm(inviteToken);
      if (formResponse.code === 'SUCCESS' && formResponse.data) {
        global.tasteForm = formResponse.data;
        navigate('taste-1');
      } else {
        Alert.alert('오류', formResponse.message || '취향 폼을 불러올 수 없습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '초대 확인 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="초대 확인" onBack={() => navigate('home')} />

        <Text style={styles.desc}>받은 초대 링크나 코드를 입력해 주세요.</Text>

        <Card style={{ marginTop: 8 }}>
          <Text style={styles.label}>초대 링크 또는 코드 입력</Text>
          <PillInput value={code} onChangeText={setCode} style={{ marginBottom: 16 }} />

          <TouchableOpacity style={styles.qrRow}>
            <Text style={styles.qrText}>QR 코드 스캔</Text>
            <Text style={styles.qrArrow}>›</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'flex-end', marginTop: 16 }}>
            <Button title={loading ? '확인 중...' : '초대 확인'} onPress={handleConfirm} disabled={loading} />
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: { fontSize: 13, color: colors.stepDesc, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 },
  qrRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  qrText: { fontSize: 14, color: colors.main, fontWeight: '500' },
  qrArrow: { fontSize: 14, color: colors.main },
});