import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg";
import Logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import Logout from "../auth/Logout";
import Portal from "../../modal/Portal";
import SearchModal from "../../modal/SearchModal";

function Header() {
  const location = useLocation();
  const { auth } = useAuth();

  const [showModal, setShowModal] = useState(false);
  return (
    <header>
      <nav className="container">
        {/* <!-- Logo --> */}
        <div>
          <Link to="/">
            {/*<img className="w-32" src={Logo} alt="lws" />*/}
          <p className="text-xl font-bold text-gray-200">My Blog</p>
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search -->
                <!-- Notes for Developers -->
                <!-- For Logged in User - Write, Profile, Logout Menu -->
                <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            <li>
              {/*<Link
                to="./search.html"
                className="flex items-center gap-2 cursor-pointer"
              >*/}
              <button className="flex items-center gap-2 cursor-pointer" onClick={() => setShowModal(true)}>
                <img src={SearchIcon} alt="Search" />
                <span>Search</span>
              </button>
              {/*</Link>*/}
            </li>
            <li>
              {auth.authToken ? (
                <Logout />
              ) : (
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              )}
            </li>
            {auth.user && (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">{auth.user.firstName[0]}</span>
                  {/* User's first name initial */}
                </div>

                {/* Logged-in user's name */}

                <Link to={`./profile/${auth.user.id}`}>
                  <span className="text-white ml-2">
                    {auth.user.firstName} {auth.user.lastName}
                  </span>
                </Link>

                {/* Profile Image */}
              </li>
            )}
          </ul>
        </div>
      </nav>

      {showModal && <Portal>
              <SearchModal onClose={() => setShowModal(false)} />
            </Portal>}
    </header>
  );
}

export default Header;
