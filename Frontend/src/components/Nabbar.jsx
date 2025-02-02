import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./providers/AuthProviders"
import { Tooltip } from 'react-tooltip'

const Nabbar = () => {
    const { logout, user } = useContext(AuthContext);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const navItems = <>
        <li> <Link to="/">Home</Link> </li>
        <li> <Link to="/allassignment">Assignments</Link> </li>

        {user?.email ? <>
            <li><Link to="/createassignment">Create Assignments</Link></li>
            <li><Link to="/pending">Pending Assignments</Link></li>

        </>
            : <></>
        }
    </>
    return (
        <div className="navbar bg-blue-300 rounded-md h-14 mb-4 fixed top-0 w-full z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img className="w-24" src="https://i.postimg.cc/ZqfRBvkw/Screenshot-589.png"></img>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end z-30">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Your Profile"> <img src={user?.photoURL || "https://i.postimg.cc/fWY6vtGy/Screenshot-541.png"} /></a>
                                <Tooltip id="my-tooltip" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <button className="btn btn-sm  btn-ghost">{user?.displayName || 'user name not found'}</button>

                            </li>
                            <li>


                                <Link to='/myas'><button className="btn btn-sm  btn-ghos">My submission</button></Link>

                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="btn btn-sm  btn-ghost">Logout</button>

                            </li>
                        </ul>
                    </div>
                        :


                        <> <div className="bg-blue-700 text-white p-3 rounded-xl mr-2"><Link to="/login">Login</Link> </div>
                            <div className="bg-blue-900 text-white p-3 rounded-xl mr-2"><Link to="/signup">Register</Link></div>

                        </>
                }
                <label className="cursor-pointer grid place-items-center">
                    <input 
                        type="checkbox" 
                        className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" 
                        onChange={toggleTheme}
                        checked={theme === 'dark'}
                    />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Nabbar;