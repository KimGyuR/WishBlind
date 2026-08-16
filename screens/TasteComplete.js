import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, Button } from '../components/Shared';
import { colors } from '../theme';

export default function TasteComplete({ navigate }) {
  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Header title="취향 테스트" onBack={() => navigate('home')} />

        <View style={styles.centerWrap}>
          <View style={styles.card}>
            <Text style={styles.icon}>🎁</Text>
            <Text style={styles.title}>취향 입력 완료!</Text>
            <Text style={styles.desc}>
              입력해주신 취향이{'\n'}
              선물하는 사람에게 안전하게 전달되었습니다.{'\n\n'}
              최종 상품은{'\n'}
              선물을 받는 순간까지 공개되지 않아요!
            </Text>
            <Button title="홈으로" onPress={() => navigate('home')} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerWrap: { flex: 1, justifyContent: 'center' },
  card: {
    backgroundColor: colors.accent1,
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