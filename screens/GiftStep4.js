import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Button } from '../components/Shared';
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="취향 테스트 초대" onBack={() => navigate('gift-step3')} />

        <StepIndicator
          stepNum={4}
          stepDesc={'취향 테스트를 보내세요!\n상대방은 선물을 보지 않고 취향만 입력합니다.'}
          totalDots={4}
          activeDot={3}
        />

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>초대 링크 생성</Text>
          <View style={styles.linkBox}>
            <Text style={styles.linkUrl} numberOfLines={1}>
              https://wishblind.app/test/abc1234…
            </Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Text style={styles.copyBtnText}>{copied ? '복사됨!' : '복사'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shareBox}>
          <TouchableOpacity style={styles.shareItem}>
            <Text style={styles.shareText}>📱 QR 생성</Text>
            <Text style={styles.shareArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareItem}>
            <Text style={styles.shareText}>💬 카카오톡 보내기</Text>
            <Text style={styles.shareArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shareItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.shareText}>✉️ 문자 보내기</Text>
            <Text style={styles.shareArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 'auto', paddingTop: 20, gap: 10 }}>
          <Button title="내가 직접 취향 입력하기" full onPress={() => navigate('taste-5')} />
          <Button title="이전" full variant="outline" onPress={() => navigate('home')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  linkUrl: { flex: 1, fontSize: 12, color: colors.textMuted },
  copyBtn: { backgroundColor: colors.accent1, borderRadius: 8, paddingVertical: 5, paddingHorizontal: 12 },
  copyBtnText: { fontSize: 12, fontWeight: '600', color: colors.main },
  shareBox: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 16 },
  shareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent1,
  },
  shareText: { fontSize: 14, fontWeight: '600', color: colors.main },
  shareArrow: { color: colors.textMuted, fontSize: 16 },
});
