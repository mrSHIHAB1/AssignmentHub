
import { useContext, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.config.js"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProviders";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = e => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(result => {
                toast.success("Login successful");
                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1000);
            })
            .catch(error => {
                toast.error("Login Failed: " + error.message);
                setLoading(false);
            });
    };

    const glog = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success("Google Login successful");
                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1000);
            }).catch((error) => {
                toast.error("Google Login Failed");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden py-12">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="card w-full max-w-md glass-card shadow-2xl z-10 animate-fade-in-up">
                <div className="card-body p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gradient mb-2">Welcome Back!</h1>
                        <p className="text-base-content/60">Login to continue your learning journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pr-12 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/50 hover:text-primary transition-colors"
                                >
                                    {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button disabled={loading} className="btn btn-primary w-full text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                                {loading ? <span className="loading loading-spinner"></span> : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button onClick={glog} className="btn btn-outline w-full hover:bg-base-content/5 hover:text-base-content transition-colors gap-2">
                        <FaGoogle className="text-red-500" /> Continue with Google
                    </button>

                    <p className="text-center mt-6 text-sm">
                        Don't have an account? <Link to='/signup' className="link link-primary font-bold">Sign Up</Link>
                    </p>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Login;
