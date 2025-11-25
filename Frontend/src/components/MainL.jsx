
import React from 'react';
import Nabbar from './Nabbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainL = () => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-white">
            <Nabbar></Nabbar>
            <div className='pt-20 min-h-[calc(100vh-300px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainL;
