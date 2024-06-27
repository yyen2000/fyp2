import React from "react";

const Footer = () => {
  return (
    <footer className="w-auto p-2 flex justify-center flex-col">
      <div className="flex flex-col md:flex-row justify-around items-center w-auto p-8">
        <h1 className="text-gray-600 font-semibold text-center text-xs">
          &copy; 2024 All rights reserved | Built with FCSIT
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
