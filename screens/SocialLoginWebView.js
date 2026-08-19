import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { FakeStatusBar } from '../components/Shared';
import { colors } from '../theme';
import { setTokens } from '../services/api';

const BASE_URL = 'https://wishblind-backend-production.up.railway.app';

// 테스트용 클라이언트 IDs
const GOOGLE_CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
const KAKAO_CLIENT_ID = '1234567890abcdef1234567890abcdef';
const REDIRECT_URI = `${BASE_URL}/auth/callback`;

export default function SocialLoginWebView({ navigate, route }) {
  const [loading, setLoading] = useState(true);
  const provider = route?.params?.provider || 'google'; // 'google' or 'kakao'

  const getLoginUrl = () => {
    if (provider === 'google') {
      return `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'openid profile email',
        access_type: 'offline',
      }).toString()}`;
    } else {
      return `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams({
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
      }).toString()}`;
    }
  };

  const handleNavigationStateChange = (navState) => {
    console.log('WebView URL 변경:', navState.url);

    // 리다이렉트 URI에 도달했을 때 처리
    if (navState.url.includes(REDIRECT_URI)) {
      const urlParams = new URLSearchParams(navState.url.split('?')[1]);
      const authCode = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        Alert.alert('오류', `${provider} 로그인 실패: ${error}`, [
          { text: '확인', onPress: () => navigate('login') }
        ]);
        return;
      }

      if (authCode) {
        handleAuthCode(authCode);
      }
    }
  };

  const handleAuthCode = async (authCode) => {
    try {
      setLoading(true);

      // 테스트용: 인증 코드를 액세스 토큰으로 변환
      const testAccessToken = `${provider}_token_${authCode}_${Date.now()}`;

      // 서버에 소셜 로그인 요청
      const providerUpper = provider.toUpperCase();
      const response = await fetch(`${BASE_URL}/api/auth/social/${providerUpper}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: testAccessToken,
          terms: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `${provider} 로그인에 실패했습니다`);
      }

      if (data.code === 'SUCCESS' && data.data) {
        const { accessToken, refreshToken, userId } = data.data;
        setTokens(accessToken, refreshToken);
        global.userId = userId;

        Alert.alert('성공', `${provider}로 로그인되었습니다`, [
          { text: '확인', onPress: () => navigate('home') }
        ]);
      } else {
        throw new Error(data.message || '로그인에 실패했습니다');
      }
    } catch (error) {
      console.error('인증 처리 오류:', error);
      Alert.alert('오류', error.message || '로그인 처리 중 오류가 발생했습니다', [
        { text: '확인', onPress: () => navigate('login') }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FakeStatusBar />
      <WebView
        source={{ uri: getLoginUrl() }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.main} />
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
});
