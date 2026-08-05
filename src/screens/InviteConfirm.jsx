import { useState } from 'react';
import { StatusBar, Header } from './shared';

export default function InviteConfirm({ navigate }) {
  const [code, setCode] = useState('');

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="초대 확인" onBack={() => navigate('home')} />

        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' }}>
          받은 초대 링크나 코드를 입력해 주세요.
        </div>

        <div className="form-group">
          <div className="form-label">초대 코드 입력</div>
          <input
            className="form-input"
            placeholder=""
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{ letterSpacing: 4, textAlign: 'center' }}
          />
        </div>

        <div
          className="share-box"
          style={{ marginBottom: 24 }}
        >
          <div className="share-item" onClick={() => {}}>
            <span style={{ color: 'var(--text)' }}>QR 코드 스캔</span>
            <span className="share-arrow">›</span>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full"
          onClick={() => navigate('taste-1')}
        >
          초대 확인
        </button>
      </div>
    </>
  );
}
