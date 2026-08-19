import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// react-native-web의 Alert.alert는 빈 함수(no-op)라서 웹에서는 확인창이 아예 안 뜨고
// 버튼 콜백도 절대 실행되지 않는다 (로그아웃, 회원가입 완료 이동 등이 전부 죽어있던 원인).
// window.confirm/alert 기반으로 동작하도록 웹에서만 덮어씌운다.
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  Alert.alert = (title, message, buttons) => {
    const btns = buttons && buttons.length ? buttons : [{ text: '확인' }];
    const text = [title, message].filter(Boolean).join('\n\n');

    if (btns.length > 1) {
      // 'cancel' 스타일을 명시한 버튼이 있으면 그게 취소, 아니면 관례대로 첫 버튼이 취소.
      // 확인/실행 버튼은 'destructive' 스타일(로그아웃 등)을 우선하고, 없으면 마지막 버튼.
      const cancelBtn = btns.find((b) => b.style === 'cancel') || btns[0];
      const confirmBtn = btns.find((b) => b.style === 'destructive') || btns[btns.length - 1];
      if (window.confirm(text)) {
        confirmBtn?.onPress?.();
      } else {
        cancelBtn?.onPress?.();
      }
    } else {
      window.alert(text);
      btns[0]?.onPress?.();
    }
  };
}

import Login from './screens/Login';
import Signup from './screens/Signup';
import SocialLoginWebView from './screens/SocialLoginWebView';
import Home from './screens/Home';
import GiftStep1 from './screens/GiftStep1';
import GiftStep2 from './screens/GiftStep2';
import GiftStep3 from './screens/GiftStep3';
import GiftStep4 from './screens/GiftStep4';
import InviteConfirm from './screens/InviteConfirm';
import TasteTest1 from './screens/TasteTest1';
import TasteTest2 from './screens/TasteTest2';
import TasteTest3 from './screens/TasteTest3';
import TasteTest4 from './screens/TasteTest4';
import TasteTest5 from './screens/TasteTest5';
import TasteComplete from './screens/TasteComplete';
import AIResults from './screens/AIResults';
import AIDetail from './screens/AIDetail';
import GiftDelivery from './screens/GiftDelivery';
import GiftPayment from './screens/GiftPayment';
import Employee from './screens/Employee';
import Personal from './screens/Personal';
import ExperienceManagement from './screens/ExperienceManagement';
import ExperienceDetail from './screens/ExperienceDetail';
import ExperienceProgress from './screens/ExperienceProgress';
import ExperienceResult from './screens/ExperienceResult';

import { colors } from './theme';

export default function App() {
  const [page, setPage] = useState('login');

  const nav = (p, params) => {
    // Store params in a temporary object
    if (params) {
      global.routeParams = global.routeParams || {};
      global.routeParams[p] = params;
    }
    setPage(p);
  };

  const screens = {
    login: <Login navigate={nav} />,
    signup: <Signup navigate={nav} />,
    socialLoginWebView: <SocialLoginWebView navigate={nav} route={{ params: global.routeParams?.['socialLoginWebView'] }} />,
    home: <Home navigate={nav} />,
    employee: <Employee navigate={nav} />,
    personal: <Personal navigate={nav} />,
    'experience-management': <ExperienceManagement navigate={nav} />,
    'experience-detail': <ExperienceDetail navigate={nav} route={{ params: global.routeParams?.['experience-detail'] }} />,
    'experience-progress': <ExperienceProgress navigate={nav} route={{ params: global.routeParams?.['experience-progress'] }} />,
    'experience-result': <ExperienceResult navigate={nav} route={{ params: global.routeParams?.['experience-result'] }} />,
    'gift-step1': <GiftStep1 navigate={nav} />,
    'gift-step2': <GiftStep2 navigate={nav} />,
    'gift-step3': <GiftStep3 navigate={nav} />,
    'gift-step4': <GiftStep4 navigate={nav} />,
    'invite-confirm': <InviteConfirm navigate={nav} />,
    'taste-1': <TasteTest1 navigate={nav} />,
    'taste-2': <TasteTest2 navigate={nav} />,
    'taste-3': <TasteTest3 navigate={nav} />,
    'taste-4': <TasteTest4 navigate={nav} />,
    'taste-5': <TasteTest5 navigate={nav} />,
    'taste-complete': <TasteComplete navigate={nav} isSender={false} />,
    'taste-complete-sender': <TasteComplete navigate={nav} isSender={true} />,
    'ai-results': <AIResults navigate={nav} route={{ params: global.routeParams?.['ai-results'] }} />,
    'ai-detail': <AIDetail navigate={nav} route={{ params: global.routeParams?.['ai-detail'] }} />,
    'gift-delivery': <GiftDelivery navigate={nav} />,
    'gift-payment': <GiftPayment navigate={nav} route={{ params: global.routeParams?.['gift-payment'] }} />,
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
      <View style={styles.container}>{screens[page] ?? screens['login']}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, backgroundColor: colors.bg },
});
