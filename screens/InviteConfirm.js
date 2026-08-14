import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, Card, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';

export default function InviteConfirm({ navigate }) {
  const [code, setCode] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="초대 확인" onBack={() => navigate('home')} />

        <Text style={styles.desc}>받은 초대 링크나 코드를 입력해 주세요.</Text>

        <Card style={{ marginTop: 8 }}>
          <Text style={styles.label}>초대 코드 입력</Text>
          <PillInput value={code} onChangeText={setCode} style={{ marginBottom: 16 }} />

          <TouchableOpacity style={styles.qrRow}>
            <Text style={styles.qrText}>QR 코드 스캔</Text>
            <Text style={styles.qrArrow}>›</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'flex-end', marginTop: 16 }}>
            <Button title="초대 확인" onPress={() => navigate('taste-1')} />
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