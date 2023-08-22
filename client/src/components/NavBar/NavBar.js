import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // <-- Import useDispatch
import { Link, useNavigate } from "react-router-dom"; // <-- Import useNavigate
import { logout } from "../../redux/slices/authSlice"; // <-- Import the logout action
import logoImage from "../../assets/images/logo.png";
import "./NavBar.css";

function NavBar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // <-- Use the useDispatch hook
  const navigate = useNavigate(); // <-- Use the useNavigate hook
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // <-- Logout function
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownVisible(false);
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          {/* <img src={logoImage} alt="Logo" /> */}
          <h2>Logo</h2>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/how-to">How to</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {auth.isAuthenticated ? (
          <li onClick={toggleDropdown}>
            <div className="user-icon">🔵</div>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <a href="/" onClick={handleLogout}>
                    Logout
                  </a>{" "}
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

// ---------------------------------------

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "./NavBar.css";

// function NavBar() {
//   const auth = useSelector((state) => state.auth);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = (e) => {
//     e.stopPropagation();
//     setDropdownVisible(!dropdownVisible);
//   };

//   useEffect(() => {
//     const closeDropdown = () => {
//       setDropdownVisible(false);
//     };

//     document.addEventListener("click", closeDropdown);

//     return () => {
//       document.removeEventListener("click", closeDropdown);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">Logo</Link>
//       </div>
//       <ul className="navbar-links">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/how-to">How to</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//         {auth.isAuthenticated ? (
//           <li onClick={toggleDropdown}>
//             <div className="user-icon">🔵</div>
//             {dropdownVisible && (
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li>
//                   <Link to="/settings">Settings</Link>
//                 </li>
//                 <li>
//                   <Link to="/logout">Logout</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
