import { StatusBar } from './shared';

const HISTORY = [
  { id: 1, status: 'ai_done', title: '기념일 선물', sub: '남명이 사자', statusLabel: 'AI 추천 완료', color: 'green' },
  { id: 2, status: 'delivering', title: '취업 축하 선물', sub: '이여친구', statusLabel: '배송 진행 중', color: 'blue' },
  { id: 3, status: 'waiting', title: '생일 선물', sub: '친구A', statusLabel: '취향 입력 대기', color: 'yellow' },
];

export default function Home({ navigate }) {
  return (
    <>
      <StatusBar />
      <div className="screen">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 6, paddingBottom: 4 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>👤</button>
        </div>

        {/* Logo */}
        <div className="logo-wrap" style={{ marginBottom: 28, marginTop: 8 }}>
          <div className="logo-title">
            <span style={{ fontStyle: 'italic' }}>Wish</span>
            <span>Blind</span>
          </div>
          <div className="logo-sub">
            서프라이즈는 그대로,<br />취향은 더 정확하게
          </div>
        </div>

        {/* CTA buttons */}
        <button className="btn btn-primary btn-full" style={{ marginBottom: 10 }} onClick={() => navigate('gift-step1')}>
          선물 시작하기
        </button>
        <button className="btn btn-secondary btn-full" style={{ marginBottom: 24 }} onClick={() => navigate('invite-confirm')}>
          초대받고 취향 입력하기
        </button>

        {/* Recent gifts */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>
            최근 진행한 선물
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
            ({HISTORY.length}건)
          </div>

          {HISTORY.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎁</div>
              <div className="empty-text">
                아직 진행중인 선물이 없습니다.<br />
                <span className="empty-link" onClick={() => navigate('gift-step1')}>새로운 선물을 준비해보세요!</span>
              </div>
            </div>
          ) : (
            HISTORY.map(item => (
              <div
                key={item.id}
                className="history-item"
                onClick={() => item.status === 'ai_done' ? navigate('ai-results') : null}
              >
                <div className="history-left">
                  <div className="history-title">{item.title}</div>
                  <div className="history-sub">{item.sub}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className={`badge badge-${item.color}`}>
                    ● {item.statusLabel}
                  </span>
                  <span className="history-arrow">›</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
