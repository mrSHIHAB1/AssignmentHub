import  { useContext, useState } from "react";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import auth from "../firebase/firebase.config.js"
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProviders";


const Login = () => {
    const location=useLocation()
    console.log(location)
    const navigate=useNavigate()
    const notify = () => toast.success("Login successful");
    const otify = () => toast.error("Login Failed");
    const { signIn } = useContext(AuthContext);
  
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    const handleLogin = e => {
      e.preventDefault();
  
      const form = new FormData(e.currentTarget);
      const email = form.get('email');
      const password = form.get('password');
      
      signIn(email, password)
        .then(result => {
          navigate(location?.state? location.state:'/')
          notify();
         
        })
        .catch(error => {
          otify();
        });
    };
  
  
  
    const glog = () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };
  
    return (
      <div>
        
        <div className="hero min-h-screen bg-blue-100">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">Login with Email and password or we can login with Gmail. </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
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
                  <div className=" flex"><button className="btn w-[40%] bg-blue-600 text-white">Login</button>
                  <p className="text-center">OR</p>
                  <button onClick={glog} className="btn w-[40%] bg-green-500">Google</button></div>
                  
                  <p className="text-center">Dont have an account?<Link to='/signup'><span className="text-yellow-600"> Sign Up</span></Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    );
  };
  
  export default Login;
  