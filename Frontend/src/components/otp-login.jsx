import React, { useState } from "react";
import { Form } from "react-router-dom";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if(phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // call backend API
    // show OTP Field
    setShowOtpInput(true)
  }

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp)
  }
  return (
    <div>
      {!showOtpInput ? (
        <Form onSubmit={handlePhoneSubmit}>
        <input 
        type="text" 
        value={phoneNumber}
        onChange={handlePhoneNumber}
        placeholder="Enter Phone Number"
        />
        <button type="submit">Submit</button>
      </Form>) : (
        <div>
          <p> Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
        )}
    </div>
  );
};

export default PhoneOtpForm;
