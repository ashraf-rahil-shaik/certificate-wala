import React, { useState ,useEffect } from 'react';
import img from "../images/Project_18-20.jpg"

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [text, setText] = useState('');

  const handleRegisterClick = () => {
    setShowDropdown(!showDropdown);
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  }
 
   
  
    useEffect(() => {
      const texts = ["Create Stunning Certificates in Seconds - Celebrate Success with Ease Using Our Online Generator!","Unlock the Power of Appreciation with Stunning Certificates Created in Seconds with Our Online Generator","Effortlessly Design Custom Certificates for Any Occasion with Our User-Friendly Generator","Recognize Achievement and Inspire Success with Personalized Certificates from Our Generator","Create Beautiful Certificates in Minutes with our Easy-to-Use Certificate Generator"];
      const randomIndex = Math.floor(Math.random() * texts.length);
      setText(texts[randomIndex]);
    }, []);

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
    <h1 className='caption'>"{text}!"</h1>
    <div className='img-container'>
      <img alt="certificate-pic" src={img}/>  
 
    <div>
      {selectedOption && (
      
        <form className="register-form">
          <h1>Register!</h1>
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
