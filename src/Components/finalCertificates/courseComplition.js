import React, { useState } from "react";
import jsPDF from "jspdf";
import "./courseComplition.css";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Header2 from "../Header2";
import QRCode from "qrcode.react"; 
import logo from "../../images/logo.png"

function CourseComplition() {
  const [excelData, setExcelData] = useState([]);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 10;

  function createPDFObject(certificateName, index) {
    const certificate = document.getElementById(`certificate-${index}`);
  
    html2canvas(certificate, {
      quality: 4, // Adjust the quality value
      scale: 4 ,
      useCORS: true,
      // Adjust the scale value
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("landscape", "px", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
      const fileName = `${certificateName}_certificate.pdf`;
      pdf.save(fileName);
    });
  }
  const qrCodeStyle = {
    width: "80px",
    height: "80px",

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
        const startDate = formatDate(row[2]);
        const endDate = formatDate(row[3]);
        const dataOfIssue = formatDate(row[4]);
        // Replace the date values in the row with the formatted dates
        row[2] = startDate;
        row[3] = endDate;
        row[4] = dataOfIssue;

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
    const pdf = new jsPDF("landscape", "px", "a4", true, "pt", "", false, 300);

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

      <h1>Certificate with QR Code </h1>
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
            <div key={index} id={`certificate-${index}`} className="certificate-container4">
          <div>
<div className="proudly">
THIS CERTIFICATE PROUDLY PRESENTED TO
</div>
<div className="std-name">
<h1 className="student-name3">{row[0].toUpperCase()}</h1></div>


          </div>
          <div className="descriptions">
            <p>HAS SUCCESFULLY COMPLETED<div className="dash">{row[1]}</div>  COURSE</p>
            <p>FROM BATCH No:<div className="dash-date">{row[2]} </div > FOR THE YEAR <div className="dash-date">{row[3]}</div></p>
            <p>WE CONGRATULATE AND WISH IN FUTURE ENDURANCE</p>
          </div>
          <div><img src={logo} alt="logo"  className="logo"/>
          <p className="company">COMPANY</p>
          </div>
          <div><p className="green-date">{row[3]}</p>
          <p className="dates">DATE</p>
          
          </div>
          <div>        <p className="signed">SIGNATURE</p>
</div>
<div className="qr-code-container2">
                  <QRCode value={`TRIARIGHT SOLUTIONS LLP \nThis Is To Cetrify That \n${row[0].toUpperCase()}\nHas Successfully Completed ${row[6]} Weeks Internship On ${row[1]}\nDate of Issue:${row[4]}\nCertificate No:${row[5]}` } style={qrCodeStyle} />
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

export default CourseComplition;