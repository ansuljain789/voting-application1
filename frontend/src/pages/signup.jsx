import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/signup", {
        name,
        aadharNumber,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Aadhar Card Number"
          className="border p-2"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
