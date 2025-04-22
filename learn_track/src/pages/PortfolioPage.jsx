import React from "react";
import img from "../assets/img.jpg"
export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Adeline Palmerston</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Photo</a>
          <a href="#" className="hover:underline">About Me</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2  text-white">
        {/* Image Section */}
        <div className="flex justify-center items-center p-8  text-white">
          <img src={img} alt="Green Products" className="rounded-lg shadow-xl w-[80%]" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-10 bg-gray-900 text-white bg-black">
          <h2 className="text-5xl font-bold mb-4">My <br /> Portfolio</h2>
          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </p>
          
          <div className="flex items-center space-x-4">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition">Explore Now</button>
            <button className="flex items-center space-x-2 text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Video</span>
            </button>
          </div>
          <div className="text-sm text-gray-400 mt-6">Page | 01</div>
        </div>
      </div>
    </div>
  );
}
