
import React ,{useState} from 'react';

function ConsultantRegister({ selectedOption }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const today = new Date();
    const userAge = today.getFullYear() - new Date(dob).getFullYear();

    if (firstName && lastName && email && password && confirmPassword && dob && userAge >= 18) {
      if (password === confirmPassword) {
        localStorage.setItem('user', JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dob
        }));

        setMessage('Registered Successfully!');
      } else {
        setMessage('Passwords do not match');
      }
    } else {
      setMessage('Please fill out all fields and ensure you are at least 18 years old');
    }
  };

  return (
    <div className="signup-page">
     <h1 className="signup-page-title">Register as Consultant</h1>
     {message && <p className="form-message">{message}</p>}
    <form className="form" onSubmit={handleSubmit}>
      <input 
        className="input-field" 
        type="text" 
        placeholder="First Name" 
        value={firstName} 
        onChange={event => setFirstName(event.target.value)} 
      />
      <input 
        className="input-field" 
        type="text" 
        placeholder="Last Name" 
        value={lastName} 
        onChange={event => setLastName(event.target.value)} 
      />
      <input 
        className="input-field" 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={event => setEmail(event.target.value)} 
      />
      <input 
        className="input-field" 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={event => setPassword(event.target.value)} 
      />
      <input 
        className="input-field" 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={event => setConfirmPassword(event.target.value)} 
      />
      <input 
        className="input-field" 
        type="date" 
        placeholder="Date of Birth" 
        value={dob} 
        onChange={event => setDob(event.target.value)} 
      />
      <button className="submit-button" type="submit">Submit</button>
      {/* {message && <p className="form-message">{message}</p>} */}
    </form>
</div>
  );
};

export default ConsultantRegister;
