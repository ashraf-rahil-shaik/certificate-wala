import React, { useState } from "react";
import jsPDF from "jspdf";
import "./vCertificateGbo.css";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Header2 from "../Header2";
import QRCode from "qrcode.react"; 
import img from "../../images/main-logo.png";
import sign from "../../images/main-logo2.png";
import stamp from "../../images/stamp (1).png"
import signk from "../../images/kishore.png"

function VCertificateGbo() {
  const [excelData, setExcelData] = useState([]);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 10;



  const qrCodeStyle = {
    width: "65px",
    height: "65px",
    position: "relative",
    bottom:"65px"

  };

  const createJPGObject = (certificateName, index) => {
    const certificate = document.getElementById(`certificate-${index}`);
  
    html2canvas(certificate, {
      quality: 1, // Adjust the quality value (1 is the highest quality)
      scale: 2, // Adjust the scale value
      useCORS: true, // Enable CORS support
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${certificateName}_certificate.jpg`;
      link.click();
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


  const handleDownloadAllJPG = () => {
    currentCertificates.forEach((row, index) => {
      const certificateName = row[0];
      createJPGObject(certificateName, index);
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

      <h1> portrait Certificate </h1>
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
          <button onClick={handleDownloadAllJPG} className="download-button-all">
  Download All Certificates (JPG)
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
            <img  className="main-logo" src={img} alt="logo"  />
            <div className="qr-code-container2">
              <QRCode value={`TRIARIGHT SOLUTIONS LLP \nThis Is To Cetrify That \n${row[0].toUpperCase()}\nHas Successfully Completed Internship On ${row[6]}\nDate of Issue:${row[9]}\nCertificate No:${row[10]}` } style={qrCodeStyle} />
                </div>
              <div className="header-container2">
             
                   <h1 className="student-name6">{row[0].toUpperCase()}</h1> {/* Assuming Name is in the first column */}
                   <div className="main-details">
               <p className="student-details">Of {row[1]} With Registered No.{row[2]} Of</p>
               <p className="college-name">{row[3]}</p>
                <p className="descriptions2">Has Successfully Completed {row[4]} Semester {row[5]} Term Internship</p>
                <p className="times">
                  On  <b>{row[6]}</b>  From  <b>{row[7]}</b> To <b>{row[8]}</b>
                </p>
                <p className="overall">The Overall Performance of the intern his/her Internship Is Found To Be Satisfactory</p>
                </div>
               
                {/* Assuming Start Date is in the third column and End Date is in the fourth column */}
                
                <div className="ends2">
                  <p>
                    Date of Issue: <b>{row[9]}</b>
                    <br />
                    Certificate No: <b>{row[10]}</b>
                    <br />
                    Mail: <b>kk@triaright.com</b>
                    <br/>
                    Contact: <b>9848627750</b>
                  </p>
                  <img src={stamp} className="stamp" alt="stamp" />
             <img src={signk} className="sign-kishore" alt="sign"/>
                  
              
                {/* Assuming Date of Issue is in the fifth column and Certificate Number is in the sixth column */}
               
                <div className="named">
                  
                
                
          
         <p> <b className="chairs">Kishore Kumar</b>
         <br/>
             <i>Founder & Director-TriaRight</i></p></div>
         
             
             </div>
            <div className="address-office">
            <p>Address:#7-1-58, 404 B, 4th floor, Surekha <br/>Chambers, Ameerpet, <br/>Hyderabad,Telangana-500016</p>
            </div>
            
                  </div>
                  
            </div>
            
             
          
              <button onClick={() => createJPGObject(row[0], index)} className="download-button">
             Download Certificate
           </button> 
           </>
          ))}
        
        </div>
      )}
    </div>
  );
}

export default VCertificateGbo;