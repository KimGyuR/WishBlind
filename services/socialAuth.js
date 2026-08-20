import { Linking } from 'react-native';

const BASE_URL = 'https://wishblind-backend-production.up.railway.app';

// 테스트용 클라이언트 IDs (실제 환경에서는 .env에서 가져오기)
const GOOGLE_CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'; // 테스트용
const KAKAO_CLIENT_ID = '1234567890abcdef1234567890abcdef'; // 테스트용

// 리다이렉트 URI
const REDIRECT_URI = `${BASE_URL}/auth/callback`;

/**
 * 구글 로그인 페이지 열기
 * 사용자가 로그인하면 리다이렉트 URI로 인증 코드와 함께 반환됨
 */
export const initiateGoogleLogin = async () => {
  try {
    console.log('구글 로그인 페이지 열기...');

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
    }).toString()}`;

    console.log('Google OAuth URL:', googleAuthUrl);

    // 웹 브라우저에서 로그인 페이지 열기
    await Linking.openURL(googleAuthUrl);
  } catch (error) {
    console.error('구글 로그인 페이지 오류:', error);
    throw new Error('구글 로그인 페이지를 열 수 없습니다: ' + error.message);
  }
};

/**
 * 카카오 로그인 페이지 열기
 * 사용자가 로그인하면 리다이렉트 URI로 인증 코드와 함께 반환됨
 */
export const initiateKakaoLogin = async () => {
  try {
    console.log('카카오 로그인 페이지 열기...');

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams({
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    }).toString()}`;

    console.log('Kakao OAuth URL:', kakaoAuthUrl);

    // 웹 브라우저에서 로그인 페이지 열기
    await Linking.openURL(kakaoAuthUrl);
  } catch (error) {
    console.error('카카오 로그인 페이지 오류:', error);
    throw new Error('카카오 로그인 페이지를 열 수 없습니다: ' + error.message);
  }
};

/**
 * 테스트용 모의 로그인 (실제 OAuth 없이 테스트하려면 이것 사용)
 */
export const initiateGoogleLoginDemo = async () => {
  try {
    console.log('구글 로그인 테스트...');

    // 테스트 액세스 토큰 생성 (데모용)
    const testAccessToken = 'google_demo_token_' + Date.now();

    // 서버에 소셜 로그인 요청
    const response = await fetch(`${BASE_URL}/api/auth/social/GOOGLE`, {
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

    console.log('구글 로그인 응답:', data);

    if (!response.ok) {
      throw new Error(data.message || '구글 로그인에 실패했습니다');
    }

    return data;
  } catch (error) {
    console.error('구글 로그인 에러:', error);
    throw error;
  }
};

/**
 * 테스트용 모의 로그인 (실제 OAuth 없이 테스트하려면 이것 사용)
 */
export const initiateKakaoLoginDemo = async () => {
  try {
    console.log('카카오 로그인 테스트...');

    // 테스트 액세스 토큰 생성 (데모용)
    const testAccessToken = 'kakao_demo_token_' + Date.now();

    // 서버에 소셜 로그인 요청
    const response = await fetch(`${BASE_URL}/api/auth/social/KAKAO`, {
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

    console.log('카카오 로그인 응답:', data);

    if (!response.ok) {
      throw new Error(data.message || '카카오 로그인에 실패했습니다');
    }

    return data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
};


