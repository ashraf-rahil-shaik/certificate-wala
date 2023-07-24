import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Header2 = () => {
  const [showCourses, setShowCourses] = useState(false);

  const toggleCourses = () => {
    setShowCourses(!showCourses);
  };

  return (
    <>
      <div className="login-container">
        <h1 to='/' className="title">Triaright Certificate </h1>
        <div className="menu">
          
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleCourses}>Courses</button>
            {showCourses && (

              <div className="dropdown-content">
                <div className='sub-menu'>
                  <h4>with QR</h4>
                  <Link to="/finalCertificate"><li>with QR</li></Link>
                  </div>
                <div className='sub-menu'>
                  <h4>without Qr</h4>
                  <Link to="/withoutQr"><li>without Qr</li></Link>
                  </div>
            
                <div className='sub-menu'>
                  <h4>portrait</h4>
                  <Link to="/vCertificate"><li>portrait</li></Link>
                  </div>
                <div className='sub-menu'>
                  <h4>Course Complition</h4>
                  <Link to="/CourseComplition"><li>Course Complition</li></Link>
                  </div>
                <div className="sub-menu">
                  <h4>IT</h4>
                  <ul>
                   <Link to ="/certificate"> <li>c/c++</li></Link>
                   <Link to="/java"><li>java</li></Link>
                   <Link to="/python"><li>Python</li></Link> 
                    <li>mysql</li>
                 <Link to="/wt"><li>webtechnologies</li></Link>   
                    <Link to ="/cloudcomputing"><li>cloudcomputing</li></Link>
                  </ul>
                </div>
                <div className="sub-menu">
                  <h4>Non-IT</h4>
                  <ul>
                    <li>voice-process</li>
                    <li>non-voice process</li>
                  </ul>
                </div>
                <div className="sub-menu">
                  <h4>Management</h4>
                  <ul>
                    <li>hrm</li>
                 <Link to ="/digitalmarketing"><li>digital marketing</li></Link>
                  </ul>
                </div>
                <div className="sub-menu">
                  <h4>Finance</h4>
                  <ul>
                    
                 <Link to ="/tally"><li>tally</li></Link>
                  </ul>
                </div>
                <div className="sub-menu">
                  <h4>Pharmaceuticals</h4>
                  <ul>
                  <Link to="/medicalcoding"><li>medical coding</li></Link>  
                    <li>medical billing</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
