import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const COLORS = ['브라운', '베이지', '화이트', '블랙', '살구민트', '그린', '철수 포인트'];

export default function TasteTest1({ navigate }) {
  const [selected, setSelected] = useState([]);

  const toggle = (opt) => {
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(c => c !== opt) : [...prev, opt]
    );
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트" onBack={() => navigate('invite-confirm')} />

        <StepIndicator
          stepNum={1}
          stepDesc="선호하는 색상을 골라주세요."
          totalDots={5}
          activeDot={0}
        />

        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
          복수 선택할 수 있어요.
        </div>

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 10 }}>색상</div>
          <Chips options={COLORS} selected={selected} onToggle={toggle} />
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-2')}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
