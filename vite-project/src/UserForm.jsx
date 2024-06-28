import { useState } from 'react';
import './App.css';

export function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitButton, setSubmitButton] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };

  const handleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const validationRules = {
    firstName: (value) => /^[A-Z]/.test(value) ? '' : 'First name must start with uppercase letter',
    lastName: (value) => (value.length >= 8) ? '' : 'Last name must be at least 8 characters long',
    email: (value) => /@/.test(value) ? '' : 'Email must contain "@" symbol',
  };

  const validateForm = () => {
    let hasErrors = false;
    const errors = {};
    for (const field in validationRules) {
      const error = validationRules[field](eval(field)); 
      if (error) {
        errors[field] = error;
        hasErrors = true;
      }
    }

    setSubmitButton(hasErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!submitButton) {
      setSubmittedData({ firstName, lastName, email });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">1 Input (uppercase):</label>
          <input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(ev) => {
              handleFirstNameChange(ev);
              validateForm();
            }}
          />
          {validationRules.firstName(firstName) && (
            <p style={{ color: 'red' }}>{validationRules.firstName(firstName)}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName">2 Input (more than 8 characters):</label>
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(ev) => {
              handleLastNameChange(ev);
              validateForm();
            }}
          />
          {validationRules.lastName(lastName) && (
            <p style={{ color: 'red' }}>{validationRules.lastName(lastName)}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">3 Input (@):</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(ev) => {
              handleEmailChange(ev);
              validateForm();
            }}
          />
         
          {validationRules.email(email) && (
            <p style={{ color: 'red' }}>{validationRules.email(email)}</p>
          )}
        </div>
        <button disabled={submitButtonD}>SEND</button>
      </form>
      {submittedData && (
        <div>
          <h3>Form Data:</h3>
          <p>Input 1: {submittedData.firstName}</p>
          <p>Input 2: {submittedData.lastName}</p>
          <p>Input 3: {submittedData.email}</p>
        </div>
      )}
    </>
  );
}
