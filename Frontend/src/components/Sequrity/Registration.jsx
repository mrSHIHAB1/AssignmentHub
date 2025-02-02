import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import {  Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProviders";
import { signOut } from "firebase/auth";

const Registration = () => {
    const notify = () => toast.success("Successfully Resgisterd");
    const otify=()=>toast.error("Registration Failed")
    const notifyError = (message) => toast.error(message);
      
      const {createUser,updateUserProfile,logout}=useContext(AuthContext)
      const handleregister = e => {
          
          e.preventDefault();
        
          const form = new FormData(e.currentTarget);
          const email = form.get('email');
          const name = form.get('Name');
          const password = form.get('password');
          const photourl = form.get('purl');
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;
          const lengthRegex = /^.{6,}$/;
      
          if (!uppercaseRegex.test(password)) {
            notifyError("Password must contain at least one uppercase letter");
            return;
          }
      
          if (!lowercaseRegex.test(password)) {
            notifyError("Password must contain at least one lowercase letter");
            return;
          }
      
          if (!lengthRegex.test(password)) {
            notifyError("Password length must be at least 6 characters");
            return;
          }
          createUser(email, password)
          .then(() => {
            
            
            updateUserProfile(name, photourl,email)
              .then(() => {
                logout()
                Navigate(location?.state ? location.state : '/login');
              })
              
              notify()
          })
        .catch((error) => {
          otify()
        });
        
         
          
       
      }
      const [passwordVisible, setPasswordVisible] = useState(false);
  
      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return (
        <div>
        
        <div className="hero min-h-screen bg-blue-100">
<div className="hero-content flex-col ">
<div className="text-center lg:text-left">
  <h1 className="text-5xl font-bold">Register your account</h1>
   </div>
<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
  <form onSubmit={handleregister} className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Your Name</span>
      </label>
      <input type="text" name="Name" placeholder="Name" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email" placeholder="email" name="email" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Phot URL</span>
      </label>
      <input type="text" name="purl" placeholder="Your photo url" className="input input-bordered" required />
    </div>
    <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered pr-12 w-full"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                {passwordVisible ? (
                  <FaRegEyeSlash onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" />
                ) : (
                  <FaRegEye onClick={togglePasswordVisibility} className="text-gray-400 cursor-pointer" />
                )}
              </span>
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
    <div className="form-control mt-6">
      <button className="btn bg-blue-600 text-white">Register</button>
    </div>
    <p className="text-center">Have an account?<Link to='/login'><span className="text-blue-600"> Sign in</span></Link></p>
  </form>
</div>
</div>
</div>
<ToastContainer></ToastContainer>
    </div>
    );
};

export default Registration;