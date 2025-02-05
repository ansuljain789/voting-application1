// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children,requiredRole }) => {
//   const token = localStorage.getItem('authToken');
//   const userRole = localStorage.getItem('userRole');

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default PrivateRoute;
