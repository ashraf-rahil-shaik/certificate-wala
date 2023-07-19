// import React, { useState } from "react";
// import Header2 from "./Header2";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import "./finalCertificate.css";

// function FinalCertificate() {
//   const [name, setName] = useState("");
//   const [course, setCourse] = useState("");
  
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [dateOfIssue, setDateOfIssue] = useState("");
//   const [certificateNumber, setCertificateNumber] = useState("");
//   const [isCertificateVisible, setIsCertificateVisible] = useState(false);

//   function createPDFObject(name) {
//     const input = document.getElementById("main");

//     html2canvas(input, {
//       quality: 4,
//       scale: 4
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape", "px", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       const fileName = name ? `${name}.pdf` : "certificate.pdf"; // Use name variable for filename if available
//       pdf.save(fileName);
//     });
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name || !startDate || !endDate || !dateOfIssue || !certificateNumber) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     setIsCertificateVisible(true);
//   };

//   return (
//     <>
//       <Header2 />
//       <div className="certificate-form-container">
//         <form onSubmit={handleSubmit}>
//           <h4>final certificate</h4>
//           <h2>certificate</h2>
//           <div className="form-group">
//             <label htmlFor="course">Course Name *</label>
//             <input
//               id="course"
//               type="text"
//               value={course}
//               onChange={(event) => setCourse(event.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="name">Full Name *</label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//               required
//             />
//           </div>
        
//           <div className="form-group">
//             <label htmlFor="startDate">Start Date *</label>
//             <input
//               id="startDate"
//               type="date"
//               value={startDate}
//               onChange={(event) => setStartDate(event.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="endDate">End Date *</label>
//             <input
//               id="endDate"
//               type="date"
//               value={endDate}
//               onChange={(event) => setEndDate(event.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="dateOfIssue">Date of Issue *</label>
//             <input
//               id="dateOfIssue"
//               type="date"
//               value={dateOfIssue}
//               onChange={(event) => setDateOfIssue(event.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="certificateNumber">Certificate Number *</label>
//             <input
//               id="certificateNumber"
//               type="text"
//               value={certificateNumber}
//               onChange={(event) => setCertificateNumber(event.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Generate Certificate</button>
//           <button onClick={() => createPDFObject(name)} className="download-button">
//         Download PDF
//       </button>
//         </form>
//         {isCertificateVisible && (
//           <div className="certificate-container2" id="main">
//             <div className="header-container">
            
//               <h1 className="student-name">{name}</h1>
              
//               <p className="description">Has Successfully Completed 15 Weeks Internship
            
// </p><p className="time">
//                       on <b>{course}</b> from <b>{startDate}</b> to <b>{endDate}</b>
//                 </p>
              
//               <div className="end">
//                 <p >
//                   Date of Issue: <b>{dateOfIssue}</b>
//                 </p>
             
//                 <p >
//                   Certificate Number: <b>{certificateNumber}</b>
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
     
//     </>
//   );
// }

// export default FinalCertificate;
import React, { useState } from "react";
import jsPDF from "jspdf";
import "./finalCertificate.css";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Header2 from "./Header2";
import QRCode from "qrcode.react"; 


function FinalCertificate() {
  const [excelData, setExcelData] = useState([]);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 10;

  function createPDFObject(certificateName, index) {
    const certificate = document.getElementById(`certificate-${index}`);
  
    html2canvas(certificate, {
      quality: 4, // Adjust the quality value
      scale: 2 ,
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
    width: "60px",
    height: "60px",

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
            <div key={index} id={`certificate-${index}`} className="certificate-container2">
          
              <div className="header-container">
                <h1 className="student-name">{row[0].toUpperCase()}</h1> {/* Assuming Name is in the first column */}
                <p className="description">Has Successfully Completed {row[6]} Weeks Internship</p>
                <p className="time">
                  on <b>{row[1]}</b> from <b>{row[2]}</b> to <b>{row[3]}</b>
                </p>
                {/* Assuming Start Date is in the third column and End Date is in the fourth column */}
                <div className="end">
                <div className="qr-code-container">
                  <QRCode value={`TRIARIGHT SOLUTIONS LLP \nThis Is To Cetrify That \n${row[0].toUpperCase()}\nHas Successfully Completed ${row[6]} Weeks Internship On ${row[1]}\nDate of Issue:${row[4]}\nCertificate No:${row[5]}` } style={qrCodeStyle} />
                </div>
                  <p>
                    Date of Issue: <b>{row[4]}</b>
                    <br />
                    Certificate No: <b>{row[5]}</b>
                  </p>
                  
              
                {/* Assuming Date of Issue is in the fifth column and Certificate Number is in the sixth column */}
               
                <div className="names">
              <div>    <p> <b className="chair">Sunil Kumar Deva</b>
             <br/><i>Chairman-GlobalOne Services</i></p></div>
        <div>  <p className="kish"> <b className="chair">Kishore Kumar</b><br/>
             <i>Founder & Director-TriaRight</i></p></div>
         
             </div>
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

export default FinalCertificate;













