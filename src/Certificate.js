// import React, { useState } from 'react';

// export function CertificateForm() {
//   const [salutation, setSalutation] = useState('Mr.');
//   const [name, setName] = useState('');
//   const [course, setCourse] = useState('');
//   const [certificate, setCertificate] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [showCertificate, setShowCertificate] = useState(false);

//   const handleSalutationChange = (event) => {
//     setSalutation(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleCourseChange = (event) => {
//     setCourse(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name || !course) {
//       setFormError('Please enter a name and course.');
//       return;
//     }
//     const newCertificate = {
//       salutation: salutation,
//       name: name,
//       course: course,
//     };
//     setCertificate(newCertificate);
//     setFormError(null);
//     setShowCertificate(true);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Salutation:
//         <select value={salutation} onChange={handleSalutationChange}>
//           <option value="Mr.">Mr.</option>
//           <option value="Mrs.">Mrs.</option>
//           <option value="Ms.">Ms.</option>
//         </select>
//       </label>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={handleNameChange} />
//       </label>
//       <label>
//         Course:
//         <input type="text" value={course} onChange={handleCourseChange} />
//       </label>
//       <button type="submit">Generate Certificate</button>
//       {formError && <p>{formError}</p>}
//       {showCertificate && certificate && (
//         <CertificateDisplay
//           salutation={certificate.salutation}
//           name={certificate.name}
//           course={certificate.course}
//         />
//       )}
//     </form>
//   );
// }

// function CertificateDisplay({ salutation, name, course }) {
//   return (
//     <div className="certificate-container">
//       <div className="certificate">
//         <h2>Certificate of Completion</h2>
//         <p>
//           This certificate is presented to {salutation} {name} for completing the course:
//         </p>
//         <h3>{course}</h3>
//         <p>Congratulations on your achievement!</p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';


function CertificateForm() {
  const [name, setName] = useState('');
  const [salutation, setSalutation] = useState('Mr.');
  const [stream, setStream] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [certificateVisible, setCertificateVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === '' || stream === '' || company === '' || startDate === '' || endDate === '') {
      alert('Please fill out all the fields before generating the certificate.');
    } else {
      setCertificateVisible(true);
    }
  };

  const getDaysBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const daysBetween = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return daysBetween;
  };

  return (
    <div className="certificate-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Internship Certificate Generator</h2>
        <div className="form-group">
          <label htmlFor="salutation">Salutation:</label>
          <select id="salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)}>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="stream">Stream:</label>
          <input id="stream" type="text" value={stream} onChange={(e) => setStream(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name:</label>
          <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date:</label>
          <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
      {certificateVisible && (
        <div className="certificate-container">
          <div className="header-container">
            <h2>{company}</h2>
          </div>
          <div className="content-container">
            <p>
              This certificate is presented to {salutation} {name} for the successful completion of an internship in {stream} from {startDate} to {endDate} ({getDaysBetweenDates(startDate, endDate)} days).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificateForm;
