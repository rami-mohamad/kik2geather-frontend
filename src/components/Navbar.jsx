import React, { useContext } from "react";
import { BsFillBarChartFill } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { IoIosPricetags } from "react-icons/io";
import { MdDashboard, MdLogout } from "react-icons/md";
import { TiInfoLargeOutline } from "react-icons/ti";
import { animateScroll as scroll, Link as LinkScroll } from "react-scroll";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import AuthContext from "../auth/authContext";

import Logo from "../assets/logo/NavbarLogo.svg";

function Navbar({ toggle }) {
  const toggleHome = () => scroll.scrollToTop();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkBase =
    "flex h-full cursor-pointer items-center px-3 text-white transition-colors hover:text-[#ffde4c]";
  const iconBase = "mr-2 text-[20px] relative -top-[1px]";
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center justify-center bg-gradient-to-b from-black via-[#424242] to-black">
      <div className="flex h-20 w-full max-w-[1100px] items-center justify-between px-6">
        <button
          type="button"
          onClick={toggleHome}
          className="relative -top-[10px] flex items-center px-[18px]"
          aria-label="Go to top"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-[150px] cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_8px_18px_rgba(250,191,47,0.45)]"
          />
        </button>

        <button
          type="button"
          onClick={toggle}
          className="
            hidden cursor-pointer text-white transition-colors
            hover:text-[#ffde4c]
            max-[760px]:block
            absolute right-[4%] top-[21%]
            -translate-x-full translate-y-[60%]
            -rotate-90
            text-[1.8rem]
          "
          aria-label="Open menu"
        >
          <BsFillBarChartFill />
        </button>

        <ul className="flex items-center text-center mr-[5%] max-md:hidden">
          <li className="h-20 px-[10px]">
            <LinkScroll
              to="home"
              smooth
              duration={500}
              spy
              offset={-80}
              className={navLinkBase}
              activeClass="border-b-[3px] border-[#ffde4c]"
            >
              <HiOutlineHome className={iconBase} />
              K2G
            </LinkScroll>
          </li>

          <li className="h-20 px-[10px]">
            <LinkScroll
              to="price"
              smooth
              duration={500}
              spy
              offset={-80}
              className={navLinkBase}
              activeClass="border-b-[3px] border-[#ffde4c]"
            >
              <IoIosPricetags className={iconBase} />
              Price
            </LinkScroll>
          </li>

          <li className="h-20 px-[10px]">
            <LinkScroll
              to="info"
              smooth
              duration={500}
              spy
              offset={-80}
              className={navLinkBase}
              activeClass="border-b-[3px] border-[#ffde4c]"
            >
              <TiInfoLargeOutline className={iconBase} />
              Info
            </LinkScroll>
          </li>

          {!isAuthenticated ? (
            <li className="ml-2">
              <LinkRouter
                to="/registration"
                className="
                  inline-flex items-center rounded-full
                  bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
                  px-2 py-0 transition-all duration-200
                  hover:bg-white hover:shadow-inner
                "
              >
                <span className="px-6 py-[10px] text-[16px] text-[#ffde4c] hover:text-black">
                  Sign In | Up
                </span>
              </LinkRouter>
            </li>
          ) : (
            <>
              <li className="h-20 px-[10px]">
                <LinkRouter
                  to="/dashboard"
                  className="flex h-full items-center px-3 text-white transition-colors hover:text-[#ffde4c]"
                >
                  <MdDashboard className={iconBase} />
                  Dashboard
                </LinkRouter>
              </li>

              <li className="ml-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    inline-flex items-center rounded-full
                    bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
                    px-4 py-[10px] text-[16px] text-[#ffde4c]
                    transition-all duration-200 hover:bg-white hover:text-black hover:shadow-inner
                  "
                >
                  <MdLogout className="mr-2 text-[18px]" />
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
