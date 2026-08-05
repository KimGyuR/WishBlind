import { useState } from 'react';
import { StatusBar, Header, StepIndicator, Chips } from './shared';

const SIZES = ['문게', '기본 길이', '얇게', '상관 없음'];
const WEARS = ['작고 섬세한', '적당한 존재감', '포인트가 되는 크기'];

export default function TasteTest4({ navigate }) {
  const [size, setSize] = useState([]);
  const [wear, setWear] = useState([]);

  const toggleSize = (opt) => setSize([opt]);
  const toggleWear = (opt) => setWear([opt]);

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 테스트" onBack={() => navigate('taste-3')} />

        <StepIndicator
          stepNum={4}
          stepDesc="상세한 착용 방식을 알려주세요."
          totalDots={5}
          activeDot={3}
        />

        <div className="form-group">
          <div className="form-label" style={{ marginBottom: 10 }}>원하는 크기</div>
          <Chips options={SIZES} selected={size} onToggle={toggleSize} />
        </div>

        <div className="form-group" style={{ marginTop: 8 }}>
          <div className="form-label" style={{ marginBottom: 10 }}>착용 방식</div>
          <Chips options={WEARS} selected={wear} onToggle={toggleWear} />
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('taste-complete')}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
