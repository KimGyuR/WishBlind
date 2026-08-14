import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Button } from '../components/Shared';
import { colors } from '../theme';

export default function GiftStep4({ navigate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="취향 테스트 초대" onBack={() => navigate('gift-step3')} />

        <StepIndicator
          stepNum={4}
          stepDesc={'취향 테스트를 보내세요!\n상대방은 상품을 보지 않고 취향만 입력합니다.'}
          totalDots={4}
          activeDot={3}
        />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>초대 링크 생성</Text>
          <View style={styles.linkBox}>
            <Text style={styles.linkUrl} numberOfLines={1}>
              https://wishblind/....
            </Text>
            <TouchableOpacity onPress={handleCopy}>
              <Text style={styles.copyText}>{copied ? '복사됨!' : '복사'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, gap: 14, alignItems: 'center' }}>
            <TouchableOpacity style={styles.shareRow}>
              <Text style={styles.shareText}>QR 생성</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareRow}>
              <Text style={styles.shareText}>카카오톡 보내기</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareRow}>
              <Text style={styles.shareText}>문자 보내기</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
            <Button title="이전" onPress={() => navigate('gift-step3')} />
            <Button title="홈으로" onPress={() => navigate('home')} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  linkUrl: { flex: 1, fontSize: 12, color: colors.titleSub, marginRight: 8 },
  copyText: { fontSize: 13, fontWeight: '600', color: colors.main },
  shareRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  shareText: { fontSize: 14, fontWeight: '500', color: colors.text },
  shareArrow: { fontSize: 14, color: colors.textMuted },
});