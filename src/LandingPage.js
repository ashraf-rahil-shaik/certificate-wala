import React, { useState } from 'react';


function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');


  const handleRegisterClick = () => {
    setShowDropdown(!showDropdown);
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  }

  return (
    <div className="App">
      <h1>Welcome to My Landing Page</h1>
      <form>
        <label>
          Email:
          <input type="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <div className="register-dropdown" onClick={handleRegisterClick}>
        <div className="register-button">
          {selectedOption ? `Register as ${selectedOption}` : 'Register'}
        </div>
        {showDropdown && (
          <div className="dropdown">
            <div onClick={() => handleOptionSelect('company')}>Company</div>
            <div onClick={() => handleOptionSelect('school/college')}>School/College</div>
            <div onClick={() => handleOptionSelect('Consultant')}>Consultant</div>
            
          </div>
        )}
      </div>
      {selectedOption && (
        <form className="register-form">
          <label>
            Name:
            <input type="text" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" />
          </label>
          <br />
          <button type="submit" className="register-submit-button">Register as {selectedOption}</button>
        </form>
      )}
    </div>
  );
}

export default App;
