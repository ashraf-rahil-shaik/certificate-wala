import React, { useState } from "react";
import jsPDF from "jspdf";
import "./vCertificate.css";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Header2 from "./Header2";


function VCertificate() {
  const [excelData, setExcelData] = useState([]);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 10;

  const createPDFObject = (certificateName, index) => {
    const certificate = document.getElementById(`certificate-${index}`);
  
    html2canvas(certificate, {
      quality: 4, // Adjust the quality value
      scale: 3,
      
      // Adjust the scale value
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("portrait", "px", "a4"); // Set the orientation to portrait
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
      const fileName = `${certificateName}_certificate.pdf`;
      pdf.save(fileName);
    });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (excelData.length === 0) {
      alert("Please upload an Excel file.");
      return;
    }
    setIsCertificateVisible(true);
    setCurrentPage(1);
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

      if (jsonData.length === 0) {
        alert("The selected Excel file does not contain any data.");
        return;
      }

      const formattedData = jsonData.map((row) => {
        // Assuming the date columns are at index 1 (start date) and index 2 (end date)
        const startDate = formatDate(row[7]);
        const endDate = formatDate(row[8]);
        const dataOfIssue = formatDate(row[9]);
        // Replace the date values in the row with the formatted dates
        row[7] = startDate;
        row[8] = endDate;
        row[9] = dataOfIssue;

        return row;
      });

      setExcelData(formattedData);
      setIsCertificateVisible(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) {
      // If the date cannot be parsed, return the original date string
      return dateString;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  };


  const handleDownloadAll = () => {
    const pdf = new jsPDF("portrait", "px", "a4", true, "pt", "", false, 300); // Set the orientation to portrait
  
    const downloadPromises = [];
  
    currentCertificates.forEach((row, index) => {
      const certificateName = row[0];
      const promise = new Promise((resolve) => {
        createPDFObject(certificateName, index, pdf, resolve);
      });
      downloadPromises.push(promise);
    });
  
    Promise.all(downloadPromises).then(() => {
      const fileName = "page_certificates.pdf";
      pdf.save(fileName);
    });
  };
  
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate index of the first and last certificate to be displayed on the current page
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = excelData.slice(indexOfFirstCertificate, indexOfLastCertificate);

  return (
    <div className="body">
      <Header2/>

      <h1>Certificate </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="excelFile" className="upload">
          Upload Excel File
        </label>
        <input id="excelFile" type="file" accept=".xlsx" onChange={handleExcelUpload} required />
        <button type="submit">Generate Certificates</button>
      </form>

      {isCertificateVisible && (
        <div className="container_body">
          <div className="download-all-container">
            <button onClick={handleDownloadAll} className="download-button-all">
              Download All Certificates
            </button>
            <div className="pagination">
            {excelData.length > certificatesPerPage && (
              <div>
                {Array.from(Array(Math.ceil(excelData.length / certificatesPerPage)).keys()).map((pageNumber) => (
                  <button
                    key={pageNumber + 1}
                    className={currentPage === pageNumber + 1 ? "active" : ""}
                    onClick={() => handlePageChange(pageNumber + 1)}
                  
                  >
                    {pageNumber + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>
          {currentCertificates.map((row, index) => (
            <>
            <div key={index} id={`certificate-${index}`} className="certificate-container3">
           
              <div className="header-container2">
               
                   <h1 className="student-name2">{row[0].toUpperCase()}</h1> {/* Assuming Name is in the first column */}
                   <div className="main-details">
               <p className="student-details">Of {row[1]} With Registered No.{row[2]} Of</p>
               <p className="college-name">{row[3]}</p>
                <p className="descriptions">Has Successfully Completed {row[4]} Semister {row[5]} Term Internship</p>
                <p className="times">
                  on  <b>{row[6]}</b>  from  <b>{row[7]}</b> to <b>{row[8]}</b>
                </p></div>
               
                {/* Assuming Start Date is in the third column and End Date is in the fourth column */}
                <div className="ends">
                  <p>
                    Date of Issue: <b>{row[9]}</b>
                    <br />
                    Certificate No: <b>{row[10]}</b>
                  </p>
                  
              
                {/* Assuming Date of Issue is in the fifth column and Certificate Number is in the sixth column */}
               
                <div className="names">
            
          <b className="chair">Kishore Kumar</b>
             <p><i>Founder & Director-TriaRight</i></p></div>
         
             
             </div>
            
            
                  </div>
                  
            </div>
            
             
          
             <button onClick={() => createPDFObject(row[0], index)} className="download-button">
             Download Certificate
           </button>
           </>
          ))}
        
        </div>
      )}
    </div>
  );
}

export default VCertificate;