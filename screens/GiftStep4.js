import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Clipboard, Alert } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Button } from '../components/Shared';
import { colors } from '../theme';
import { createGiftSession, createInvite } from '../services/api';

// GiftStep1/2/3에서 한글 라벨로 수집한 값을 서버가 기대하는 형태로 변환한다.
const MOOD_ENUM = {
  '실용적': 'PRACTICAL',
  '특별한': 'SPECIAL',
  '기념용': 'COMMEMORATIVE',
  '럭셔리': 'LUXURY',
  '감동적인': 'TOUCHING',
  '기타': 'ETC',
};

const BUDGET_RANGES = {
  '3만원 이하': { min: 0, max: 30000 },
  '3~5만원': { min: 30000, max: 50000 },
  '5~10만원': { min: 50000, max: 100000 },
  '10~20만원': { min: 100000, max: 200000 },
  '20~50만원': { min: 200000, max: 500000 },
  '50만원 이상': { min: 500000, max: 3000000 },
};

export default function GiftStep4({ navigate }) {
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
    try {
      setLoading(true);
      const userId = global.userId;
      const data = global.giftData;

      if (!data || !userId) {
        Alert.alert('오류', '필수 정보가 없습니다');
        navigate('gift-step1');
        return;
      }

      const budget = BUDGET_RANGES[data.budgetRange] || { min: 0, max: 0 };
      const moods = (data.moods || []).map((m) => MOOD_ENUM[m]).filter(Boolean);
      const hasKnownTaste = (data.colors && data.colors.length) || data.material || (data.avoid && data.avoid.length) || data.wearStyle;
      const giverKnownTaste = hasKnownTaste
        ? {
            colors: (data.colors || []).join(','),
            style: data.material || '',
            avoid: (data.avoid || []).join(','),
            wearStyle: data.wearStyle || '',
          }
        : undefined;

      // API로 선물 세션 생성
      const sessionResponse = await createGiftSession(userId, {
        relationship: data.relationship,
        occasion: data.occasion,
        budgetMin: budget.min,
        budgetMax: budget.max,
        category: data.category,
        brand: data.brand,
        meaning: data.meaning,
        moods,
        giverKnownTaste,
      });

      if (sessionResponse.code === 'SUCCESS' && sessionResponse.data) {
        const sessionId = sessionResponse.data.id;
        global.giftData.sessionId = sessionId;

        // 초대 링크 생성
        const inviteResponse = await createInvite(userId, sessionId);
        if (inviteResponse.code === 'SUCCESS' && inviteResponse.data) {
          const link = inviteResponse.data.inviteUrl || `https://wishblind.com/invite/${inviteResponse.data.inviteToken}`;
          setInviteLink(link);
        }
      } else {
        Alert.alert('오류', sessionResponse.message || '세션 생성에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '세션 생성 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    Clipboard.setString(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Text style={styles.linkUrl} numberOfLines={2}>
              {inviteLink || '링크 생성 중...'}
            </Text>
            {inviteLink && (
              <TouchableOpacity onPress={handleCopy}>
                <Text style={styles.copyText}>{copied ? '복사됨!' : '복사'}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ marginTop: 20, gap: 14, alignItems: 'center' }}>
            <TouchableOpacity style={styles.shareRow} onPress={() => Alert.alert('QR 코드', 'QR 코드 생성 기능은 준비 중입니다')}>
              <Text style={styles.shareText}>QR 생성</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareRow} onPress={() => Alert.alert('카카오톡', '카카오톡 공유 기능은 준비 중입니다')}>
              <Text style={styles.shareText}>카카오톡 보내기</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareRow} onPress={() => Alert.alert('문자', '문자 공유 기능은 준비 중입니다')}>
              <Text style={styles.shareText}>문자 보내기</Text>
              <Text style={styles.shareArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
            <Button title="이전" onPress={() => navigate('gift-step3')} />
            <Button title="홈으로" onPress={() => {
              global.giftData = null;
              navigate('home');
            }} />
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
