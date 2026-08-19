import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';

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

export function Header({ title, onBack, rightIcon, onRight }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>
        {onBack && (
          <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.backBtn}>←</Text>
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

export function StepCard({ children, style }) {
  return <View style={[styles.stepCard, style]}>{children}</View>;
}

export function StepIndicator({ stepNum, stepDesc, totalDots, activeDot }) {
  return (
    <View style={styles.stepWrap}>
      <Text style={styles.stepLabel}>STEP {String(stepNum).padStart(2, '0')}</Text>
      <Text style={styles.stepDescText}>{stepDesc}</Text>
      <View style={styles.dots}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <View key={i} style={[styles.dot, i === activeDot && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

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

export function FormInput(props) {
  return (
    <TextInput
      style={[styles.formInput, props.style]}
      placeholderTextColor={colors.titleSub}
      {...props}
    />
  );
}

export function FormTextarea(props) {
  return (
    <TextInput
      style={[styles.formInput, styles.formTextarea, props.style]}
      placeholderTextColor={colors.titleSub}
      multiline
      {...props}
    />
  );
}

export function UnderlineInput(props) {
  return (
    <View style={[styles.underlineBox, props.style]}>
      <TextInput
        style={styles.underlineInner}
        placeholderTextColor={colors.textMuted}
        {...props}
        placeholder={props.placeholder}
      />
    </View>
  );
}

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

export function Button({ title, onPress, variant = 'primary', full, style, textStyle, disabled }) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'outline' && styles.btnOutline,
        full && styles.btnFull,
        disabled && styles.btnDisabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text
        style={[
          styles.btnText,
          variant === 'primary' && styles.btnTextPrimary,
          variant === 'secondary' && styles.btnTextSecondary,
          variant === 'outline' && styles.btnTextOutline,
          disabled && styles.btnTextDisabled,
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

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// ── Pill-shaped text input, wrapped in a bordered View (prevents browser textarea/input style overrides) ──
export function PillInput(props) {
  const { style, multiline, ...rest } = props;
  return (
    <View style={[styles.pillField, multiline && styles.pillFieldMultiline, style]}>
      <TextInput
        style={[styles.pillInputText, multiline && styles.pillInputMultiline]}
        placeholderTextColor={colors.titleSub}
        multiline={multiline}
        {...rest}
      />
    </View>
  );
}

export function PillSelect({ value, onChange, placeholder, options }) {
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.pillField} onPress={() => setOpen(!open)}>
        <Text style={value ? styles.pillValue : styles.pillPlaceholder}>{value || placeholder}</Text>
        <Text style={styles.pillChevron}>⌄</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.pillDropdown}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.pillOption}
              onPress={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <Text style={styles.pillOptionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export function ProfileIcon({ size = 22, color }) {
  const c = color || colors.text;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.2,
          borderWidth: 1.5,
          borderColor: c,
          marginBottom: 2,
        }}
      />
      <View
        style={{
          width: size * 0.75,
          height: size * 0.4,
          borderTopLeftRadius: size * 0.4,
          borderTopRightRadius: size * 0.4,
          borderWidth: 1.5,
          borderBottomWidth: 0,
          borderColor: c,
        }}
      />
    </View>
  );
}

export function LogoBlock({ style }) {
  return (
    <View style={[styles.logoWrap, style]}>
      <Text style={styles.logoTitle}>Wish</Text>
      <Text style={styles.logoTitle}>Blind</Text>
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

  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  headerSide: { width: 40, justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  backBtn: { fontSize: 26, color: colors.text, lineHeight: 26 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  headerRight: { fontSize: 22, color: colors.text },

  stepWrap: { alignItems: 'center', marginBottom: 20 },
  stepLabel: { fontSize: 15, fontWeight: '700', color: colors.main, marginBottom: 3 },
  stepDescText: { fontSize: 13, color: colors.stepDesc, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent1 },
  dotActive: { width: 20, backgroundColor: colors.main },

  stepCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    padding: 24,
  },

  formGroup: { marginBottom: 16 },
  formLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  formLabel: { fontSize: 14, fontWeight: '600', color: colors.text },
  emoji: { fontSize: 14 },

  formInput: {
    width: '100%',
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.white,
  },
  formTextarea: { height: 90, borderRadius: 16, textAlignVertical: 'top', paddingTop: 12 },

  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
  },
  selectValue: { fontSize: 13, color: colors.text },
  selectPlaceholder: { fontSize: 13, color: colors.titleSub },
  selectChevron: { fontSize: 14, color: colors.main },
  selectDropdown: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginTop: 4,
    overflow: 'hidden',
  },
  selectOption: { paddingVertical: 12, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: colors.accent1 },
  selectOptionText: { fontSize: 13, color: colors.text },

  underlineBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  underlineInner: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: colors.main,
    backgroundColor: colors.bg,
  },
  chipSelected: { backgroundColor: colors.main },
  chipText: { fontSize: 12, fontWeight: '500', color: colors.main },
  chipTextSelected: { color: colors.white },

  card: {
    backgroundColor: '#fcfbf8',
    borderWidth: 1,
    borderColor: colors.accent2,
    borderRadius: 20,
    padding: 24,
  },
  pillField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 22,
    backgroundColor: colors.white,
  },
  pillFieldMultiline: { height: undefined, alignItems: 'stretch', paddingVertical: 12 },
  pillInputText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  pillInputMultiline: { textAlignVertical: 'top' },
  pillValue: { fontSize: 13, color: colors.text },
  pillPlaceholder: { fontSize: 13, color: colors.titleSub },
  pillChevron: { fontSize: 14, color: colors.main },
  pillDropdown: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginTop: 4,
    overflow: 'hidden',
  },
  pillOption: { paddingVertical: 11, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.accent1 },
  pillOptionText: { fontSize: 13, color: colors.text },

  btn: {
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 6px 9px rgba(0,0,0,0.25)' },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 9,
        elevation: 4,
      },
    }),
  },
  btnPrimary: { backgroundColor: colors.main },
  btnSecondary: { backgroundColor: colors.accent1 },
  btnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.main },
  btnDisabled: { backgroundColor: '#ccc', opacity: 0.6 },
  btnFull: { width: '100%' },
  btnText: { fontSize: 16, fontWeight: '600' },
  btnTextPrimary: { color: colors.white },
  btnTextSecondary: { color: colors.main },
  btnTextOutline: { color: colors.main },
  btnTextDisabled: { color: '#999' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },

  logoWrap: { alignItems: 'center', paddingVertical: 20 },
  logoTitle: { fontSize: 27, fontWeight: '800', color: colors.main, letterSpacing: -0.7, lineHeight: 30 },
  logoSub: { fontSize: 15, color: colors.subtitle, marginTop: 10, textAlign: 'center', lineHeight: 21 },
});