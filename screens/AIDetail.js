import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';

const AI_REASONS = [
  '감정을 표현하기 위해 적합',
  '블락 선호 브랜드',
  '실용한 디자인',
  '블락 취향 반영',
  '브랜드 타입라이터 적합',
];

const SCORES = [
  ['색상', '★★★★★'],
  ['스타일', '★★★★☆'],
  ['실용성', '★★★★★'],
];

export default function AIDetail({ navigate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 22, paddingBottom: 28 }}>
        <Header title="AI 추천 상세" onBack={() => navigate('ai-results')} />

        <View style={styles.productImg}>
          <Text style={{ fontSize: 52 }}>🐾</Text>
        </View>

        <Text style={styles.productName}>후보 A 이름</Text>

        <Text style={styles.sectionTitle}>AI 추천 이유</Text>
        <View style={{ marginBottom: 16, gap: 5 }}>
          {AI_REASONS.map((r) => (
            <View key={r} style={styles.checkRow}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.checkText}>{r}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>위형 분석</Text>
        <View style={styles.scoreBox}>
          {SCORES.map(([label, stars]) => (
            <View key={label} style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{label}</Text>
              <Text style={styles.stars}>{stars}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>AI 코멘트</Text>
        <View style={[styles.aiBox, { marginBottom: 14 }]}>
          <Text style={styles.aiBoxText}>
            직업을 축하하는 사람에게{'\n'}
            상대방을 신뢰하고 실용적 디자인으로 고안했을{'\n'}
            가장 적합한 선물입니다.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>고려할 점</Text>
        <View style={[styles.aiBox, { marginBottom: 20 }]}>
          <Text style={styles.aiBoxText}>
            • 사이즈가 작을 수 있습니다.{'\n'}
            • 개인별 선호도 차이{'\n'}
            • 로컬에서도 구입이 가능합니다.
          </Text>
        </View>

        <BtnRow>
          <Button title="이전" variant="outline" style={{ flex: 1 }} onPress={() => navigate('ai-results')} />
          <Button title="상품 선택" style={{ flex: 1 }} onPress={() => setShowModal(true)} />
        </BtnRow>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowModal(false)}>
              <Text style={{ fontSize: 18, color: colors.textMuted }}>✕</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>🎁</Text>
            <Text style={styles.modalTitle}>후보 A를 선택했습니다.</Text>
            <Text style={styles.modalDesc}>상대방에게는{'\n'}선물이 결정될 때까지 비밀입니다.</Text>
            <Button
              title="선물 전달하기"
              full
              onPress={() => {
                setShowModal(false);
                navigate('gift-delivery');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  productImg: {
    width: 110,
    height: 110,
    backgroundColor: colors.accent1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  productName: { textAlign: 'center', fontSize: 15, fontWeight: '700', marginBottom: 16, color: colors.text },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10, marginTop: 16 },
  checkRow: { flexDirection: 'row', gap: 5 },
  checkMark: { color: colors.main, fontWeight: '700', fontSize: 13 },
  checkText: { fontSize: 13, color: colors.text, flex: 1 },
  divider: { height: 1, backgroundColor: colors.accent1, marginVertical: 12 },
  scoreBox: { backgroundColor: colors.white, borderRadius: 12, paddingHorizontal: 14, marginBottom: 14 },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent1,
  },
  scoreLabel: { color: colors.textMuted, fontSize: 13 },
  stars: { color: colors.main, fontSize: 12, letterSpacing: 1 },
  aiBox: { backgroundColor: colors.accent1, borderRadius: 12, padding: 14 },
  aiBoxText: { fontSize: 13, color: colors.text, lineHeight: 21 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: colors.white, borderRadius: 20, padding: 28, width: '100%', maxWidth: 320, alignItems: 'center' },
  modalClose: { position: 'absolute', top: 14, right: 14 },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: colors.text },
  modalDesc: { fontSize: 13, color: colors.textMuted, lineHeight: 21, marginBottom: 20, textAlign: 'center' },
});
