import { useState } from 'react';
import './App.css';

export function UserForm() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [activeButton, setActiveButton] = useState(true);
  const [formData, setFormData] = useState(null);

  const handleInput1 = (ev) => {
    setInput1(ev.target.value);
  };

  const handleInput2 = (ev) => {
    setInput2(ev.target.value);
  };

  const handleInput3 = (ev) => {
    setInput3(ev.target.value);
  };

  const validateForm = () => {
    const isInput1Valid = /^[A-Z]/.test(input1);
    const isInput2Valid = input2.length > 8;
    const isInput3Valid = /@/.test(input3);
    setActiveButton(!(isInput1Valid && isInput2Valid && isInput3Valid));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!activeButton) {
      setFormData({ input1, input2, input3 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input1">Input 1 (Uppercase letter):</label>
          <input
            name="input1"
            type="text"
            value={input1}
            onChange={(ev) => {
              handleInput1(ev);
              validateForm();
            }}
          />
        </div>
        <div>
          <label htmlFor="input2">Input 2 (More than 8 characters):</label>
          <input
            name="input2"
            type="text"
            value={input2}
            onChange={(ev) => {
              handleInput2(ev);
              validateForm();
            }}
          />
        </div>
        <div>
          <label htmlFor="input3">Input 3 (Contains @):</label>
          <input
            name="input3"
            type="text"
            value={input3}
            onChange={(ev) => {
              handleInput3(ev);
              validateForm();
            }}
          />
        </div>
        <button disabled={activeButton}>SEND</button>
      </form>
      {formData && (
        <div>
          <h3>Form Data:</h3>
          <p>Input 1: {formData.input1}</p>
          <p>Input 2: {formData.input2}</p>
          <p>Input 3: {formData.input3}</p>
        </div>
      )}
    </div>
  );
}
