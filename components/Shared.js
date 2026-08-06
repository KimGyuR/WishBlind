import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';

// ── Fake status bar (mirrors the original design mockup's status bar) ──
export function FakeStatusBar() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.statusIcons}>
        <Text style={styles.statusIconText}>▲▲▲  WiFi  🔋</Text>
      </View>
    </View>
  );
}

// ── Header with optional back button, centered title, optional right icon ──
export function Header({ title, onBack, rightIcon, onRight }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>
        {onBack && (
          <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.backBtn}>‹</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerCenter}>
        {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
      </View>
      <View style={[styles.headerSide, { alignItems: 'flex-end' }]}>
        {rightIcon && (
          <TouchableOpacity onPress={onRight}>
            <Text style={styles.headerRight}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ── Step indicator (STEP 01, description, progress dots) ──
export function StepIndicator({ stepNum, stepDesc, totalDots, activeDot }) {
  return (
    <View style={styles.stepWrap}>
      <Text style={styles.stepLabel}>STEP {String(stepNum).padStart(2, '0')}</Text>
      <Text style={styles.stepDesc}>{stepDesc}</Text>
      <View style={styles.dots}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <View key={i} style={[styles.dot, i === activeDot && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

// ── Form field label + wrapper ──
export function FormGroup({ label, emoji, children, style }) {
  return (
    <View style={[styles.formGroup, style]}>
      <View style={styles.formLabelRow}>
        {emoji ? <Text style={styles.emoji}>{emoji} </Text> : null}
        <Text style={styles.formLabel}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

// ── Text input styled like .form-input ──
export function FormInput(props) {
  return (
    <TextInput
      style={[styles.formInput, props.style]}
      placeholderTextColor={colors.textMuted}
      {...props}
    />
  );
}

// ── Textarea styled like .form-textarea ──
export function FormTextarea(props) {
  return (
    <TextInput
      style={[styles.formInput, styles.formTextarea, props.style]}
      placeholderTextColor={colors.textMuted}
      multiline
      {...props}
    />
  );
}

// ── Simple select: tappable field that cycles through options via a basic picker row ──
// Implemented as a horizontal set of choices in a lightweight dropdown-style button.
// For simplicity & reliability across platforms this opens a native-feel option list.
export function Select({ value, onChange, placeholder, options }) {
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.selectBox} onPress={() => setOpen(!open)}>
        <Text style={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || placeholder}
        </Text>
        <Text style={styles.selectChevron}>⌄</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.selectDropdown}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.selectOption}
              onPress={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <Text style={styles.selectOptionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ── Chip multi/single select ──
export function Chips({ options, selected, onToggle }) {
  return (
    <View style={styles.chipsWrap}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onToggle(opt)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Primary / secondary / outline button ──
export function Button({ title, onPress, variant = 'primary', full, style, textStyle }) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'outline' && styles.btnOutline,
        full && styles.btnFull,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.btnText,
          variant === 'primary' && styles.btnTextPrimary,
          variant === 'secondary' && styles.btnTextSecondary,
          variant === 'outline' && styles.btnTextOutline,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function BtnRow({ children }) {
  return <View style={styles.btnRow}>{children}</View>;
}

// ── Logo block used on Login & Home ──
export function LogoBlock({ style }) {
  return (
    <View style={[styles.logoWrap, style]}>
      <Text style={styles.logoTitle}>
        <Text style={{ fontStyle: 'italic' }}>Wish</Text>Blind
      </Text>
      <Text style={styles.logoSub}>서프라이즈는 그대로,{'\n'}취향은 더 정확하게</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 6 : 14,
    paddingBottom: 6,
  },
  time: { fontSize: 15, fontWeight: '700', color: colors.text },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  statusIconText: { fontSize: 13, color: colors.text },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerSide: { width: 40, justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  backBtn: { fontSize: 26, color: colors.text, lineHeight: 26 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  headerRight: { fontSize: 22, color: colors.text },

  stepWrap: { alignItems: 'center', marginBottom: 20 },
  stepLabel: { fontSize: 11, fontWeight: '800', color: colors.main, letterSpacing: 1.5, marginBottom: 3 },
  stepDesc: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent1 },
  dotActive: { width: 20, backgroundColor: colors.main },

  formGroup: { marginBottom: 16 },
  formLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  formLabel: { fontSize: 13, fontWeight: '600', color: colors.text },
  emoji: { fontSize: 14 },

  formInput: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.white,
    ...Platform.select({ web: { outlineStyle: 'none', boxShadow: 'none' }, default: {} }),
  },
  formTextarea: { height: 90, textAlignVertical: 'top' },

  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    ...Platform.select({ web: { outlineStyle: 'none', boxShadow: 'none' }, default: {} }),
  },
  selectValue: { fontSize: 14, color: colors.text },
  selectPlaceholder: { fontSize: 14, color: colors.textMuted },
  selectChevron: { fontSize: 16, color: colors.textMuted },
  selectDropdown: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginTop: 4,
    overflow: 'hidden',
  },
  selectOption: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.accent1 },
  selectOptionText: { fontSize: 14, color: colors.text },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.main,
    backgroundColor: colors.white,
  },
  chipSelected: { backgroundColor: colors.main },
  chipText: { fontSize: 13, fontWeight: '500', color: colors.main },
  chipTextSelected: { color: colors.white },

  btn: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: { backgroundColor: colors.main },
  btnSecondary: { backgroundColor: colors.accent1 },
  btnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.main },
  btnFull: { width: '100%' },
  btnText: { fontSize: 15, fontWeight: '700' },
  btnTextPrimary: { color: colors.white },
  btnTextSecondary: { color: colors.main },
  btnTextOutline: { color: colors.main },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 'auto', paddingTop: 20 },

  logoWrap: { alignItems: 'center', paddingVertical: 20 },
  logoTitle: { fontSize: 34, fontWeight: '900', color: colors.main, letterSpacing: -1 },
  logoSub: { fontSize: 12, color: colors.textMuted, marginTop: 6, textAlign: 'center', lineHeight: 18 },
});