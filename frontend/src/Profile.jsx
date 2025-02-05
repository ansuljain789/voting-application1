// import React, { useEffect, useState } from 'react'
// import { getUserProfile, logout } from './services/authService'
// import { useNavigate } from 'react-router-dom'

// const Profile = () => {
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userData = await getUserProfile()
//       if (!userData) {
//         navigate('/login')
//       } else {
//         setUser(userData)
//       }
//     }
//     fetchProfile()
//   }, [navigate])

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   if (!user) return <p>Loading...</p>

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Age: {user.age}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default Profile


import { useEffect, useState } from 'react';
import { getUserProfile, logout } from './services/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await getUserProfile();
      if (!userData) {
        navigate('/login');
      } else {
        setUser(userData);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Age:</span> {user.age}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Mobile:</span> {user.mobile}</p>
          <p className="text-gray-700"><span className="font-semibold">Address:</span> {user.address}</p>
          <p className="text-gray-700"><span className="font-semibold">Aadhar Card Number:</span> {user.aadharCardNumber}</p>
          <p className="text-gray-700"><span className="font-semibold">Role:</span> {user.role}</p>
          <p className="text-gray-700"><span className="font-semibold">Has Voted:</span> {user.isVoted ? 'Yes' : 'No'}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

