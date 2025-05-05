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

  const handleChange = () => {};
  const handleClick = () => {};
  const handleKeyDown = () => {};

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
            className="w-[40px] h-[40px] m-[5px] text-center text-[1.2em]"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
