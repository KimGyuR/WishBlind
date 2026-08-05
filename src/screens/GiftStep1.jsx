import { useState } from 'react';
import { StatusBar, Header, StepIndicator, FormGroup, SelectWrap } from './shared';

export default function GiftStep1({ navigate }) {
  const [relation, setRelation] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  return (
    <>
      <StatusBar />
      <div className="screen">
        <Header title="기본 정보 입력" onBack={() => navigate('home')} />

        <StepIndicator
          stepNum={1}
          stepDesc="기본 정보를 입력해주세요."
          totalDots={4}
          activeDot={0}
        />

        <FormGroup label="관계" emoji="👥">
          <SelectWrap>
            <select className="form-select" value={relation} onChange={e => setRelation(e.target.value)}>
              <option value="">관계를 선택해주세요</option>
              <option>연인</option>
              <option>친구</option>
              <option>부모님</option>
              <option>형제/자매</option>
              <option>동료</option>
            </select>
          </SelectWrap>
        </FormGroup>

        <FormGroup label="기념일" emoji="📅">
          <SelectWrap>
            <select className="form-select" value={anniversary} onChange={e => setAnniversary(e.target.value)}>
              <option value="">기념일을 선택해주세요</option>
              <option>생일</option>
              <option>기념일</option>
              <option>졸업</option>
              <option>취업</option>
              <option>크리스마스</option>
              <option>기타</option>
            </select>
          </SelectWrap>
        </FormGroup>

        <FormGroup label="예산" emoji="💰">
          <SelectWrap>
            <select className="form-select" value={budget} onChange={e => setBudget(e.target.value)}>
              <option value="">예산을 선택해주세요</option>
              <option>3만원 이하</option>
              <option>3~5만원</option>
              <option>5~10만원</option>
              <option>10~20만원</option>
              <option>20~50만원</option>
              <option>50만원 이상</option>
            </select>
          </SelectWrap>
        </FormGroup>

        <FormGroup label="카테고리" emoji="🏷️">
          <input
            className="form-input"
            placeholder="카테고리를 입력해주세요"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="브랜드" emoji="✨">
          <input
            className="form-input"
            placeholder="선호 브랜드를 입력해주세요"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          />
        </FormGroup>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('gift-step2')}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
