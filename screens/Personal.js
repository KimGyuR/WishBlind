import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FakeStatusBar, Button, ProfileIcon } from '../components/Shared';
import { colors } from '../theme';

export default function Personal({ navigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [likeFood, setLikeFood] = useState('');
  const [dislikeFood, setDislikeFood] = useState('');
  const [color, setColor] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const colorOptions = ['빨강', '파랑', '초록', '노랑', '검정', '흰색'];

  const toggleColor = (col) => {
    if (selectedColors.includes(col)) {
      setSelectedColors(selectedColors.filter(c => c !== col));
    } else {
      setSelectedColors([...selectedColors, col]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요');
      return;
    }
    alert('정보가 저장되었습니다!');
  };

  return (
    <View style={{ flex: 1 }}>
      <FakeStatusBar />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('home')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.profileSection}>
            <View style={styles.avatarLarge}>
              <ProfileIcon size={40} color={colors.main} />
            </View>
            <Text style={styles.headerTitle}>내 정보</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          {/* Name Input */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>이름</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해주세요"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Photo Section */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>정보보호</Text>
              <Text style={styles.optional}>(선택사항)</Text>
            </View>
            <TouchableOpacity style={styles.photoButton}>
              <Text style={styles.photoButtonText}>
                {photo ? '사진 변경' : '사진 추가'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Like Food */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>선호 음식</Text>
            <TextInput
              style={styles.input}
              placeholder="선호하는 음식을 입력해주세요"
              placeholderTextColor={colors.textMuted}
              value={likeFood}
              onChangeText={setLikeFood}
              multiline
            />
          </View>

          {/* Dislike Food */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>선호하지 않는 음식</Text>
            <TextInput
              style={styles.input}
              placeholder="선호하지 않는 음식을 입력해주세요"
              placeholderTextColor={colors.textMuted}
              value={dislikeFood}
              onChangeText={setDislikeFood}
              multiline
            />
          </View>

          {/* Color Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>선호 색상</Text>
            <View style={styles.colorGrid}>
              {colorOptions.map((col) => (
                <TouchableOpacity
                  key={col}
                  style={[
                    styles.colorOption,
                    selectedColors.includes(col) && styles.colorOptionSelected,
                  ]}
                  onPress={() => toggleColor(col)}
                >
                  <Text style={styles.colorLabel}>{col}</Text>
                  {selectedColors.includes(col) && (
                    <Text style={styles.colorCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <Button title="정보 수정하기" full onPress={handleSave} style={{ marginTop: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 28 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: colors.main,
    fontWeight: '600',
    marginRight: 12,
  },
  profileSection: {
    alignItems: 'center',
    flex: 1,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  formSection: {
    backgroundColor: colors.accent1,
    borderRadius: 20,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  required: {
    fontSize: 14,
    color: '#d32f2f',
    marginLeft: 4,
  },
  optional: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
  },
  photoButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  photoButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOptionSelected: {
    borderColor: colors.main,
    backgroundColor: '#f8f0f0',
  },
  colorLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  colorCheck: {
    fontSize: 16,
    color: colors.main,
    marginTop: 4,
  },
});
