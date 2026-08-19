import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FakeStatusBar, Header, StepIndicator, Card, Chips, PillInput, Button } from '../components/Shared';
import { colors } from '../theme';
import { submitPreferences } from '../services/api';

const AVOIDS = ['큰 로고', '무거운 제품', '화려한 색상', '작은 수납공간', '관리가 어려운 소재', '특별히 없음'];

export default function TasteTest5({ navigate }) {
  const [selected, setSelected] = useState(global.tasteAnswers?.avoid || []);
  const [extra, setExtra] = useState(global.tasteAnswers?.avoidEtc || '');
  const [showComplete, setShowComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = (opt) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]));
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      global.tasteAnswers = global.tasteAnswers || {};
      global.tasteAnswers.avoid = selected;
      global.tasteAnswers.avoidEtc = extra;

      const inviteToken = global.inviteData?.token;
      if (!inviteToken) {
        Alert.alert('오류', '초대 정보가 없습니다');
        return;
      }

      // API로 취향 제출
      const response = await submitPreferences(inviteToken, {
        colors: global.tasteAnswers.colors || [],
        mood: global.tasteAnswers.mood || '',
        material: global.tasteAnswers.material || '',
        logoVisibility: global.tasteAnswers.logoVisibility || '',
        size: global.tasteAnswers.size || '',
        wearStyle: global.tasteAnswers.wearStyle || '',
        avoid: selected,
        avoidEtc: extra,
      });

      if (response.code === 'SUCCESS') {
        setShowComplete(true);
      } else {
        Alert.alert('오류', response.message || '취향 제출에 실패했습니다');
      }
    } catch (err) {
      Alert.alert('오류', err.message || '취향 제출 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
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
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('taste-4')} />

        <StepIndicator stepNum={5} stepDesc="피하고 싶은 요소를 입력하세요." totalDots={5} activeDot={4} />

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.label}>피하고 싶은 요소</Text>
          <View style={[styles.chipBox, { marginBottom: 20 }]}>
            <Chips options={AVOIDS} selected={selected} onToggle={toggle} />
          </View>

          <Text style={styles.label}>추가로 피하고 싶은 것이 있나요?</Text>
          <PillInput
            placeholder="피하고 싶은 취향을 입력하세요."
            value={extra}
            onChangeText={setExtra}
          />

          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Button title="입력 완료" onPress={handleComplete} disabled={loading} />
          </View>
        </Card>
      </View>

      <Modal visible={showComplete} transparent animationType="fade" onRequestClose={() => setShowComplete(false)}>
        <View style={styles.overlay}>
          <View style={styles.completeCard}>
            <Text style={styles.icon}>🎁</Text>
            <Text style={styles.title}>취향 입력 완료!</Text>
            <Text style={styles.desc}>
              입력해주신 취향이{'\n'}
              선물하는 사람에게 안전하게 전달되었습니다.{'\n\n'}
              최종 상품은{'\n'}
              선물을 받는 순간까지 공개되지 않아요!
            </Text>
            <Button
              title="홈으로"
              onPress={() => {
                setShowComplete(false);
                global.tasteAnswers = null;
                global.inviteData = null;
                navigate('home');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 },
  chipBox: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 16,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  completeCard: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  icon: { fontSize: 28, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 20 },
  desc: { fontSize: 13, color: '#595959', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
});
