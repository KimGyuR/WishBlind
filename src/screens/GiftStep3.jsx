import { useState } from 'react';
import { StatusBar, Header, StepIndicator, FormGroup, SelectWrap } from './shared';

export default function GiftStep3({ navigate }) {
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [avoid, setAvoid] = useState('');
  const [wear, setWear] = useState('');

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="취향 정보 입력" onBack={() => navigate('gift-step2')} />

        <StepIndicator
          stepNum={3}
          stepDesc="상대방의 취향을 알려주세요."
          totalDots={4}
          activeDot={2}
        />

        <FormGroup label="색상" emoji="🎨">
          <SelectWrap>
            <select className="form-select" value={color} onChange={e => setColor(e.target.value)}>
              <option value="">색상을 선택해주세요</option>
              <option>화이트/아이보리</option>
              <option>블랙</option>
              <option>브라운/베이지</option>
              <option>그린</option>
              <option>블루</option>
              <option>핑크/레드</option>
              <option>기타</option>
            </select>
          </SelectWrap>
        </FormGroup>

        <FormGroup label="스타일" emoji="👗">
          <SelectWrap>
            <select className="form-select" value={style} onChange={e => setStyle(e.target.value)}>
              <option value="">스타일을 선택해주세요</option>
              <option>미니멀</option>
              <option>캐주얼</option>
              <option>클래식</option>
              <option>트렌디</option>
              <option>스포티</option>
            </select>
          </SelectWrap>
        </FormGroup>

        <FormGroup label="피하고 싶은 취향" emoji="🚫">
          <input
            className="form-input"
            placeholder="피하고 싶은 취향을 입력해주세요"
            value={avoid}
            onChange={e => setAvoid(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="착용방식" emoji="📦">
          <input
            className="form-input"
            placeholder="카테고리 적용 방식을 입력해주세요"
            value={wear}
            onChange={e => setWear(e.target.value)}
          />
        </FormGroup>

        <div className="btn-row">
          <button className="btn btn-outline" onClick={() => navigate('gift-step2')}>이전</button>
          <button className="btn btn-primary" onClick={() => navigate('gift-step4')}>다음</button>
        </div>
      </div>
    </>
  );
}
