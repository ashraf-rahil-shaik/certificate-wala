import React from 'react';
import ReactDOM from 'react-dom/client';
import './Components/index.css';
import App from './Components/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyRegister from './Components/CompanyReg';
import CollegeRegister from './Components/CollegeReg';
import ConsultantRegister from './Components/ConsultantReg';
import CertificateForm from './Components/Certificate';




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
             
             
           </Routes>
  
  </BrowserRouter>
  </React.StrictMode>
);



