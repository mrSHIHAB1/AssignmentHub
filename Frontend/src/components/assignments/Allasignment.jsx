import { useLoaderData } from "react-router-dom";
import Asscard from "./Asscard";
import { AuthContext } from "../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

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
            const filsp = loadeduser.filter(assignment => assignment.emaill === user.email);
            setUsers(filsp);
        }
    };

    const handleDelete = (id) => {
        fetch(`https://as11server.vercel.app/creass/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setUsers(prevUsers => prevUsers.filter(assignment => assignment._id !== id));
                        }
                    });
                }
            });
    };

    if (loading) {
        return <div className='text-center flex w-[100px] mx-auto'><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div>
            <div className="form-control mb-4 w-[200px]">
                <label className="label">
                    <span className="label-2text font-bold">Difficulty</span>
                </label>
                <select name="difficulty" className="input input-bordered" value={difficulty} onChange={handleDifficultyChange}>
                    <option value="">Select Difficulty level</option>
                    <option value="Hard">Hard</option>
                    <option value="Medium">Medium</option>
                    <option value="Easy">Easy</option>
                </select>
            </div>
            {users.length > 0 ? (
                users.map(assmnt => (
                    <Asscard
                        key={assmnt._id}
                        assmnt={assmnt}
                        handleDelete={handleDelete}
                    />
                ))
            ) : (
                <div>No assignments found</div>
            )}
        </div>
    );
};

export default Allasignment;
