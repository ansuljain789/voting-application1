// import  { useState } from 'react'
// import { login } from './services/authService'
// import { useNavigate } from 'react-router-dom'
// import './style/Login.css'

// const Login = () => {
//   const [aadharCardNumber, setaadharCardNumber] = useState('')
//   const [password, setPassword] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = async () => {
//     const success = await login(aadharCardNumber, password)
//     if (success) {
//       navigate('/profile')
//     } else {
//       setErrorMessage('Invalid aadharCardNumber or password')
//     }
//   }

//   return (
//     <div>
//       <h2 className="login">Login</h2>
//       <input
//         type="aadharCardNumber"
//         value={aadharCardNumber}
//         onChange={(e) => setaadharCardNumber(e.target.value)}
//         placeholder="aadharCardNumber"
//         className=''
//       />
//       {" "}
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   )
// }


// export default Login


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        { aadharCardNumber, password },
        { headers: { "Content-Type": "application/json" } }
      ); 

      console.log("Login successful:", response.data);

      // Store token & role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      console.log("User Role:", response.data.role);


      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);

        // Check if it's a network error
        if (error.response) {
          setError(error.response.data.message || "Invalid Aadhaar number or password.");
        } else {
          setError("Server is unreachable. Please try again later.");
        }
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      

      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Aadhaar Card Number"
          value={aadharCardNumber}
          onChange={(e) => setAadharCardNumber(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
  <a href="/ForgotPassword" className="text-blue-500 hover:underline">
    Forgot Password?
  </a>
</p>
      </form>
    </div>
    
  );
};

export default Login;
