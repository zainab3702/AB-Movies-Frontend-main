import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaFilm, FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GrDevice } from "react-icons/gr";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
const Navbar = () => {
  const { auth } = useAuth();
  const Logout = useLogout();
  // to get the user details and profileImage

  // function to get the current path and update the active navbar icon  color accorindgly
  const { pathname } = useLocation();
  let location = pathname?.split("/")[1]; // get's current pathname
  const classes = (here) => {
    let classname = "";
    if (!location || location === "register") location = "home";
    if (here === location) {
      classname += "text-white"; // if pathanme is current path then applies active color
    } else {
      classname += "text-app-icons opacity-70"; // else applies !active color
    }

    return classname;
  };

  const userImage = localStorage.getItem(`profileImage${auth.email}`) || null;

  // state to implement profile popup
  const [toggleProfile, setToggleProfile] = useState(false);

  return (
    <nav className="fixed left-0 top-0  z-50  w-full md:left-10 md:top-3 lg:left-8 lg:top-12 lg:max-w-20">
      <div className=" flex h-24  items-center justify-between bg-app-light p-4  md:w-11/12 md:rounded-lg  lg:mx-6 lg:h-[80vh]  lg:w-24 lg:flex-col lg:items-center">
        <img src="/logo.svg" alt="logo" />
        <div className="flex gap-4 md:gap-8 lg:flex-col">
          {/* Navigations */}

          {/* Link to Home */}
          <NavLink to="/">
            <button className={classes("home")}>
              <FaHome className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </NavLink>

          {/* Link to Movies */}

          <NavLink to="/movies">
            <button className={classes("movies")}>
              <FaFilm className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </NavLink>

          {/* Link to TvShows */}

          <NavLink to="/tvshows">
            <button className={classes("tvshows")}>
              <GrDevice className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </NavLink>

          {/* Link to Watchlist */}
          <NavLink to="/bookmarks">
            <button className={classes("bookmarks")}>
              <FaBookmark className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </NavLink>
        </div>

        {/* user profile */}

        <div onClick={() => setToggleProfile(!toggleProfile)}>
          {userImage ? (
            <div className="size-10 -translate-y-[10%] cursor-pointer rounded-full border-2 border-gray-600 md:size-12 lg:translate-y-0">
              <img
                src={userImage}
                alt="profilePic"
                className="size-full rounded-full object-cover"
              />
            </div>
          ) : (
            <CgProfile className="size-10 -translate-y-[10%] cursor-pointer opacity-70 md:size-11 lg:translate-y-0" />
          )}
        </div>
      </div>
      {toggleProfile && (
        <div
          className={
            " flex w-full items-center  justify-around border-t-2 border-t-app-icons  bg-app-light p-4 md:ml-16 md:mt-1 md:w-3/4  md:rounded-2xl md:border-t-0 lg:absolute lg:-bottom-[5.5rem] lg:-left-12 lg:h-fit lg:w-80 lg:rounded-2xl"
          }
        >
          <div className="flex flex-col">
            <p className="text-gray-500">You are logged in as : </p>
            <p className="text-sky-500">{auth.email}</p>
          </div>
          <button className="w-20 rounded-lg bg-red-500 p-2" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
