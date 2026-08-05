import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const MOODS = ['설레는', '특별한', '기쁨', '따뜻한', '감동적인', '기타'];

export default function GiftStep2({ navigate }) {
  const [meaning, setMeaning] = useState('');
  const [moods, setMoods] = useState([]);

  const toggleMood = (opt) => {
    setMoods(prev =>
      prev.includes(opt) ? prev.filter(m => m !== opt) : [...prev, opt]
    );
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="선물 의미 입력" onBack={() => navigate('gift-step1')} />

        <StepIndicator
          stepNum={2}
          stepDesc="어떤 마음을 전하고 싶나요?"
          totalDots={4}
          activeDot={1}
        />

        <div className="form-group">
          <div className="form-label">전하고 싶은 의미</div>
          <textarea
            className="form-textarea"
            placeholder={"예) 항상 곁에 있어줘서 고마워,\n앞으로도 함께 할 수 있는 선물이었으면 좋겠어."}
            value={meaning}
            onChange={e => setMeaning(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 12 }}>선물 분위기</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
            피하고자 하는 선택을 할 수 있어요.
          </div>
          <Chips options={MOODS} selected={moods} onToggle={toggleMood} />
        </div>

        <div className="btn-row">
          <button className="btn btn-outline" onClick={() => navigate('gift-step1')}>이전</button>
          <button className="btn btn-primary" onClick={() => navigate('gift-step3')}>다음</button>
        </div>
      </div>
    </>
  );
}
