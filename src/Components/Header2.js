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
                  <Link className="link"  to="/finalCertificate">with QR</Link>
                  </div>
                <div className='sub-menu'>
                  <h4>without Qr</h4>
                  <Link className="link" to="/withoutQr">without Qr</Link>
                  </div>
            
                <div className='sub-menu'>
                  <h4>portrait</h4>
                  <Link className="link"  to="/vCertificate">portrait</Link>
                  </div>
                <div className='sub-menu'>
                  <h4>portrait-GBO</h4>
                  <Link className="link" to="/vCertificateGbo">portrait-GBO</Link>
                  </div>
                <div className='sub-menu'>
                  <h4>portrait-BOV</h4>
                  <Link className="link" to="/vCertificateBOV">portrait-BOV</Link>
                  </div>
                <div className='sub-menu'>
                  <h4>Course Complition</h4>
                  <Link className="link"  to="/CourseComplition">Course Complition</Link>
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
