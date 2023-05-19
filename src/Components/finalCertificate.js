import React, { useState } from "react";
import Header2 from "./Header2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./finalCertificate.css";

function FinalCertificate() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [representative, setRepresentative] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);

  function createPDFObject() {
    const input = document.getElementById("main");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !representative || !startDate || !endDate) {
      alert("Please fill all required fields.");
      return;
    }
    setIsCertificateVisible(true);
  };

  return (
    <>
      <Header2 />
      <div className="certificate-form-container">
        <form onSubmit={handleSubmit}>
          <h4>final certificate</h4>
          <h2>certificate</h2>
          <div className="form-group">
            <label htmlFor="course">Course Name *</label>
            <input
              id="course"
              type="text"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="representative">Representative *</label>
            <input
              id="representative"
              type="text"
              value={representative}
              onChange={(event) => setRepresentative(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
            />
          </div>
          <button type="submit">Generate Certificate</button>
        </form>
        {isCertificateVisible && (
          <div className="certificate-container2" id="main">
            <div className="header-container">
              <h1 className="student-name">{name}</h1>
              <div>
                <p className="description">
                  on <b>{course}</b> from <b>{startDate}</b> to <b>{endDate}</b>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={createPDFObject}>Download PDF</button>
    </>
  );
}

export default FinalCertificate;
