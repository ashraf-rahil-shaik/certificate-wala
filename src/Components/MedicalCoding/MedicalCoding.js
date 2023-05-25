import React, { useState } from "react";
import Header2 from "../Header2";
import img from "../../images/logo.png"
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./MedicalCoding.css"
function MedicalCoding() {
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [representative,setRepresentative] =useState("")

  const [isCertificateVisible, setIsCertificateVisible] = useState(false);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !representative ) {
      alert("Please fill all required fields.");
      return;
    }
    setIsCertificateVisible(true);
  };
  function createPDFObject(name) {
    const input = document.getElementById("main");
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const fileName = name ? `${name}.pdf` : "certificate.pdf"; // Use name variable for filename if available
      pdf.save(fileName);
    });
  } 
 
  return (
    <>
    <Header2/>
    <div className="certificate-form-container">
      <form onSubmit={handleSubmit}>
        <h4>MedicalCoding</h4>
        <h2>INTERNSHIP ACCEPTANCE LETTER</h2>
        
      
        <div className="form-group">
          <label htmlFor="salutation">Salutation</label>
          <select id="salutation" value={salutation} onChange={(event) => setSalutation(event.target.value)}>
            <option value="">Course</option>
            <option value="Mr.">IT</option>
            <option value="Ms.">NON-IT</option>
            <option value="Mrs.">Management</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">representative*</label>
          <input id="representative" type="text" value={representative} onChange={(event) => setRepresentative(event.target.value)} required />
        </div>
       
       
        <button type="submit">Generate Certificate</button>
        <button onClick={() => createPDFObject(name)} className="download-button">
  Download PDF
</button>
      </form>
      {isCertificateVisible && (
        <div className="certificate-container" id="main">
        <div className="header-container">
  <img src={img} alt="logo" />
  </div>
  <h2>INTERNSHIP ACCEPTANCE LETTER</h2>
  <h4>Date: 24 Mar 2023</h4>
           <h5>Dear {name},</h5>
          <div className="content-container">
            <p>
            We are pleased to confirm your acceptance of an internship as Medical Coding Specialist -Intern in the Coding Department with TriaRight Solutions LLP. Your duties and assignments for this position are as follows. 
             </p>
             <ul>
  <li>Introduction to Medical Terminology</li>
  <li>Anatomy Structure</li>
  <li>Medical Terminology</li>
  <li>Medical Ethics</li>
  <li>ICD-9-CM Coding Manual</li>
  <li>Infections using ICD-9-CM</li>
  <li>Digestive System using ICD-9-CM</li>
  <li>Coding for Pregnancy using ICD-9-CM</li>
  <li>CPT Coding for Reproductive Systems</li>
  <li>Coding for Mental Disorders using ICD-9-CM</li>
</ul>

<p>
Your first day of work will be 24th March 2023. You will work 30 number of hours per week totaling 480 number of hours for the duration of the internship. 
</p>
<p>If you have any questions, please feel free to contact supervisor’s allocated at work. We are please you’ve decided to join TriaRight Solutions LLP.
 </p>
<p>Sincerely,</p>
<p>{representative}</p>
<p>Company representative
</p>
<footer className="footer">
  <div>
  <p>#7-1-58, 404 B, 4th floor, Surekha Chambers, Ameerpet, 	</p>
  <p>Hyderabad, Telangana – 500016</p>
  </div>
<div>

  <p>LLPIN: ACA-1594</p>
<p> Ph: 040 666 37 666</p>
</div>

</footer>
</div>

</div>
)}
</div>

</>
);
}

export default MedicalCoding;