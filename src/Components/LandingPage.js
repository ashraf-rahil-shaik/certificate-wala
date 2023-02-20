import React, { useState, useEffect } from 'react';
import img from '../images/Project_18-20.jpg';
import { Link} from 'react-router-dom';
import Login from './Login';



function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [text, setText] = useState('');
console.log(selectedOption)
  const handleRegisterClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    const texts = [
      'Create Stunning Certificates in Seconds - Celebrate Success with Ease Using Our Online Generator!',
      'Unlock the Power of Appreciation with Stunning Certificates Created in Seconds with Our Online Generator',
      'Effortlessly Design Custom Certificates for Any Occasion with Our User-Friendly Generator',
      'Recognize Achievement and Inspire Success with Personalized Certificates from Our Generator',
      'Create Beautiful Certificates in Minutes with our Easy-to-Use Certificate Generator'
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setText(texts[randomIndex]);
  }, []);

  return (
  <>

            <div className="login-container">
              <Link to='/' className="title">Certificate wala</Link>
                     
            
            </div>
            <h1 className="caption">"{text}!"</h1>
            <div className="img-container">
              <img alt="certificate-pic" src={img} />
           
              <div className='login-reg'>
             <Login />
   
              <h4>don't have an account yet!  </h4>
              <div className="register-dropdown" onClick={handleRegisterClick}>
                <div className="register-button">Register</div>
                </div>
                {showDropdown && (
                  <div className="dropdown">
                    <Link to="/company" className='links'onClick={() => handleOptionSelect('company')}>
                      Company
                    </Link>
                    <Link to="/school-college" className='links' onClick={() => handleOptionSelect('school-college')}>
                      School/College
                    </Link>
                    <Link to="/consultant" className='links' onClick={() => handleOptionSelect('consultant')}>
                      Consultant
                    </Link>
                  </div>
                )}
              </div>
            </div>
   
 </>

  );
}

export default App;
