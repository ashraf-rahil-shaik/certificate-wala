import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";

// import CertificateForm  from "./Certificate";

function App() {
  return (
    <>
    <div className="App">

{/* <CertificateForm/> */}
<Routes>
                <Route path='/' element ={<LandingPage/>} />
      
              </Routes>

    </div>
   
  
  </>);
}

export default App;
