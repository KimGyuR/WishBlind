import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, FormGroup, FormInput, Button } from '../components/Shared';
import { colors } from '../theme';

export default function InviteConfirm({ navigate }) {
  const [code, setCode] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="초대 확인" onBack={() => navigate('home')} />

        <Text style={styles.desc}>받은 초대 링크나 코드를 입력해 주세요.</Text>

        <FormGroup label="초대 코드 입력">
          <FormInput
            value={code}
            onChangeText={setCode}
            style={{ letterSpacing: 4, textAlign: 'center' }}
          />
        </FormGroup>

        <View style={[styles.shareBox, { marginBottom: 24 }]}>
          <TouchableOpacity style={[styles.shareItem, { borderBottomWidth: 0 }]}>
            <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>QR 코드 스캔</Text>
            <Text style={styles.shareArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <Button title="초대 확인" full onPress={() => navigate('taste-1')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: { fontSize: 13, color: colors.textMuted, marginBottom: 24, textAlign: 'center' },
  shareBox: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 16 },
  shareItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  shareArrow: { color: colors.textMuted, fontSize: 16 },
});
