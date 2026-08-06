import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Button } from '../components/Shared';
import { colors } from '../theme';

export default function TasteComplete({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={[styles.screen, styles.completeWrap]}>
        <Text style={styles.icon}>🎁</Text>
        <Text style={styles.title}>취향 입력 완료!</Text>
        <Text style={styles.desc}>
          입력해주신 취향이{'\n'}
          선물을 사는 사람에게 안전하게 전달됐습니다.{'\n\n'}
          최종 상품은{'\n'}
          선물을 받는 순간까지 공개되지 않아요!
        </Text>
        <Button title="홈으로" style={{ paddingHorizontal: 40 }} onPress={() => navigate('home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 22, paddingBottom: 28 },
  completeWrap: { alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 58, marginBottom: 18 },
  title: { fontSize: 22, fontWeight: '800', color: colors.main, marginBottom: 12 },
  desc: { fontSize: 14, color: colors.textMuted, lineHeight: 24, textAlign: 'center', marginBottom: 30 },
});
