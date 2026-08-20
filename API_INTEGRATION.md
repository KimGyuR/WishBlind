# WishBlind 프론트앤드 - 백엔드 API 연동 완료

## 📋 연동된 주요 기능

### 1. **인증 (Authentication)**
- ✅ **Login.js** - `/api/auth/login` 연동
  - 이메일/비밀번호로 로그인
  - accessToken, refreshToken 저장
  - userId 전역 저장

### 2. **홈 화면 (Home)**
- ✅ **Home.js** - `/api/gift-sessions` (GET) 연동
  - 사용자의 모든 선물 세션 조회
  - 실시간 상태 업데이트 (AWAITING_PREFERENCES, AI_RECOMMENDATIONS_DONE 등)
  - AI 추천 완료 상태에서 AIResults로 진행

### 3. **선물 생성 플로우 (Gift Session Creation)**
- ✅ **GiftStep1.js** - 기본 정보 입력 (relation, occasion, budget, category, brand)
- ✅ **GiftStep2.js** - 선물 의미 입력 (meaning, moods)
- ✅ **GiftStep3.js** - 취향 정보 입력 (colors, material, avoid, wearStyle)
- ✅ **GiftStep4.js** - `/api/gift-sessions` (POST) + `/api/gift-sessions/{id}/invite` (POST) 연동
  - 선물 세션 생성
  - 초대 링크 자동 생성
  - 복사 기능 제공

### 4. **초대 및 취향 입력 플로우 (Recipient)**
- ✅ **InviteConfirm.js** - `/api/invite/verify` (POST) 연동
  - 초대 코드 검증
  - 취향 폼 미리 로드

- ✅ **TasteTest1.js** - 색상 선택 저장
- ✅ **TasteTest5.js** - `/api/invite/{token}/preferences` (POST) 연동
  - 취향 정보 최종 제출
  - 모든 단계의 데이터 수집

### 5. **AI 추천 결과**
- ✅ **AIResults.js** - `/api/gift-sessions/{sessionId}/recommendations` (GET) 연동
  - 상품 추천 목록 조회
  - 매칭율 표시
  - 상세 페이지로 이동 가능

- ✅ **AIDetail.js** - `/api/recommendations/{id}` (GET) 연동
  - 추천 상세 정보 조회
  - 추천 이유, 취향 분석, AI 코멘트 표시
  - `/api/gift-sessions/{sessionId}/finalize` (POST) - 상품 최종 선택

### 6. **배송 정보 입력**
- ✅ **GiftDelivery.js** - `/api/gift-sessions/{sessionId}/delivery` (POST) 연동
  - 배송/매장 수령 선택
  - 배송 정보 저장
  - 메시지 입력

## 🔧 기술 구조

### API Service Layer (`services/api.js`)
```javascript
- Base URL: https://wishblind-backend-production.up.railway.app
- JWT Token 기반 인증 (Authorization: Bearer {accessToken})
- 자동 에러 처리
- 타입 안전 응답 처리
```

### 전역 상태 관리
```javascript
global.userId - 로그인한 사용자 ID
global.giftData - 현재 진행 중인 선물 생성 정보
global.tasteAnswers - 취향 테스트 답변
global.inviteData - 초대 정보
global.currentSessionId - 현재 작업 중인 세션 ID
global.currentRecommendationId - 현재 선택된 추천 ID
```

## 🚀 사용 가능한 기능

1. **선물 주는 사람 플로우**
   ```
   로그인 → 홈 → 선물 생성(Step1~4) → AI 추천 확인 → 상품 선택 → 배송 정보 입력 → 완료
   ```

2. **선물 받는 사람 플로우**
   ```
   초대 코드 입력 → 취향 테스트(1~5) → 완료 (선물 공개는 배송 후)
   ```

## ⚠️ 아직 구현 대기 중인 기능

- **TasteTest2, 3, 4** - 중간 단계 (전체 데이터는 TasteTest5에서 제출)
- **Employee** - 매장 체험 관리
- **Personal** - 마이페이지
- **ExperienceManagement 시리즈** - 매장 체험 예약 관리
- **Payment** - 결제 처리 (기본 구조는 api.js에 준비됨)
- **Notification** - 알림 시스템

## 🧪 테스트 가능한 계정

API 서버에서 테스트 계정을 제공하므로 회원가입 후 테스트하거나,
API 문서(https://wishblind-backend-production.up.railway.app/swagger-ui/index.html)에서 제공하는 테스트 계정으로 테스트하세요.

## 📝 주요 수정 사항

1. **Button 컴포넌트** - disabled 상태 추가
2. **Shared.js** - 모든 입력 필드 초기화 및 스타일 업데이트
3. **API 에러 처리** - Alert를 통한 사용자 피드백
4. **로딩 상태** - ActivityIndicator로 진행 상황 표시

## 🔗 API 엔드포인트 매핑

| 화면 | 메서드 | 엔드포인트 | 설명 |
|-----|--------|----------|------|
| Login | POST | /api/auth/login | 로그인 |
| Home | GET | /api/gift-sessions | 선물 목록 |
| GiftStep4 | POST | /api/gift-sessions | 선물 세션 생성 |
| GiftStep4 | POST | /api/gift-sessions/{id}/invite | 초대 링크 생성 |
| InviteConfirm | POST | /api/invite/verify | 초대 검증 |
| TasteTest5 | POST | /api/invite/{token}/preferences | 취향 제출 |
| AIResults | GET | /api/gift-sessions/{id}/recommendations | 추천 목록 |
| AIDetail | GET | /api/recommendations/{id} | 추천 상세 |
| AIDetail | POST | /api/gift-sessions/{id}/finalize | 상품 선택 |
| GiftDelivery | POST | /api/gift-sessions/{id}/delivery | 배송 정보 저장 |

## 🎯 다음 단계

1. 남은 화면들(Employee, Personal, ExperienceManagement) 연동
2. 결제 기능 구현
3. 알림 시스템 구현
4. E2E 테스트 및 버그 수정
5. 성능 최적화

---
**연동 날짜**: 2026-08-19
**API 버전**: v0.0.1
**프론트앤드**: React Native (Expo)
