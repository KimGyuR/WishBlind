import { StatusBar, Header } from './shared';

const CANDIDATES = [
  {
    id: 'a',
    name: '후보 A 이름',
    match: 92,
    best: true,
    tags: ['실용적인 선물', '블라 취향 반영'],
  },
  {
    id: 'b',
    name: '후보 B 이름',
    match: 73,
    best: false,
    tags: ['취향 반영'],
  },
  {
    id: 'c',
    name: '후보 C 이름',
    match: 65,
    best: false,
    tags: ['예산 적합'],
  },
];

export default function AIResults({ navigate }) {
  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="AI 추천 결과" onBack={() => navigate('home')} />

        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18, textAlign: 'center' }}>
          두 사람의 정보를 분석하여<br />가장 적합한 상품을 골랐습니다.
        </div>

        {CANDIDATES.map(c => (
          <div key={c.id} className={`rec-card${c.best ? ' best' : ''}`}>
            {c.best && <div className="best-tag">[BEST] 후보 A</div>}
            <div className="rec-header">
              <div className="rec-name">{c.name}</div>
              <div className="match-badge">취향 일치 {c.match}%</div>
            </div>
            <div className="rec-tags">
              {c.tags.map(t => (
                <span key={t} className="rec-tag">✔ {t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>블라 취향 납량</span>
              <button className="see-more" onClick={() => navigate('ai-detail')}>
                자세히 보기 &rsaquo;
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
