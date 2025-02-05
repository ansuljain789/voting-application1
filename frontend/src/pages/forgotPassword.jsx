// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ForgotPassword = () => {
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleResetPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setLoading(true);

//         try {
//             const token = localStorage.getItem("token"); // Get user token
//             const response = await axios.put(
//                 "http://localhost:3000/profile/password",
//                 { currentPassword, newPassword },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`, // Send JWT token
//                     },
//                 }
//             );

//             setSuccess("Password updated successfully! Please login again.");
//             setTimeout(() => {
//                 localStorage.removeItem("token"); // Clear old session
//                 localStorage.removeItem("role");
//                 navigate("/login"); // Redirect to login page
//             }, 2000);
//         } catch (error) {
//             console.error("Password reset failed:", error.response?.data || error.message);
//             setError(error.response?.data.error || "Something went wrong. Try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <form onSubmit={handleResetPassword} className="bg-white p-6 rounded shadow-md w-80">
//                 <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
//                 {error && <p className="text-red-500 mb-2">{error}</p>}
//                 {success && <p className="text-green-500 mb-2">{success}</p>}
                
//                 <input
//                     type="password"
//                     placeholder="Current Password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     required
//                     className="w-full p-2 border rounded mb-2"
//                 />
                
//                 <input
//                     type="password"
//                     placeholder="New Password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                     className="w-full p-2 border rounded mb-2"
//                 />
                
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white p-2 rounded"
//                     disabled={loading}
//                 >
//                     {loading ? "Updating..." : "Update Password"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ForgotPassword;
