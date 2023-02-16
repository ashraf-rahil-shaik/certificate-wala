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
    <>
    <div className="login-container">
      <h1 className='title'>Certificate wala</h1>
      <form className='login'>
        <label>
          Email
          <input type="email" className='form-group' placeholder='email'/>
        </label>
        <br />
        <label>
          Password
          <input type="password"  className='form-group'placeholder='password'/>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <div className="register-dropdown" onClick={handleRegisterClick}>
        <div className="register-button">
        Register
        </div>
        {showDropdown && (
          <div className="dropdown">
            <div onClick={() => handleOptionSelect('company')}>Company</div>
            <div onClick={() => handleOptionSelect('school/college')}>School/College</div>
            <div onClick={() => handleOptionSelect('Consultant')}>Consultant</div>
            
          </div>
        )}
      </div>
      
    </div>
    <div className='img-container'>
      <img alt="certificate-pic" src='https://imgv3.fotor.com/images/videoImage/five-certificates-templates-from-Fotor.jpg' />  
 
    <div>
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
      </div>
    </>
  );
}

export default App;
