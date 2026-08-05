import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const MATERIALS = ['패브릭', '가죽', '헤링본', '기타'];
const LOGOS = ['거의 없음', '작게 보임', '눈에 띄어도 괜찮음'];

export default function TasteTest3({ navigate }) {
  const [materials, setMaterials] = useState([]);
  const [logo, setLogo] = useState([]);

  const toggleMaterial = (opt) => {
    setMaterials(prev =>
      prev.includes(opt) ? prev.filter(m => m !== opt) : [...prev, opt]
    );
  };

  const toggleLogo = (opt) => {
    setLogo([opt]);
  };

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트" onBack={() => navigate('taste-2')} />

        <StepIndicator
          stepNum={3}
          stepDesc="소재와 디테일 취향을 알려주세요."
          totalDots={5}
          activeDot={2}
        />

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 10 }}>선호 소재</div>
          <Chips options={MATERIALS} selected={materials} onToggle={toggleMaterial} />
        </div>

        <div className="form-group" style={{ marginTop: 8 }}>
          <div className="form-label" style={{ marginBottom: 10 }}>로고 노출</div>
          <Chips options={LOGOS} selected={logo} onToggle={toggleLogo} />
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-4')}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
