import { StatusBar } from './shared';

export default function TasteComplete({ navigate, isSender }) {
  return (
    <>
      <StatusBar />
      <div className="screen">
        <div className="complete-wrap">
          <div className="complete-icon">🎁</div>

          {isSender ? (
            <>
              <div className="complete-title">취향 입력 완료!</div>
              <div className="complete-desc">
                입력해주신 취향이<br />
                선물을 사는 사람에게 안전하게 전달됐습니다.<br />
                <br />
                최종 상품은<br />
                선물을 받는 순간까지 공개되지 않아요!
              </div>
              <button className="btn btn-primary" style={{ padding: '14px 40px' }} onClick={() => navigate('home')}>
                홈으로
              </button>
            </>
          ) : (
            <>
              <div className="complete-title">취향 입력 완료!</div>
              <div className="complete-desc">
                입력해주신 취향이<br />
                선물을 사는 사람에게 안전하게 전달됐습니다.<br />
                <br />
                최종 상품은<br />
                선물을 받는 순간까지 공개되지 않아요!
              </div>
              <button className="btn btn-primary" style={{ padding: '14px 40px' }} onClick={() => navigate('home')}>
                홈으로
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
