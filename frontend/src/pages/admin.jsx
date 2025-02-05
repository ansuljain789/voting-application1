import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [candidate, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age,setAge]= useState(0)
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voteCounts, setVoteCounts] = useState([]);
 
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login"); // Redirect non-admin users
    }
    fetchCandidates();
    fetchVoteCounts();
  }, [navigate]);

  //for Autherization
const token = localStorage.getItem("token"); // Get token from localStorage
const headers = {
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  },
};

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/candidate/",headers);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to fetch candidates.");
    }
  };

  // Add a new candidate
  const addCandidate = async (e) => {
    e.preventDefault();
    if (!name || !party || !age) return;
     console.log(name);
     console.log(party);
     console.log(age);

     
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/candidate/", { name, party ,age },headers);
      setName("");
      setParty("");
      setAge(0)
      fetchCandidates(); // Refresh list
    } catch (error) {
      console.error("Error adding candidate:", error);
      setError("Failed to add candidate.");
    } finally {
      setLoading(false);
    }
  };

  // Update candidate
  const updateCandidate = async (id) => {
    if (!name || !party || !age) return;
    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/candidate/${id}`, { name, party ,age},headers);
      setEditingId(null);
      fetchCandidates(); // Refresh list
    } catch (error) {
      console.error("Error updating candidate:", error);
      setError("Failed to update candidate.");
    } finally {
      setLoading(false);
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/candidate/${id}`,headers);
      fetchCandidates(); // Refresh list
    } catch (error) {
      console.error("Error deleting candidate:", error);
      setError("Failed to delete candidate.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("role"); // Remove role
    navigate("/login"); // Redirect to login
  };

  //fetchVoteCount
  const fetchVoteCounts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/candidate/", headers);
      setVoteCounts(response.data);
    } catch (error) {
      console.error("Error fetching vote counts:", error);
      setError("Failed to fetch vote counts.");
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}


    

      {/* Add Candidate Form */}
      <form onSubmit={addCandidate} className="bg-white p-6 rounded shadow-md w-80 mb-4">
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Party Name"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type=""
          placeholder="AGe"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Candidate"}
        </button>
      </form>



      {/* total no of vote of all candidate */}
      <div className="bg-white p-6 rounded shadow-md mb-4">
        <h3 className="text-xl font-semibold mb-2">Vote Counts</h3>
        <table className="table-auto w-full">
          <thead>
            <tr>
            <th className="px-4 py-2">candidaate Name</th>
            <th className="px-4 py-2">Party</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Votes</th>

            </tr>
          </thead>
          <tbody>
            {voteCounts.map((vote, index) => (
              <tr key={index} className="border-t">
                 <td className="px-4 py-2">{vote.name}</td>
                <td className="px-4 py-2">{vote.party}</td>
                <td className="px-4 py-2">{vote.age}</td>
                <td className="px-4 py-2">{vote.count}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
     


      {/* Candidate List */}
      <table className="table-auto bg-white p-4 rounded shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Party</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidate.map((candidate) => (
            <tr key={candidate._id} className="border-t">
              <td className="px-4 py-2">
                {editingId === candidate._id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  candidate.name
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === candidate._id ? (
                  <input
                    type="text"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  candidate.party
                )}
              </td>

              <td className="px-4 py-2">
                {editingId === candidate._id ? (
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  candidate.age
                )}
              </td>

              <td className="px-4 py-2">
                {editingId === candidate._id ? (
                  <button
                    onClick={() => updateCandidate(candidate._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(candidate._id);
                      setName(candidate.name);
                      setParty(candidate.party);
                      setAge(candidate.age)
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteCandidate(candidate._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>



    </div>
  );
};

export default Admin;
