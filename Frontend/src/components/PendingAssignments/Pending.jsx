import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUser, FaCheckCircle } from 'react-icons/fa';

const Pending = ({ as }) => {
  const {
    _id,
    pdfLink,
    note,
    emaill,
    status,
    Title,
    Marks
  } = as;

  return (
    <div className="card glass-card hover:-translate-y-1 transition-all duration-300">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <div className="badge badge-warning gap-2 font-semibold">
            <FaCheckCircle /> {status}
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="font-bold">{Marks}</span>
          </div>
        </div>

        <h2 className="card-title text-lg mb-2 line-clamp-2">{Title}</h2>

        <div className="flex items-center gap-2 text-sm opacity-70 mb-4">
          <FaUser className="text-primary" />
          <span className="truncate">{emaill}</span>
        </div>

        <div className="card-actions justify-end mt-auto">
          <Link to={`/check/${_id}`} className="btn btn-primary btn-sm text-white shadow-lg shadow-primary/30">
            Give Mark
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pending;