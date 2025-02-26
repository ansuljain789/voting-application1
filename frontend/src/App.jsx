// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { Route, Routes } from 'react-router-dom'
// import Login from './Login'
// import Profile from './Profile'
// import Dashboard from './Dashboard'

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/" element={<Login />} /> {/* Default route */}
//     </Routes>
//   )
// }

// export default App


// import { Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Profile from './Profile';
// import AdminDashboard from './AdminDashboard';
// import PrivateRoute from './privateRoute';

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/profile"
//         element={
//           <PrivateRoute>
//             <Profile />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute requiredRole="admin">
//             <AdminDashboard />
           
//           </PrivateRoute>
//         }
//       />
//       <Route path="/" element={<Login />} /> {/* Default route */}
//     </Routes>
//   );
// }

// export default App;

///04/feb/2025
// // App.jsx
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoute from "./ProtectedRoute";
// import Signup from "./pages/signup";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Signup />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default App;


import { Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import Signup from "./pages/signup";
import ResetPasswordFlow from "./pages/resetPassword";

const App = () => {
  return (
    <Routes>

<Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/resetPassword" element={<ResetPasswordFlow />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  );
};

export default App;
