import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        setProfile(response.data); // Store profile data
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        setError("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {error && <p className="text-red-500">{error}</p>}
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-80">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Aadhaar:</strong> {profile.aadharCardNumber}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
