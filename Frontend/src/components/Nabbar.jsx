import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./providers/AuthProviders";
import { Tooltip } from 'react-tooltip';

const Nabbar = () => {
    const { logout, user } = useContext(AuthContext);
    const [theme, setTheme] = useState('dark');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {

        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'dark');
    };

    const navItems = <>
        <li> <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Home</NavLink> </li>
        <li> <NavLink to="/allassignment" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Assignments</NavLink> </li>

        {user?.email && <>
            <li><NavLink to="/createassignment" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Create Assignments</NavLink></li>
            <li><NavLink to="/pending" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Pending Assignments</NavLink></li>
        </>}
    </>;

    return (
        <div className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-white/10">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl hover:bg-transparent">
                    <p>AssignmentHub</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-6 text-base">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <label className="cursor-pointer grid place-items-center hover:scale-110 transition-transform">
                    <input
                        type="checkbox"
                        className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2 opacity-0"
                        onChange={toggleTheme}
                        checked={theme === 'dark'}
                    />
                    <svg className={`col-start-1 row-start-1 stroke-base-100 fill-base-100 transition-all duration-300 ${theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg className={`col-start-1 row-start-1 stroke-base-content transition-all duration-300 ${theme === 'light' ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>

                {user ? (
                    <div className="dropdown dropdown-end z-30">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                            <div className="w-10 rounded-full">
                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Your Profile">
                                    <img src={user?.photoURL || "https://i.postimg.cc/fWY6vtGy/Screenshot-541.png"} alt="User" />
                                </a>
                                <Tooltip id="my-tooltip" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-white/10">
                            <li className="menu-title px-4 py-2 text-primary font-bold">{user?.displayName || 'User'}</li>
                            <li><Link to='/myas' className="hover:text-primary">My Submissions</Link></li>
                            <li><button onClick={logout} className="text-error hover:bg-error/10">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm hover:text-primary">Login</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm text-white shadow-lg shadow-primary/30">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nabbar;