import { useState } from 'react';
import { StatusBar, Header } from './shared';

export default function GiftDelivery({ navigate }) {
  const [method, setMethod] = useState('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <>
        <StatusBar />
        <div className="screen">
          <div className="complete-wrap">
            <div className="complete-icon">🎉</div>
            <div className="complete-title">선물 전달 완료!</div>
            <div className="complete-desc">
              선물이 성공적으로 전달됐습니다.<br />
              상대방이 기뻐할 모습을 기대해보세요!
            </div>
            <button className="btn btn-primary" style={{ padding: '14px 40px' }} onClick={() => navigate('home')}>
              홈으로
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="선물 전달" onBack={() => navigate('ai-detail')} />

        <div className="section-title" style={{ marginTop: 0, marginBottom: 10 }}>선물 전달 방법</div>

        <div
          className={`delivery-opt${method === 'delivery' ? ' active' : ''}`}
          onClick={() => setMethod('delivery')}
        >
          <input type="radio" readOnly checked={method === 'delivery'} style={{ accentColor: 'var(--main)' }} />
          <span className="opt-label">🚚 배송하기</span>
        </div>

        <div
          className={`delivery-opt${method === 'store' ? ' active' : ''}`}
          onClick={() => setMethod('store')}
        >
          <input type="radio" readOnly checked={method === 'store'} style={{ accentColor: 'var(--main)' }} />
          <span className="opt-label">🏪 매장 방문 수령</span>
        </div>

        {method === 'delivery' && (
          <div style={{ marginTop: 16 }}>
            <div className="form-group">
              <div className="form-label">배송자 이름</div>
              <input className="form-input" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <div className="form-label">전화번호</div>
              <input className="form-input" placeholder="010-0000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <div className="form-label">배송 주소</div>
              <input className="form-input" placeholder="주소를 입력해주세요" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
        )}

        {method === 'store' && (
          <div style={{ marginTop: 16 }}>
            <div className="form-group">
              <div className="form-label">이름</div>
              <input className="form-input" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <div className="form-label">예약 날짜</div>
              <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <div className="form-label">시간 선택</div>
              <input className="form-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
        )}

        {/* 메세지 */}
        <div className="form-group">
          <div className="form-label">메세지 작성</div>
          <textarea
            className="form-textarea"
            placeholder="주고 싶은 메세지를 작성해주세요."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <div className="btn-row">
          <button className="btn btn-outline" onClick={() => navigate('ai-detail')}>이전</button>
          <button className="btn btn-primary" onClick={() => setDone(true)}>전달하기</button>
        </div>
      </div>
    </>
  );
}
