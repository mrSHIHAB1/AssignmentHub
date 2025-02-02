import React from 'react';
import Nabbar from './Nabbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainL = () => {
    return (
        <div>
            <Nabbar></Nabbar>
            <div className='pt-16'>
            <Outlet></Outlet>
            </div>
            <div className=''>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default MainL;