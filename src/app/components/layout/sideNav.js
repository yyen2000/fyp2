'use client';

import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiDashboardFill } from 'react-icons/ri';
import { GoGraph } from 'react-icons/go';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import '../../globals.css';

const SideNav = () => {
  const [isCollapsedSideBar, setIsCollapsedSideBar] = useState(false);

  const toggleSidebarCollapseHandler = () => {
    setIsCollapsedSideBar((prev) => !prev);
  };

  useEffect(() => {
    if (isCollapsedSideBar) {
      document.body.classList.add('nav-collapsed');
      document.body.classList.remove('nav-expanded');
    } else {
      document.body.classList.add('nav-expanded');
      document.body.classList.remove('nav-collapsed');
    }
  }, [isCollapsedSideBar]);

  return (
    <nav className={`flex flex-col bg-teal-700 text-white ${isCollapsedSideBar ? 'w-14' : 'w-60'} transition-width duration-300 ease-in-out`}>
      <div className="p-4 flex items-center">
        <button className="text-white" onClick={toggleSidebarCollapseHandler}>
          <GiHamburgerMenu size={24} />
        </button>
        <div className={`text-2xl font-bold ml-4 transition-opacity duration-300 ease-in-out ${isCollapsedSideBar ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.3s' }}>
          FYPBot
        </div>
      </div>
      <aside className={`flex flex-col mt-6 ${isCollapsedSideBar ? 'items-center' : 'items-start'} p-4 overflow-y-auto`}>
        <div className="flex flex-col space-y-12 mb-10">
          <Link href="/home/homepage" className="link-hover flex items-center space-x-2 transition-colors duration-300 hover:text-teal-300">
            <RiDashboardFill size={24} />
            {!isCollapsedSideBar && <span>Home</span>}
          </Link>
          <Link href="/home/trendingtopic" className="link-hover flex items-center space-x-2 transition-colors duration-300 hover:text-teal-300">
            <GoGraph size={24} />
            {!isCollapsedSideBar && <span>Trending</span>}
          </Link>
          <Link href="/home/pastfyptopics" className="link-hover flex items-center space-x-2 transition-colors duration-300 hover:text-teal-300">
            <IoCalendarClearOutline size={24} />
            {!isCollapsedSideBar && <span>Past FYP Topics</span>}
          </Link>
        </div>
        <div className="user_profile mt-60 bg-gradient-to-r from-teal-400 via-gray to-teal-600 px-14 py-5 rounded-3xl">
        <Link href="/home/profile" className="link-hover flex items-center space-x-2 transition-colors duration-300 hover:text-teal-300">
          <FaUser size={24} />
        {!isCollapsedSideBar && <span>Profile</span>}
        </Link>
        </div>
      </aside>
    </nav>
  );
};

export default SideNav;
