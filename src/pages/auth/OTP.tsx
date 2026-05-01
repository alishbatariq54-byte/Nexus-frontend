import React, { useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState("");

  return (
    <div>
      <h2>2FA Verification</h2>

      <input
        maxLength="6"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={() => alert("Verified")}>Verify</button>
    </div>
  );
};

export default OTP;