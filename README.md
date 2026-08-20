# WishBlind (React Native / Expo 버전)

기존 Vite + React 웹 프로토타입을 React Native(Expo) 앱으로 변환한 버전입니다.
화면 구성, 텍스트, 색상, 흐름(내비게이션)은 원본과 동일하게 유지했고,
`<div>`/CSS → `View`/`StyleSheet`, `<select>` → 커스텀 `Select` 컴포넌트 등으로
네이티브 컴포넌트로 교체했습니다.

## 실행 방법

1. 이 폴더를 통째로 컴퓨터에 저장하세요 (예: `C:\Users\사용자\WishBlindNative`)
2. VS Code 터미널에서 해당 폴더로 이동
   ```
   cd C:\Users\사용자\WishBlindNative
   ```
3. 패키지 설치
   ```
   npm install
   ```
4. 실행
   ```
   npx expo start
   ```
5. 터미널에 QR 코드가 뜹니다.
   - 스마트폰에 **Expo Go** 앱(App Store / Play Store에서 무료 설치) 설치
   - Expo Go 앱으로 QR 코드를 스캔하면 실제 폰에서 바로 앱이 실행됩니다.
   - 컴퓨터에서 미리보기만 하고 싶다면 터미널에서 `w`를 눌러 웹 브라우저로도 볼 수 있어요 (일부 스타일은 웹에서 살짝 다르게 보일 수 있습니다).

## 폴더 구조

```
WishBlindNative/
  App.js                 → 화면 전환(내비게이션) 로직
  theme.js                → 색상 등 디자인 토큰
  components/Shared.js    → 공통 컴포넌트 (Header, Chips, Button 등)
  screens/                → 16개 화면 (원본 screens 폴더와 1:1 대응)
  assets/                 → hero.png 등 이미지
```

## 원본과 달라진 점

- 라우팅 방식은 동일하게 `navigate('화면이름')` 형태의 상태 기반 전환을 그대로 사용했습니다.
- `<select>` 드롭다운은 RN에 기본 select가 없어서, 탭하면 옵션 목록이 펼쳐지는
  커스텀 `Select` 컴포넌트로 대체했습니다.
- 날짜/시간 입력은 우선 텍스트 입력으로 처리했습니다. 실제 캘린더 선택 UI가
  필요하면 `@react-native-community/datetimepicker` 라이브러리 추가를 요청해주세요.
- 웹 전용 기능(마우스 hover 등)은 제거했습니다.

## 다음 화면 없이 궁금한 점이나 특정 화면이 이상하게 보이면
스크린샷과 함께 알려주시면 수정해드릴게요.
