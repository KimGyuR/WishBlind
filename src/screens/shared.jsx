export function StatusBar() {
  return (
    <div className="status-bar">
      <span className="time">9:41</span>
      <div className="status-icons">
        <span>▲▲▲</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

export function Header({ title, onBack, rightIcon, onRight }) {
  return (
    <div className="header">
      {onBack && (
        <button className="back-btn" onClick={onBack}>‹</button>
      )}
      {title && <span className="header-title">{title}</span>}
      {rightIcon && (
        <button className="header-right" onClick={onRight}>{rightIcon}</button>
      )}
    </div>
  );
}

export function StepIndicator({ stepNum, stepDesc, totalDots, activeDot }) {
  return (
    <div className="step-indicator">
      <div className="step-label">STEP {String(stepNum).padStart(2, '0')}</div>
      <div className="step-desc">{stepDesc}</div>
      <div className="dots">
        {Array.from({ length: totalDots }).map((_, i) => (
          <div key={i} className={`dot${i === activeDot ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export function FormGroup({ label, emoji, children }) {
  return (
    <div className="form-group">
      <div className="form-label">
        {emoji && <span className="emoji">{emoji}</span>}
        {label}
      </div>
      {children}
    </div>
  );
}

export function SelectWrap({ children }) {
  return <div className="select-wrap">{children}</div>;
}

export function Chips({ options, selected, onToggle, single }) {
  return (
    <div className="chips">
      {options.map(opt => (
        <button
          key={opt}
          className={`chip${selected.includes(opt) ? ' selected' : ''}`}
          onClick={() => onToggle(opt, single)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
