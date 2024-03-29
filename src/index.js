import React from 'react';
import ReactDOM from 'react-dom/client';
import './Components/index.css';
import App from './Components/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyRegister from './Components/CompanyReg';
import CollegeRegister from './Components/CollegeReg';
import ConsultantRegister from './Components/ConsultantReg';
import CertificateForm from './Components/Certificate/Certificate';
import CloudComputing from './Components/CloudComputing/CloudComputing';
import Java from './Components/Java/Java'
import WebTech from './Components/WebTech/WebTech';
import DigitalMarketing from './Components/DigitalMarketing/DigitalMarketing';
import MedicalCoding from './Components/MedicalCoding/MedicalCoding';
import Tally from './Components/Tally/Tally';
import Python from './Components/Python/Python';
import FinalCertificate from './Components/finalCertificates/finalCertificate';
import VCertificate from './Components/finalCertificates/vCertificate';
import WithoutQr from './Components/finalCertificates/withoutQr';
import CourseComplition from './Components/finalCertificates/courseComplition';
import VCertificateGbo from './Components/finalCertificates/vCertificateGbo';



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
             <Route path='/withoutQr' element={<WithoutQr/>}/>  
             <Route path='/coursecomplition' element={<CourseComplition/>}/>  
             <Route path='/cloudcomputing' element={<CloudComputing/>}/>  
             <Route path='/java' element={<Java/>}  />
             <Route path='/wt' element={<WebTech/>}  />
             <Route path='/digitalmarketing' element={<DigitalMarketing/>}  />
             <Route path='/medicalcoding' element={<MedicalCoding/>}  />
             <Route path='/tally' element={<Tally/>}  />
             <Route path='/python' element={<Python/>}  />

             
           </Routes>
  
  </BrowserRouter>
  </React.StrictMode>
);



