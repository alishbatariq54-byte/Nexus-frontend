import React, { useState } from "react";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");

  const strength =
    password.length < 4 ? "Weak" :
    password.length < 8 ? "Medium" : "Strong";

  return (
    <div>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{strength}</p>
    </div>
  );
};

export default PasswordStrength;