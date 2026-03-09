import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo/NavbarLogo.svg";
import AuthContext from "../auth/authContext";
import { MdLogout } from "react-icons/md";

export default function NavbarHistory() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const buttonStyle = `
    inline-flex items-center
    rounded-full
    bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
    px-4 py-[8px]
    text-[15px] text-[#ffde4c]
    transition-all duration-200
    hover:bg-white hover:text-black hover:shadow-inner
  `;
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex h-20 items-center justify-center bg-gradient-to-b from-black via-[#424242] to-black">
      <div className="flex h-[50px] w-full max-w-[1100px] items-center justify-between px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="relative -top-[6px] flex items-center px-[18px]"
          aria-label="Go to home"
        >
          <img src={Logo} alt="Logo" className="w-[140px]" />
        </button>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Link to="/registration" className={buttonStyle}>
              Sign In | Up
            </Link>
          ) : (
            <>
              <Link to="/" className={buttonStyle}>
                Home
              </Link>

              <Link to="/booking" className={buttonStyle}>
                Book
              </Link>

              <button onClick={handleLogout} className={buttonStyle}>
                <MdLogout className="mr-1" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
