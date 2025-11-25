import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit, FaEye, FaLayerGroup, FaStar } from 'react-icons/fa';

const Asscard = ({ handleDelete, assmnt }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        _id,
        Title,
        photo,
        Description,
        Marks,
        Dificultiy,
        Due_Date,
        usernamee,
        emaill
    } = assmnt;

    const handleUpdate = () => {
        if (user?.email === emaill) {
            navigate(`/update/${_id}`);
        } else {
            toast.error("You can only update your own assignments");
        }
    };

    const handlecheck = () => {
        if (user?.email === emaill) {
            handleDelete(_id)
        } else {
            toast.error("You can only delete your own assignments");
        }
    }

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Hard': return 'badge-error';
            case 'Medium': return 'badge-warning';
            case 'Easy': return 'badge-success';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="card glass-card hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
            <figure className="relative h-48 overflow-hidden">
                <img src={photo} alt={Title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className={`absolute top-4 right-4 badge ${getDifficultyColor(Dificultiy)} gap-2 font-bold shadow-md`}>
                    {Dificultiy}
                </div>
            </figure>

            <div className="card-body p-6 flex-grow">
                <h2 className="card-title text-xl font-bold mb-2 line-clamp-1" title={Title}>{Title}</h2>

                <div className="flex items-center gap-4 text-sm opacity-70 mb-4">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>Marks: {Marks}</span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-auto pt-4 border-t border-base-content/10 gap-2">
                    <button onClick={handlecheck} className="btn btn-circle btn-sm btn-ghost text-error hover:bg-error/10 tooltip" data-tip="Delete">
                        <FaTrash />
                    </button>
                    <button onClick={handleUpdate} className="btn btn-circle btn-sm btn-ghost text-info hover:bg-info/10 tooltip" data-tip="Update">
                        <FaEdit />
                    </button>
                    <Link to={`/vassignment/${_id}`} className="btn btn-sm btn-primary text-white shadow-lg shadow-primary/30">
                        View Details
                    </Link>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Asscard;