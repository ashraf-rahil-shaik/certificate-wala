import React from 'react';
import ReactDOM from 'react-dom/client';
import './Components/index.css';
import App from './Components/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyRegister from './Components/CompanyReg';
import CollegeRegister from './Components/CollegeReg';
import ConsultantRegister from './Components/ConsultantReg';
import CertificateForm from './Components/Certificate/Certificate';

import FinalCertificate from './Components/finalCertificates/finalCertificate';
import VCertificate from './Components/finalCertificates/vCertificate';
import WithoutQr from './Components/finalCertificates/withoutQr';
import CourseComplition from './Components/finalCertificates/courseComplition';
import VCertificateGbo from './Components/finalCertificates/vCertificateGbo';
import VCertificateBOV from './Components/finalCertificates/vCertificateBOV';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <BrowserRouter>
<App/>


    <Routes>
             
             <Route path='/company' element={<CompanyRegister/>}/>
             <Route path='/school-college' element={<CollegeRegister/>}/>
             <Route path='/consultant' element={<ConsultantRegister/>}/>
             
             <Route path='/Certificate' element={<CertificateForm/>}/>  
             <Route path='/finalCertificate' element={<FinalCertificate/>}/>  
             <Route path='/vCertificate' element={<VCertificate/>}/>  
             <Route path='/vCertificateGbo' element={<VCertificateGbo/>}/>  
             <Route path='/vCertificateBOV' element={<VCertificateBOV/>}/>  
             <Route path='/withoutQr' element={<WithoutQr/>}/>  
             <Route path='/coursecomplition' element={<CourseComplition/>}/>  
             
             
           </Routes>
  
  </BrowserRouter>
  </React.StrictMode>
);



