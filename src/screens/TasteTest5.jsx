import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const AVOIDS = ['큰 로고', '무거운 패품', '화려한 색상', '작은 수납공간', '관리가 어려운 소재', '특별이 없음'];

export default function TasteTest5({ navigate }) {
  const [selected, setSelected] = useState([]);
  const [extra, setExtra] = useState('');

  const toggle = (opt) => {
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(a => a !== opt) : [...prev, opt]
    );
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트" onBack={() => navigate('gift-step4')} />

        <StepIndicator
          stepNum={5}
          stepDesc="피하고 싶은 요소를 알려주세요."
          totalDots={5}
          activeDot={4}
        />

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 10 }}>피하고 싶은 요소</div>
          <Chips options={AVOIDS} selected={selected} onToggle={toggle} />
        </div>

        <div className="form-group" style={{ marginTop: 8 }}>
          <div className="form-label" style={{ marginBottom: 8 }}>추가로 피하고 싶은 것이 있나요?</div>
          <input
            className="form-input"
            placeholder="피하고 싶은 취향을 입력해주세요."
            value={extra}
            onChange={e => setExtra(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-complete-sender')}>
            입력 완료
          </button>
        </div>
      </div>
    </>
  );
}
