import { useState } from 'react';
import { StatusBar, Header } from './shared';

const AI_REASONS = [
  '감정을 표현하기 위해 적합',
  '블락 선호 브랜드',
  '실용한 디자인',
  '블락 취향 반영',
  '브랜드 타입라이터 적합',
];

export default function AIDetail({ navigate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StatusBar />
      <div className="screen" style={{ position: 'relative' }}>
        <Header title="AI 추천 상세" onBack={() => navigate('ai-results')} />

        {/* Product */}
        <div className="product-img">🐾</div>

        <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          후보 A 이름
        </div>

        {/* AI 추천 이유 */}
        <div className="section-title" style={{ marginTop: 0 }}>AI 추천 이유</div>
        <ul className="check-list" style={{ marginBottom: 16 }}>
          {AI_REASONS.map(r => <li key={r}>{r}</li>)}
        </ul>

        <div className="divider" />

        {/* 위형 분석 */}
        <div className="section-title">위형 분석</div>
        <div style={{ background: 'var(--white)', borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
          {[['색상', '★★★★★'], ['스타일', '★★★★☆'], ['실용성', '★★★★★']].map(([label, stars]) => (
            <div key={label} className="score-row">
              <span className="score-label">{label}</span>
              <span className="stars">{stars}</span>
            </div>
          ))}
        </div>

        {/* AI 코멘트 */}
        <div className="section-title">AI 코멘트</div>
        <div className="ai-box" style={{ marginBottom: 14 }}>
          직업을 축하하는 사람에게<br />
          상대방을 신뢰하고 실용적 디자인으로 고안했을<br />
          가장 적합한 선물입니다.
        </div>

        {/* 고려할 점 */}
        <div className="section-title">고려할 점</div>
        <div className="ai-box" style={{ marginBottom: 20 }}>
          • 사이즈가 작을 수 있습니다.<br />
          • 개인별 선호도 차이<br />
          • 로컬에서도 구입이 가능합니다.
        </div>

        <div className="btn-row">
          <button className="btn btn-outline" onClick={() => navigate('ai-results')}>이전</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>상품 선택</button>
        </div>
      </div>

      {/* Confirm modal */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed' }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎁</div>
            <div className="modal-title">후보 A를 선택했습니다.</div>
            <div className="modal-desc">
              상대방에게는<br />
              선물이 결정될 때까지 비밀입니다.
            </div>
            <button
              className="btn btn-primary btn-full"
              onClick={() => { setShowModal(false); navigate('gift-delivery'); }}
            >
              선물 전달하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
