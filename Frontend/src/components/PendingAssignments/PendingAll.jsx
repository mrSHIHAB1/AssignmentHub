import { useLoaderData } from "react-router-dom";
import Pending from "./Pending";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import MyPending from "./MyPending";


const PendingAll = () => {
          const allass=useLoaderData();
          const {user}=useContext(AuthContext)
          const pendingAssignments = allass.filter(as => as.status === "Pending");
          const mydata=allass.filter(as=>as.emai===user.email)
    return (
        <div>
            <div role="tablist" className="tabs tabs-lifted lg:p-10">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pending Assignment" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 ">
                    <div className="grid lg:grid-cols-2 gap-3">
                    {
                        pendingAssignments.map(as=>(
                            <Pending
                            key={as._id}
                            as={as}
                            >

                            </Pending>
                        ))
                    }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="My Submission" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div className="grid lg:grid-cols-2 gap-3">
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

            </div>
        </div>
    );
};
export default PendingAll;