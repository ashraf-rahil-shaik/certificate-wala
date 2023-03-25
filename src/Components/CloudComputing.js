import React, { useState } from "react";
import Header2 from "./Header2";
import img from "../images/logo.png"
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./Certificate.css"
function CloudComputing() {
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [representative,setRepresentative] =useState("")
  const [stream, setStream] = useState("");
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);

  
  const downloadCertificate = () => {
    const certificateContainer = document.querySelector(".certificate-container");
  
    // Use html2canvas to generate a canvas element from the certificate content
    html2canvas(certificateContainer, { backgroundColor: "#fff" }).then((canvas) => {
      // Use jsPDF to create a new PDF document and add the canvas to it
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
  
      // Use the jsPDF save method to trigger a download of the PDF file
      pdf.save("certificate.pdf");
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !stream ||!representative ) {
      alert("Please fill all required fields.");
      return;
    }
    setIsCertificateVisible(true);
  };
  return (
    <>
    <Header2/>
    <div className="certificate-form-container">
      <form onSubmit={handleSubmit}>
        <h4>cloudcomputing</h4>
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
       
        <div className="form-group">
          <label htmlFor="stream">Stream *</label>
          <input id="stream" type="text" value={stream} onChange={(event) => setStream(event.target.value)} required />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
      {isCertificateVisible && (
        <div className="certificate-container">
          <div className="header-container">
  <img src={img} alt="logo" />
  </div>
  <h2>INTERNSHIP ACCEPTANCE LETTER</h2>
  <h4>Date: 23 Mar 2023</h4>
           <h5>Dear {name},</h5>
          <div className="content-container">
            <p>
            We are pleased to confirm your acceptance of an internship as Cloud System Engineer - Intern in the stream of Information Technology with TriaRight Solutions LLP. Your duties and assignments for this position are as follows.</p>
<ul>
<li>Learn the concepts of 
Basics of Cloud Computing
</li>
<li> DevOps</li>
<li>Containerization</li>
<li>Big Data</li>
<li>Green Cloud Computing</li>
<li>Cloud Cryptography</li>
<li>Edge Computing</li>
<li>Load Balancing</li>
<li>	Community model</li>
<li>Cloud Analytics</li>
<li>Conclusion</li>
<li>Understand the importance of Cloud and the usage of it</li>
<li>Working on the live projects related to cloud management</li>

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
<button onClick={downloadCertificate}>Download PDF</button>
</>
);
}
export default CloudComputing;