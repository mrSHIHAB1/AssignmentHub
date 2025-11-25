import { useLoaderData } from "react-router-dom";
import Asscard from "./Asscard";
import { AuthContext } from "../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { FaFilter } from "react-icons/fa";

const Allasignment = () => {
    const loadeduser = useLoaderData();
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState("");

    useEffect(() => {
        setUsers(loadeduser);
        setLoading(false);
    }, [loadeduser]);

    const handleDifficultyChange = (event) => {
        const selectedDifficulty = event.target.value;
        setDifficulty(selectedDifficulty);
        if (selectedDifficulty) {
            const filteredUsers = loadeduser.filter(assignment => assignment.Dificultiy === selectedDifficulty);
            setUsers(filteredUsers);
        } else {
            setUsers(loadeduser);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4F46E5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: '#1E293B',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://as11server.vercel.app/creass/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your assignment has been deleted.",
                                icon: "success",
                                background: '#1E293B',
                                color: '#fff'
                            });
                            setUsers(prevUsers => prevUsers.filter(assignment => assignment._id !== id));
                        }
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gradient">All Assignments</h2>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaFilter className="text-primary" />
                    </div>
                    <select
                        name="difficulty"
                        className="select select-bordered pl-10 w-full md:w-[200px] bg-base-200 focus:border-primary focus:outline-none"
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    >
                        <option value="">All Levels</option>
                        <option value="Hard">Hard</option>
                        <option value="Medium">Medium</option>
                        <option value="Easy">Easy</option>
                    </select>
                </div>
            </div>

            {users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(assmnt => (
                        <Asscard
                            key={assmnt._id}
                            assmnt={assmnt}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold opacity-50">No assignments found</h3>
                    <p className="opacity-40 mt-2">Try changing the filter or check back later.</p>
                </div>
            )}
        </div>
    );
};

export default Allasignment;
