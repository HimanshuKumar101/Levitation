import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/authSlice';
import { loginUser } from '../../api/authApi';
import Navbar from '../common/Navbar'; // Reuse the Navbar component
import { useNavigate } from 'react-router-dom';
import image from '../../assets/frame.jpeg';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Call loginUser which now returns user and token
    const { user, token } = await loginUser({ email, password });
    
    // Dispatch login success with user and token
    dispatch(loginSuccess({ user, token }));

    // Save the token in localStorage for later use
    localStorage.setItem('userToken', token); 

    setError(null); 
    navigate('/add-product'); // Navigate after successful login
  } catch (err) {
    setError('Failed to log in. Please check your credentials.');
  }
};


  return (
    <div className="w-full min-h-screen bg-[#141414]"> {/* Full viewport height */}
      {/* Navbar */}
      <Navbar isLoggedIn={false} isLoginPage={true} /> {/* Pass isLoginPage prop */}
      
      {/* Main Content Area */}
      <div className="flex flex-row justify-between items-start mt-[350px] mb-[50px] min-h-screen"> {/* Similar to Register page */}
        
        {/* Left Side Image */}
        <div className="w-[523px] h-auto bg-[#2F2F2F] rounded-[70px] ml-[79.5px]">
          <img
            src={image}
            alt="Left Image"
            className="w-full h-full object-cover rounded-[70px]"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-[565px] mt-[100px] mr-[120px] gap-32px">
          <h2 className="text-white font-bold text-3xl">Login to continue your journey</h2>
          <p className="text-gray-400 mt-2">
            This is a basic login page which is used for levitation assignment purpose.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="text-white">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                placeholder="Enter Email ID"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This email will be displayed with your inquiry.
              </p>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="text-white">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                placeholder="Enter Password"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Any further updates will be forwarded on this Email ID.
              </p>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button and Forgot Password */}
            <div className="flex justify-between items-center w-[298.83px] h-[48.87px]">
              {/* Login Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-[#141414] to-[#303030] text-[#CCF575] font-semibold w-[114.83px] h-[48.87px] rounded-lg"
              >
                Login Now
              </button>

              {/* Forgot Password Link */}
              <p className="text-gray-400">
                <a href="/register" className="text-[#B8B8B8]">
                  Forget password?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

