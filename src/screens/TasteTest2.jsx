import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const VIBES = ['심플한', '모던한', '트렌디한', '화려한', '클래식한', '상큼발랄'];

export default function TasteTest2({ navigate }) {
  const [selected, setSelected] = useState([]);

  const toggle = (opt) => {
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt]
    );
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트" onBack={() => navigate('taste-1')} />

        <StepIndicator
          stepNum={2}
          stepDesc="어떤 디자인 분위기를 선호하나요?"
          totalDots={5}
          activeDot={1}
        />

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 10 }}>분위기</div>
          <Chips options={VIBES} selected={selected} onToggle={toggle} />
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-3')}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
