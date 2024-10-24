

import React, { useState } from 'react';
import Navbar from '../common/Navbar'; // Import Navbar
import { registerUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/frame.jpeg";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setError(null);
      navigate('/login'); // Navigate to login after successful registration
    } catch (err) {
      setError('Failed to register. Please check your details.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#141414]"> {/* Ensure min-h-screen for full height */}
      {/* Navbar */}
      <Navbar isLoggedIn={false} isLoginPage={false} /> {/* Pass isLoginPage prop as false */}
      
      {/* Main content area */}
      <div className="flex flex-row justify-between items-start mt-[350px] mb-[50px] min-h-screen"> {/* Use min-h-screen */}
        
        {/* Left Side Image */}
        <div className="w-[523px] h-auto bg-[#2F2F2F] rounded-[70px] ml-[79.5px]">
          <img
            src={image}
            alt="Left Image"
            className="w-full h-full object-cover rounded-[70px]"
          />
        </div>

        {/* Registration Form */}
        <div className="w-[565px] mt-[100px] mr-[120px] gap-32px">
          <h2 className="text-white font-bold text-3xl">Sign up to begin your journey</h2>
          <p className="text-gray-400 mt-2">
            This is a basic signup page which is used for levitation assignment purpose.
          </p>

          <form onSubmit={handleRegister} className="mt-8">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="text-white">Enter your name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg"
                placeholder="Enter your name"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This name will be displayed with your inquiry.
              </p>
            </div>

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

            {/* Register Button and Already have account? */}
            <div className="flex justify-between items-center w-[298.83px] h-[48.87px]">
              {/* Register Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-[#141414] to-[#303030] text-[#CCF575] font-semibold w-[100.83px] h-[48.87px] rounded-lg"
              >
                Register
              </button>

              {/* Already have account? */}
              <p className="text-gray-400">
                <a href="/login" className="text-[#B8B8B8]">
                  Already have an account?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
