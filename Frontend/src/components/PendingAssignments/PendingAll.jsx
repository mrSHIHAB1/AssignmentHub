
import { useLoaderData } from "react-router-dom";
import Pending from "./Pending";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import MyPending from "./MyPending";
import { FaClipboardList, FaUserCheck } from "react-icons/fa";

const PendingAll = () => {
    const allass = useLoaderData();
    const { user } = useContext(AuthContext);
    const pendingAssignments = allass.filter(as => as.status === "Pending");
    const mydata = allass.filter(as => as.emai === user.email);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gradient mb-2">Assignment Dashboard</h1>
                <p className="text-base-content/60">Manage pending assignments and track your submissions</p>
            </div>

            <div role="tablist" className="tabs tabs-lifted tabs-lg">
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab font-semibold"
                    aria-label="Pending Assignments"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 min-h-[400px]">
                    <div className="flex items-center gap-2 mb-6">
                        <FaClipboardList className="text-primary text-2xl" />
                        <h2 className="text-2xl font-bold">Pending Assignments ({pendingAssignments.length})</h2>
                    </div>

                    {pendingAssignments.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingAssignments.map(as => (
                                <Pending key={as._id} as={as} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold opacity-50">No pending assignments</h3>
                            <p className="opacity-40 mt-2">All assignments have been graded!</p>
                        </div>
                    )}
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab font-semibold"
                    aria-label="My Submissions"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 min-h-[400px]">
                    <div className="flex items-center gap-2 mb-6">
                        <FaUserCheck className="text-primary text-2xl" />
                        <h2 className="text-2xl font-bold">My Submissions ({mydata.length})</h2>
                    </div>

                    {mydata.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mydata.map(ass => (
                                <MyPending key={ass._id} ass={ass} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold opacity-50">No submissions yet</h3>
                            <p className="opacity-40 mt-2">Start by taking an assignment!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingAll;
