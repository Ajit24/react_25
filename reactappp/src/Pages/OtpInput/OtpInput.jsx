import React, { useState } from 'react';
import '../OtpInput/OtpInput.css';

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(6).fill('')); // Assuming a 6-digit OTP

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Get only the last character
      setOtp(newOtp);

      // Move to next input if filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      // Show alert if all inputs are filled
      if (newOtp.every(digit => digit)) {
        // Delay alert to ensure the last digit is visible
        setTimeout(() => {
          alert(`Your OTP is: ${newOtp.join('')}`);
        }, 50);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus(); // Move to previous input
    }
  };

  return (
    <div className="otp-input-container">
      <h1>Enter OTP</h1>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="otp-input"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;