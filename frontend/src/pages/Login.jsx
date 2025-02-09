// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";



// function Login() {
//   const [aadharCardNumber, setAadharNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

// const handleLogin = async () => {
//   try {
//     const response = await axios.post("http://localhost:3000/user/login", {
//         aadharCardNumber,
//       password,
//     });

//     console.log("Login successful:", response.data);
//   } catch (error) {
//     console.error("Login failed:", error);
//   }
// };


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h2 className="text-2xl font-bold">Login</h2>
//       <form onSubmit={handleLogin} className="flex flex-col space-y-3">
//         <input
//           type="text"
//           placeholder="Aadhar Card Number"
//           className="border p-2"
//           value={aadharCardNumber}
//           onChange={(e) => setAadharNumber(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom"

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
        <Link to="/resetPassword" className="text-blue-500 hover:underline">
        Forgot Password?
         </Link>          
         </p>
         <p className="mt-4 text-sm">
              Dont have an account?{" "}
         <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
         </Link>
         </p>
      </form>
    </div>
    
  );
};

export default Login;
