import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import {  useNavigate} from "react-router-dom";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault(); 
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    const url = "http://localhost:3000/signup";
    console.log(data);
    try {
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userid);
      navigate("/");
    } catch (err) {
      console.log(err, "error occurred");
    }
  };
  return (
    <div className="signup-container" id="login">
      <div className="login-box">
        <div className="right-side">
          <div className="login-form w-50">
            <form className='form-bg'>
              <h1 className='text-white text-center mb-3'>Sign Up</h1>
              <div className="input-group">
                <input type="text" className='form-control p-4' placeholder="First Name" required onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="input-group">
                <input type="text" className='form-control p-4' placeholder="Last Name" required  onChange={e => setLastName(e.target.value)}/>
              </div>
              <div className="input-group">
                <input type="email" className='form-control p-4' placeholder="Email" required onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <input type="password" className='form-control mt-2 p-4' placeholder="Password" required  onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-2 sign-in-btn" onClick={handleOnSubmit}>Continue</button>
              </div>
              <div className='mt-3'>
                <p className='text-center login-links-text ml-2 mt-3'>Already have an account? <span><Link to="/Login" className='login-links-signup' target="_blank">Sign In</Link></span></p>
                <br/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;