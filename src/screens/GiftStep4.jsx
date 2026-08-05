import { useState } from 'react';
import { StatusBar, Header, StepIndicator } from './shared';

export default function GiftStep4({ navigate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트 초대" onBack={() => navigate('gift-step3')} />

        <StepIndicator
          stepNum={4}
          stepDesc={"취향 테스트를 보내세요!\n상대방은 선물을 보지 않고 취향만 입력합니다."}
          totalDots={4}
          activeDot={3}
        />

        <div style={{ marginBottom: 20 }}>
          <div className="section-title" style={{ marginTop: 0 }}>초대 링크 생성</div>
          <div className="link-box">
            <span className="link-url">https://wishblind.app/test/abc1234…</span>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? '복사됨!' : '복사'}
            </button>
          </div>
        </div>

        <div className="share-box">
          <div className="share-item" onClick={() => {}}>
            <span>📱 QR 생성</span>
            <span className="share-arrow">›</span>
          </div>
          <div className="share-item" onClick={() => {}}>
            <span>💬 카카오톡 보내기</span>
            <span className="share-arrow">›</span>
          </div>
          <div className="share-item" onClick={() => {}}>
            <span>✉️ 문자 보내기</span>
            <span className="share-arrow">›</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-5')}>
            내가 직접 취향 입력하기
          </button>
          <button className="btn btn-outline btn-full" onClick={() => navigate('home')}>
            이전
          </button>
        </div>
      </div>
    </>
  );
}
