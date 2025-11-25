
import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProviders";

const Registration = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { createUser, updateUserProfile, logout } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleregister = e => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const name = form.get('Name');
        const password = form.get('password');
        const photourl = form.get('purl');
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRegex = /^.{6,}$/;

        if (!uppercaseRegex.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            setLoading(false);
            return;
        }

        if (!lowercaseRegex.test(password)) {
            toast.error("Password must contain at least one lowercase letter");
            setLoading(false);
            return;
        }

        if (!lengthRegex.test(password)) {
            toast.error("Password length must be at least 6 characters");
            setLoading(false);
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photourl, email)
                    .then(() => {
                        logout();
                        toast.success("Registration Successful! Please Login.");
                        setTimeout(() => {
                            navigate('/login');
                        }, 1500);
                    })
            })
            .catch((error) => {
                toast.error("Registration Failed: " + error.message);
                setLoading(false);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden py-12">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="card w-full max-w-md glass-card shadow-2xl z-10 animate-fade-in-up">
                <div className="card-body p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gradient mb-2">Create Account</h1>
                        <p className="text-base-content/60">Join our community today</p>
                    </div>

                    <form onSubmit={handleregister} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input type="text" name="Name" placeholder="John Doe" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" placeholder="john@example.com" name="email" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Photo URL</span>
                            </label>
                            <input type="text" name="purl" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
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
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={loading} className="btn btn-primary w-full text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                                {loading ? <span className="loading loading-spinner"></span> : "Register"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-6 text-sm">
                        Already have an account? <Link to='/login' className="link link-primary font-bold">Sign In</Link>
                    </p>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Registration;
