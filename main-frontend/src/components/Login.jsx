import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
  return (
    <div className="login-container" id="login">
      <div className="login-box shadow-100">
        <div className="right-side">
          <div className="login-form w-50">
            <form className='form-bg'>
              <h1 className='text-white text-center mb-3'>Sign In</h1>
              <div className="input-group">
                <input type="email" className='form-control p-4' placeholder="Email" required onChange={ e =>{
                    setEmail(e.target.value)
                }} />
              </div>
              <div className="input-group">
                <input type="password" className='form-control mt-2 p-4' placeholder="Password" required onChange={e=>{
                    setPassword(e.target.value)
                }} />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-2 sign-in-btn"  onClick={async(e) =>{
                    e.preventDefault();
                    const url = "http://localhost:3000/signin";
                    const data = {
                        email,
                        password
                    }
                    console.log("Signnnn innnnnnnnnnnnnnn",data)
                    try{
                        const response = await axios.post(url, data)
                        console.log("After backennnddd",response.data)
                        localStorage.setItem("token", response.data.token)
                        console.log("email after", response.data.userid)
                        localStorage.setItem("userid", response.data.userid)
                        navigate("/")
                    }catch(e){
                        console.log(e,"error")
                    }
                    
            } }>Continue</button>
              </div>
              <div className='mt-3'>
              <p className='login-links-text text-center ml-2 mt-3'>{"Don't"} have an account? <span><Link to="/signup" className='login-links-signup' target="_blank">Sign Up</Link></span></p>
              <p className='text-center login-links'>Forgot Password?</p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
