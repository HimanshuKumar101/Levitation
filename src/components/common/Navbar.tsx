
import React from 'react';

// Navbar.tsx
interface NavbarProps {
  isLoggedIn: boolean;  
  isLoginPage: boolean; 
  onLogout?: () => void; // Make onLogout optional
}

// Rest of the Navbar component remains unchanged

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, isLoginPage, onLogout }) => {
  return (
    <div className="w-full h-[64.1px] fixed top-0 bg-[#1F1F1F] border-b-[1px] border-[#2C2C2C7D] shadow-[2px_4px_4px_0px_#0000001F] backdrop-blur-lg flex justify-between items-center px-8">
      {/* Left side (Logo and Text) */}
      <div className="flex items-center gap-[10px]">
        {/* SVG Logo */}
        <svg
          width="39"
          height="39"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[39px] h-[39px]"
        >
          <path
            d="M39.5 20L30 39.5H25.5H10.3038L6.03038 31L0.5 20L10 0.5H14.5H30L34.141 9L39.5 20Z"
            fill="white"
          />
          <path
            d="M25.5 31L31 20L25.5 9L34.5 20L25.5 31Z"
            fill="black"
          />
          <path
            d="M13 11L14.5 9L9 20L14.5 31L6 20L13 11Z"
            fill="black"
          />
        </svg>

        {/* Company Name */}
        <div>
          <h1 className="text-white font-['Canva_Sans'] text-[20px] leading-[32px]">
            Levitation
          </h1>
          <p className="text-white font-['Canva_Sans'] text-[10px] leading-[16px]">
            Infotech
          </p>
        </div>
      </div>

      {/* Conditional Rendering Based on the Current Page */}
      {isLoginPage ? (
        <div className="flex justify-center mt-[5px]">
          <div className="w-auto px-[16px] py-[12px] border border-gradient-to-r from-[#292C20] to-[#CCF575] rounded-tl-lg">
            <span className="text-[#CCF575] font-['Pretendard'] text-[14px] leading-[16.71px]">
              Connecting People With Technology
            </span>
          </div>
        </div>
      ) : (
        // Right side (Login/Logout button)
        <button 
          className="flex items-center gap-2 bg-gradient-to-r from-[#292C20] to-[#CCF575] text-black font-['Pretendard'] text-[14px] font-semibold leading-[16.71px] py-[12px] px-[16px] rounded-lg"
          onClick={onLogout} // Call onLogout on click
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      )}
    </div>
  );
};

export default Navbar;

