import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if(phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // call backend API
    try {
      const res = await fetch("http://localhost:8000/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setShowOtpInput(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Network error");
    }
  }

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp)
  }
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
        <input 
        type="text" 
        value={phoneNumber}
        onChange={handlePhoneNumber}
        placeholder="Enter Phone Number"
        className="border border-gray-400 rounded focus:outline-none focus:border-black-500 mr-2 px-2"
        />
        <button type="submit" className="border border-gray-400 rounded focus:outline-none focus:border-black bg-red-500 px-2">Submit</button>
      </form>) : (
        <div>
          <p> Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
        )}
    </div>
  );
};

export default PhoneOtpForm;
