import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [candidates,setcandidates] =useState([])
  const [selectedCandidate,setSelectedcandidate]=useState("");
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

    ///fetch the details of candidate
      const fetchCandidate= async () =>{
       try{
        const resp = await axios.get("http://localhost:3000/candidate/");
        // console.log("API Response:", resp.data);
        setcandidates(resp.data)
       }
        catch(error){
          console.error("error fetching the candidate:",error.resp?.data || error.message);
          
        }
      }

    fetchProfile();
    fetchCandidate();

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role

    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000, // Closes after 2 seconds
    });
    // navigate("/login"); // Redirect to login page
    setTimeout(() => {
      navigate("/login"); // Redirect to login after the toast disappears
    }, 2000);
  };
///handle vote
  // const handleVote = async () => {
  //   setMessage("");
  //   setError("");
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   const candidate = candidates.find((c) => c.name.toLowerCase() === selectedCAndidate.toLowerCase());
  //   if (!candidate) {
  //     setError("Candidate not found. Please enter a valid name.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3000/user/vote/${candidate._id}`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setMessage(response.data.message);

  //   } catch (error) {
  //     setError(error.response?.data.message || "Failed to vote.");
  //   }
  // };
  const handleVote = async () => {
    if (!selectedCandidate) {
      setError("Please enter a candidate name.");
      return;
    }
  
    if (!Array.isArray(candidates)) {
      console.error("Candidates is not an array:", candidates);
      setError("Candidates data is not available.");
      return;
    }
  
    const candidate = candidates.find((c) => c.name.toLowerCase() === selectedCandidate.toLowerCase());
    if (!candidate) {
      setError("Candidate not found. Please enter a valid name.");
      console.log(candidate);
      
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      // console.log("Sending Vote Request:", {
      //   url: `http://localhost:3000/user/vote/${candidate._id}`,
      //   headers: { Authorization: `Bearer ${token}` }
      // });
  
      const response = await axios.post(
        `http://localhost:3000/user/vote/${candidate._id}`,
        {},  // Ensure backend accepts empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert("Vote recorded successfully!");
      console.log("voted succwssfully");
      
    } catch (error) {
      console.error("Error voting:", error.response?.data || error.message);
      setError(error.response?.data?.message || "An error occurred while voting.");
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {error && <p className="text-red-500">{error}</p>}
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-80">
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Age:  </strong> {profile.age}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Adress:</strong> {profile.address}</p>
          <p><strong>Aadhaar:</strong> {profile.aadharCardNumber}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}


      {/* voting Section */}
      <div className="mt-6 w-80">
        <h3 className="text-xl font-semibold">Vote for a Candidate</h3>
        <input
          type="text"
          placeholder="Enter candidate name"
          className="mt-2 w-full p-2 border rounded"
          value={selectedCandidate}
          onChange={(e) => setSelectedcandidate(e.target.value)}
        />
        <button
          onClick={handleVote}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Vote
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Profile;