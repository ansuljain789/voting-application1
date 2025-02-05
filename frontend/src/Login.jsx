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

 import  { useState } from 'react'
import { login } from './services/authService'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [aadharCardNumber, setaadharCardNumber] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(aadharCardNumber, password)
    if (success) {
      navigate('/profile')
    } else {
      setErrorMessage('Invalid aadharcardNumber or password')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <input
        type="text"
        value={aadharCardNumber}
        onChange={(e) => setaadharCardNumber(e.target.value)}
        placeholder="aadharCardNumber"
            className="w-full p-3 border rounded-lg mb-4"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
      />
      <button onClick={handleLogin} className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600'>Login</button>
      {errorMessage && <p className="text-red-500 text-center mt-3">{errorMessage}</p>}
    </div>
    </div>
  )
}

export default Login
