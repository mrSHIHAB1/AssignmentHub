import { useLoaderData } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import MyPending from "./MyPending";


const Onlypending = () => {
    const allass=useLoaderData();
    const {user}=useContext(AuthContext)

    const mydata=allass.filter(as=>as.emai===user.email)
    return (
        <div>
        <div>
            <p className=" text-4xl text-center font-bold my-10">My Submission</p>
        </div>
             <div className="grid lg:grid-cols-2 gap-3 p-5">
                    {
                    mydata.map(ass=>(
                        <MyPending
                        key={ass._id}
                        ass={ass}
                        >

                        </MyPending>
                    ))
                    }
                    </div>
        </div>
    );
};

export default Onlypending;