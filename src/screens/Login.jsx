import { useState } from 'react';
import { StatusBar } from './shared';

export default function Login({ navigate }) {
  const [id, setId] = useState('sssuin_');
  const [pw, setPw] = useState('••••••••••••');
  const [auto, setAuto] = useState(true);

  return (
    <>
      <StatusBar />
      <div className="screen" style={{ justifyContent: 'center', flex: 1 }}>
        {/* Logo */}
        <div className="logo-wrap" style={{ marginBottom: 36, marginTop: 20 }}>
          <div className="logo-title">
            <span style={{ fontStyle: 'italic' }}>Wish</span>
            <span>Blind</span>
          </div>
          <div className="logo-sub">
            서프라이즈는 그대로,<br />취향은 더 정확하게
          </div>
        </div>

        {/* Form */}
        <div style={{ marginBottom: 14 }}>
          <div className="form-label" style={{ marginBottom: 6 }}>아이디</div>
          <div className="input-row">
            <input
              className="form-input"
              value={id}
              onChange={e => setId(e.target.value)}
              placeholder="아이디를 입력해주세요"
            />
            {id && (
              <button className="input-icon" onClick={() => setId('')}>✕</button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="form-label" style={{ marginBottom: 6 }}>비밀번호</div>
          <div className="input-row">
            <input
              className="form-input"
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            {pw && (
              <button className="input-icon" onClick={() => setPw('')}>✕</button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer', color: 'var(--text)' }}>
            <input
              type="checkbox"
              checked={auto}
              onChange={e => setAuto(e.target.checked)}
              style={{ accentColor: 'var(--main)', width: 15, height: 15 }}
            />
            자동로그인
          </label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>아이디/비밀번호 찾기</span>
        </div>

        <button className="btn btn-primary btn-full" onClick={() => navigate('home')}>
          로그인
        </button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button
            style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--main)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('home')}
          >
            지금 바로 회원가입 &rsaquo;
          </button>
        </div>

        {/* Google */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
          <button style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 40,
            height: 40,
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>G</button>
        </div>
      </div>
    </>
  );
}
