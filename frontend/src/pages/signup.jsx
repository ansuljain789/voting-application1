import { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify"
// import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const[age,setAge]=useState("");
  const[email,setEmail]=useState("");
  const[mobile,setMobile]=useState("");
  const[address,setAddress]=useState("");
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter"); // Default role is "user"
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/signup", {
        name,
        age,
        email,
        mobile,
        address,
        aadharCardNumber,
        password,
        role
      });

      toast.success("signup successful",{
        position:"top-center",
        autoClose:3000,
      })
      // setTimeout(() => {
      //   navigate("/login")
        
      // }, 3000);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
       toast.error(err.response?.data?.message || "signupp error.Try again!",{
        position:"top-right",
        autoClose:3000,
       });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-3 w-80">
       <div>
       <label className="">Name: </label>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
       </div>

       <div>
       <label className="">Age: </label>
       <input
           type="text"
           placeholder="Age"
          className="border p-2 w-full"
          value={age}
          onChange={(e)=> setAge(e.target.value)}
          required   
        />
       </div>

       <div>
       <label className="">Email: </label>
       <input
         type="text"
         placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}      
        />
       </div>
       
          <div> 
          <label className="">Mobile: </label>
          <input
         type="text"
         placeholder="mobile"
         className="border p-2 w-full"
        value={mobile}
        onChange={(e)=>setMobile(e.target.value)}
        
        />
          </div>

          <div>
          <label className="">Address: </label>
          <input
         type="text"
         placeholder="address"
         className="border p-2 w-full"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        required
        
        />
          </div>

        <div>
        <label className="">Adhar: </label>
        <input
          type="text"
          placeholder="Aadhar Card Number"
          className="border p-2 w-full"
          value={aadharCardNumber}
          onChange={(e) => setAadharCardNumber(e.target.value)}
          required
        />
        </div>

        <div>
        <label className="">Password: </label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>

        <div>
        <label className="">Role: </label>
        <select
          className="border p-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
           >
          <option value="voter">voter</option>
          <option value="admin">Admin</option>
        </select>
        </div>
  

        <button type="submit" className="bg-green-500 text-white p-2 w-1xl">
          Signup
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
