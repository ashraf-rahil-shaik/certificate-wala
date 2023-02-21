import React, { useState } from "react";


function CertificateForm() {
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [company, setCompany] = useState("");
  const [stream, setStream] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (!name || !company || !stream || !startDate || !endDate) {
      alert("Please fill all required fields.");
      return;
    }

    setIsCertificateVisible(true);
  };

  const getDaysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  };

  return (
    <div className="certificate-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Internship Certificate Generator</h2>
        <div className="form-group">
          <label htmlFor="salutation">Salutation</label>
          <select id="salutation" value={salutation} onChange={(event) => setSalutation(event.target.value)}>
            <option value="">Select salutation</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company Name *</label>
          <input id="company" type="text" value={company} onChange={(event) => setCompany(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="stream">Stream *</label>
          <input id="stream" type="text" value={stream} onChange={(event) => setStream(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Course Start Date *</label>
          <input id="start-date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">Course End Date *</label>
          <input id="end-date" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
      {isCertificateVisible && (
        <div className="certificate-container">
          <div className="header-container">
            <h2>{company}</h2>
          </div>
          <div className="content-container">
            <p>
              This certificate is presented to {salutation} {name} for the successful completion of an internship in {stream} from {startDate.split("-").reverse().join('/')}
to {endDate.split("-").reverse().join("/")}. The intern has completed {getDaysBetweenDates(startDate, endDate)} days of training.
and recognizing their exceptional skills and dedication during their time with us. Congratulations on your achievement! </p>
</div>
</div>
)}
</div>
);
}
export default CertificateForm;