import { useState } from 'react';
import './styles/button.css';

function Button3() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleClick = value => {
    setSelectedValues(prevValues => {
      const index = prevValues.indexOf(value);
      if (index === -1) {
        return [...prevValues, value];
      } else {
        return prevValues.filter(v => v !== value);
      }
    });
  };
  return (
    <div className="btn3Parent">
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('이별') ? 'active' : ''}`}
        onClick={() => handleClick('이별')}
      >
        이별
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('운동') ? 'active' : ''}`}
        onClick={() => handleClick('운동')}
      >
        운동
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('행복') ? 'active' : ''}`}
        onClick={() => handleClick('행복')}
      >
        행복
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('우울') ? 'active' : ''}`}
        onClick={() => handleClick('우울')}
      >
        우울
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('집중') ? 'active' : ''}`}
        onClick={() => handleClick('집중')}
      >
        집중
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('사랑') ? 'active' : ''}`}
        onClick={() => handleClick('사랑')}
      >
        사랑
      </a>
      <a
        href="#"
        className={`btn3 ${selectedValues.includes('분노') ? 'active' : ''}`}
        onClick={() => handleClick('분노')}
      >
        이별
      </a>
    </div>
  );
}
export default Button3;
