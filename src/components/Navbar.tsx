'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-md text-white p-4 flex justify-around items-center sticky top-0 z-10">
      <div className="flex items-center gap-10 ">
        <div className="text-2xl font-bold mr-20">GB</div>
        <ul className="hidden md:flex space-x-4 ml-6 gap-10">
          <li onClick={() => router.push('/')}>Home</li>
          <li className="relative group">
            <span>Games</span>
            <ul className="absolute hidden group-hover:block bg-black  backdrop-blur-3xl text-white mt-2 rounded-md shadow-lg">
              <li className="p-5 w-[8vw] hover:bg-gray-700 cursor-pointer">Game 1</li>
              <li className="p-5 hover:bg-gray-700 cursor-pointer">Game 2</li>
            </ul>
          </li>
          <li onClick={() => router.push('/giveaways')}>Giveaways</li>
          <li onClick={() => router.push('/contact')}>Contact</li>
        </ul>
      </div>
      <div className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="search user"
          className="bg-gray-800 text-white border border-gray-600 rounded-3xl px-4 py-2 mr-4"
        />
        <button className=" text-white font-bold py-2 px-4 rounded hover:underline">
          Login
        </button>
      </div>
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <span className="material-icons">
          <Menu className="h-6 w-6" />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;