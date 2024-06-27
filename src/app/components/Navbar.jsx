"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const router = useRouter();
  const isAdmin = Cookies.get("isV1User");
  const authToken = Cookies.get("token2");
  const UserToken = Cookies.get('tokenRateme')
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let decoded = null
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (UserToken){
    decoded = jwtDecode(UserToken);
    console.log(decoded)
  }

  // Close the dropdown if clicked outside
 
  const Logout = () => {
    Cookies.remove("tokenRateme");
    setDropdownVisible(false)
    router.push("/");

    setTimeout(() => {
      setActiveLink(window.location.pathname);
    }, 500);
  };

  const navLink = [
    // {
    //   id: 0,
    //   header: "Home",
    //   link: "/",
    // },
    // {
    //   id: 1,
    //   header: "Courses",
    //   link: "/courses",
    // },
    // ...(!isAdmin
    //   ? [
    //       {
    //         id: 2,
    //         header: "About",
    //         link: "/about",
    //       },
    //     ]
    //   : []),
    // ...(!isAdmin
    //   ? [
    //       {
    //         id: 3,
    //         header: "Contact",
    //         link: "/contact",
    //       },
    //     ]
    //   : []),
    // ...(isAdmin
    //   ? [
    //       {
    //         id: 4,
    //         header: "Students",
    //         link: "/admin/students",
    //       },
    //     ]
    //   : []),
    // ...(!isAdmin && authToken
    //   ? [
    //       {
    //         id: 3,
    //         header: "MyCourses",
    //         link: "/myCourses",
    //       },
    //     ]
    //   : []),
  ];
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // Check session storage for active link

    setActiveLink(window.location.pathname);

    // if (typeof window !== "undefined") {
    //   const isDarkMode = localStorage.getItem("theme") === "dark";
    //   setDarkMode(isDarkMode);
    //   if (isDarkMode) {
    //     document.documentElement.classList.add("dark");
    //   } else {
    //     document.documentElement.classList.remove("dark");
    //   }
    // }
  }, [activeLink]);

  // const toggleTheme = () => {
  //   const newMode = !darkMode;
  //   setDarkMode(newMode);
  //   localStorage.setItem("theme", newMode ? "dark" : "light");
  //   document.documentElement.classList.toggle("dark");
  // };

  const handleClick = () => {
    setTimeout(() => {
      setActiveLink(window.location.pathname);
    }, 400);
    if (window.innerWidth <= 768) {
      setToggle(false);
    }
  };

  // const handleMenuToggle = () => {
  //   setToggle((prevToggle) => !prevToggle);
  // };

  // const closeMenu = () => {
  //   setToggle(false);
  // };

  // const logOut = () => {
  //   Cookies.remove("token");
  // };

  return (
    <div className="sticky top-0 bg-gray-100  z-[200]">
      <div className="flex justify-between align-center text-lg sm:text-2xl mx-auto p-4">
        {/* <a
          href="https://www.effilearn.in/"
          className="flex items-center space-x-1 rtl:space-x-reverse"
        >
          <img
            src={`${darkMode ? "/logo_darkmode.png" : "/lightLogo.png"}`}
            className="h-12 w-36 md:h-20 md:w-60"
            alt="Effilearn logo"
          />
        </a> */}
        <h1 className="font-bold text-xl mt-3">Rate me</h1>

        {/* <div className="hidden md:flex self-center z-[200] items-center">
          <div className="flex gap-x-8 lg:gap-x-20 self-center text-lg xl:text-xl font-montserrat font-bold dark:font-medium dark:text-gray-100 text-gray-800">
            {navLink.map((link) => (
              <Link key={link.id} href={link.link}>
                <div
                  className={`${
                    activeLink === link.link
                      ? "text-[#AF3CA3] dark:text-[#DD576D]"
                      : ""
                  }`}
                  onClick={() => handleClick()}
                >
                  {link.header}
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        <div className="flex gap-x-2 sm:gap-x-4 self-center">
          {/* <button onClick={toggleTheme} className="md:mx-10" type="button">
            {darkMode ? (
              <img height="30" width="30" src="/brightness.png" />
            ) : (
              <img height="30" width="30" src="/night-mode.png" />
            )}
          </button> */}
          
          {!UserToken ? (
                      <Link href="/login">
                      <button
                        type="button"
                        className=" z-50 dark:text-white hover:text-white text-black bg-white border border-[#DD576E] hover:bg-[#DD576E] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#DD576E] dark:hover:bg-[#DD576D] dark:focus:ring-[#DD576D] dark:border-[#DD576D] dark:hover:scale-105"
                      >
                        Login
                      </button>
                    </Link>
            
          ) : (
              <>
              <img
            src={decoded.photo}
            width={40}
            height={40}
          
            className="rounded-full cursor-pointer"
            onClick={toggleDropdown}
            alt="User Avatar"
          />
          <div className="-mr-2 flex  relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex items-center justify-center p-1 rounded-lg text-white hover:ring-white focus:outline-none focus:ring-2 focus:rig-offset-2 focus:ring-offset-white focus:ring-white focus:rig-offset-2 z-[250] "
            >
              <span className="sr-only">Open main menu</span>
              {dropdownVisible ? (
                <img className="h-8 w-8" src="/close1.svg" alt="" />
              ) : (
                <img 
          
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ic_arrow_drop_down_36px.svg/1200px-Ic_arrow_drop_down_36px.svg.png" className="w-8 h-8"/>
              )}
            </button>
          </div>
          </>
            

            // <button
            //   onClick={handleReload}
            //   type="button"
            //   className=" z-50 dark:text-white hover:text-white text-black bg-white border border-[#DD576E] hover:bg-[#DD576E] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#DD576E] dark:hover:bg-[#DD576D] dark:focus:ring-[#DD576D] dark:border-[#DD576D] dark:hover:scale-105"
            // >
            //   LogOut
            // </button>
          )}
        </div>
        {dropdownVisible && (
        <div  className="absolute right-3 md:mt-20 mt-14 w-48 bg-white shadow-lg rounded-md py-2">
                    <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg">
            Home
          </a>
          <a href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg">
            Your Campaigns
          </a>
          <a href="/create-campaign" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg">
            Create Campaign
          </a>
          <a onClick={Logout} type="button" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-lg hover:cursor-pointer">
            Logout
          </a>
        </div>
      )}
      </div>

      {/* Mobile Nav Changes In Weight for Responsive */}
      {toggle && (
        <div className="fixed md:hidden  left-0  w-full h-full   dark:bg-opacity-10 bg-opacity-20 dark:bg-white bg-gray-300 backdrop-filter dark:backdrop-blur-lg  backdrop-blur-md  z-[200]">
          <div className="flex flex-col px-4 py-6 space-y-4 mt-10">
            {navLink.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                onClick={() => handleClick(link.link)}
              >
                <div
                  className={`${
                    activeLink === link.link
                      ? "bg-[#AF3CA3] dark:bg-[#DD576D] text-gray-200 dark:text-black"
                      : ""
                  } text-center cursor-pointer dark:text-gray-200 font-bold  block px-3 py-2 rounded-md   md:p-0    md:bg-transparent   self-center text-lg  font-montserrat  `}
                >
                  {link.header}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;