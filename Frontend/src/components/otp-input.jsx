import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if(inputRefs.current[0]) {
      inputRefs.current[0].focus(); // this will focus on the very first field of the input field after entering the phone number
    }
  }, [])
  
  console.log(inputRefs);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if(isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if(combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if(value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if(index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if(
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)} // this will provide reference of each input field
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-[40px] h-[40px] m-[5px] text-center text-[1.2em] border border-gray-400 rounded focus:outline-none focus:border-red-500"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;