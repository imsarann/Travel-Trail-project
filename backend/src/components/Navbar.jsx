import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="logo-containers">
      <img src={logo} width={'100'} height={"65"} alt="" />
      </div>
      <ul className={`navbar-collections ${menuOpen ? 'open' : ''}`} id="mobBar">
        <li className="items">
          <NavLink to="/" className="text-modify" aria-current="page">Home</NavLink>
        </li>
        <li className="items">
           <NavLink to="/destination" className="text-modify">Destination</NavLink>    
        </li>
        <li className="items">
           <NavLink to="/Hotels" className="text-modify">Hotels</NavLink>    
        </li>
        {/* <li className="items">
           <NavLink to="/ai" className="text-modify">AI</NavLink>
        </li>
        <li className="items">
           <NavLink to="/about" className="text-modify">About</NavLink>
        </li> */}
        

        <li className='items'>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x close-icon"
        viewBox="0 0 16 16"
        id="close"
        onClick={toggleMenu}
        style={{ display: menuOpen ? 'block' : 'none' }}
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
        />
      </svg>
        </li>
      </ul>
     <div className='hide'>
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-list menu-icon"
        viewBox="0 0 16 16"
        id="menu"
        onClick={toggleMenu}
        style={{ display: menuOpen ? 'none' : 'block' }}
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
      </div>
      <div>
        <NavLink to="/login" className="text-modify pr-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle login-icon" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></NavLink>
      </div>
    </div>
  );
};

export default Navbar;
