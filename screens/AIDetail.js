import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { FakeStatusBar, Header, Button, BtnRow } from '../components/Shared';
import { colors } from '../theme';

const AI_REASONS = [
  '취업 축하 의미와 적합',
  '블랙 선호 반영',
  '심플한 디자인',
  '예산 범위 만족',
  '브랜드 이미지와 적합',
];

const SCORES = [
  ['색상', '★★★★★'],
  ['스타일', '★★★★☆'],
  ['실용성', '★★★★★'],
];

const CONSIDER = ['사이즈가 약간 큽니다.', '체인 길이는 취향에 따라\n호불호가 있을 수 있습니다.'];

export default function AIDetail({ navigate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 }}>
        <Header title="AI 추천 상세" onBack={() => navigate('ai-results')} />

        <View style={styles.productImg}>
          <Text style={{ fontSize: 48 }}>🐱🐶</Text>
        </View>

        <Text style={styles.productName}>후보 A 이름</Text>

        <Text style={styles.sectionTitle}>AI 추천 이유</Text>
        <View style={{ marginBottom: 20, gap: 5 }}>
          {AI_REASONS.map((r) => (
            <Text key={r} style={styles.checkLine}>
              ✓ {r}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>취향 분석</Text>
        <View style={{ marginBottom: 20 }}>
          {SCORES.map(([label, stars]) => (
            <View key={label} style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{label}</Text>
              <Text style={styles.stars}>{stars}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>AI 코멘트</Text>
        <View style={[styles.box, { marginBottom: 20 }]}>
          <Text style={styles.boxText}>
            취업을 축하하는 의미와{'\n'}
            상대방이 선호하는 심플한 디자인을 고려했을 때{'\n'}
            가장 적합한 추천입니다.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>고려할 점</Text>
        <View style={[styles.box, { marginBottom: 24 }]}>
          {CONSIDER.map((c) => (
            <Text key={c} style={styles.considerLine}>
              • {c}
            </Text>
          ))}
        </View>

        <BtnRow>
          <Button title="이전" onPress={() => navigate('ai-results')} />
          <Button title="상품 선택" onPress={() => setShowModal(true)} />
        </BtnRow>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowModal(false)}>
              <Text style={{ fontSize: 16, color: colors.textMuted }}>✕</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>🎁</Text>
            <Text style={styles.modalTitle}>후보 A를 선택했습니다.</Text>
            <Text style={styles.modalDesc}>상대방에게는{'\n'}상품명이 공개되지 않습니다.</Text>
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
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  productName: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.main, marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10, textAlign: 'center' },
  checkLine: { fontSize: 13, color: colors.text, textAlign: 'center' },
  scoreRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 4 },
  scoreLabel: { fontSize: 13, color: colors.titleSub, width: 50, textAlign: 'right' },
  stars: { fontSize: 13, color: colors.main, letterSpacing: 1 },
  box: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 16,
    padding: 16,
  },
  boxText: { fontSize: 13, color: colors.text, lineHeight: 21, textAlign: 'center' },
  considerLine: { fontSize: 13, color: colors.text, lineHeight: 21 },
  modalOverlay: { flex: 1, backgroundColor: colors.modalOverlay, alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: colors.accent1, borderRadius: 20, padding: 28, width: '100%', maxWidth: 320, alignItems: 'center' },
  modalClose: { position: 'absolute', top: 14, right: 14 },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: colors.text },
  modalDesc: { fontSize: 13, color: colors.titleSub, lineHeight: 21, marginBottom: 20, textAlign: 'center' },
});