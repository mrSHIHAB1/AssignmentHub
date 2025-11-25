import React from 'react';
import { FaStar, FaCheckCircle, FaCommentDots, FaClock } from 'react-icons/fa';

const MyPending = ({ ass }) => {
  const {
    _id,
    pdfLink,
    note,
    emaill,
    status,
    Title,
    Marks,
    Tnote,
    TpdfLink
  } = ass;

  const isCompleted = status === "Completed";

  return (
    <div className={`card glass-card hover:-translate-y-1 transition-all duration-300 ${isCompleted ? 'border-2 border-success' : 'border-2 border-warning'}`}>
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <div className={`badge gap-2 font-semibold ${isCompleted ? 'badge-success' : 'badge-warning'}`}>
            {isCompleted ? <FaCheckCircle /> : <FaClock />}
            {status}
          </div>
        </div>

        <h2 className="card-title text-lg mb-3 line-clamp-2">{Title}</h2>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-lg">
            <span className="text-sm opacity-70">Total Marks</span>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <FaStar />
              <span>{Marks}</span>
            </div>
          </div>

          {isCompleted && (
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <span className="text-sm opacity-70">Obtained Marks</span>
              <div className="flex items-center gap-1 text-success font-bold text-xl">
                <FaStar />
                <span>{TpdfLink}</span>
              </div>
            </div>
          )}
        </div>

        {isCompleted && (
          <div className="card-actions justify-end mt-auto">
            <button
              className="btn btn-sm btn-outline gap-2"
              onClick={() => document.getElementById(`modal_${_id}`).showModal()}
            >
              <FaCommentDots /> View Feedback
            </button>

            <dialog id={`modal_${_id}`} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box bg-base-100 border border-base-content/10">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaCommentDots className="text-primary" /> Instructor Feedback
                </h3>
                <div className="bg-base-200/50 p-4 rounded-lg">
                  <p className="leading-relaxed">{Tnote}</p>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-primary">Close</button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPending;