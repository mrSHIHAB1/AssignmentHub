import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProviders';
import { FaCalendarAlt, FaUser, FaStar, FaLayerGroup, FaFilePdf, FaStickyNote } from 'react-icons/fa';

const ViewDetails = () => {
  const { user } = useContext(AuthContext);
  const assignment = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    _id,
    Title,
    photo,
    Description,
    Marks,
    Dificultiy,
    Due_Date,
    emaill
  } = assignment;

  const handlesubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const pdfLink = event.target.elements.pdfLink.value;
    const note = event.target.elements.note.value;
    const emai = user.email;
    const status = 'Pending';
    const submit = {
      pdfLink,
      note,
      emai,
      status,
      Marks,
      Title
    }

    fetch(`https://as11server.vercel.app/subass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submit)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Assignment Submitted Successfully!");
          document.getElementById('my_modal_4').close();
          setTimeout(() => {
            navigate('/allassignment');
          }, 1500);
        }
        setLoading(false);
      })
      .catch(err => {
        toast.error("Submission Failed");
        setLoading(false);
      });
  };

  const handleTakeAssignment = () => {
    if (!user) {
      toast.info("Please login to take this assignment");
      setTimeout(() => {
        navigate('/login', { state: { from: `/viewdetails/${_id}` } });
      }, 1500);
      return;
    }
    document.getElementById('my_modal_4').showModal();
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Hard': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Easy': return 'text-success';
      default: return 'text-base-content';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-base-100 flex items-center justify-center">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-6xl w-full glass-card overflow-hidden animate-fade-in-up">
        <figure className="lg:w-1/2 h-[500px] lg:h-auto relative">
          <img src={photo} alt={Title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60 lg:bg-gradient-to-r"></div>
        </figure>

        <div className="card-body lg:w-1/2 p-8 lg:p-12">
          <div className="badge badge-primary badge-outline mb-4">{Dificultiy}</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">{Title}</h1>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-base-content/80">
              <FaLayerGroup className="text-primary" />
              <span className="font-semibold">Description:</span>
            </div>
            <p className="text-base-content/70 leading-relaxed pl-7">{Description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
              <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                <FaStar size={20} />
              </div>
              <div>
                <p className="text-xs opacity-60">Total Marks</p>
                <p className="font-bold text-xl">{Marks}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
              <div className={`p-3 rounded-lg bg-opacity-10 ${getDifficultyColor(Dificultiy).replace('text-', 'bg-')}`}>
                <FaLayerGroup size={20} className={getDifficultyColor(Dificultiy)} />
              </div>
              <div>
                <p className="text-xs opacity-60">Difficulty</p>
                <p className={`font-bold text-xl ${getDifficultyColor(Dificultiy)}`}>{Dificultiy}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs opacity-60">Due Date</p>
                <p className="font-bold text-lg">{Due_Date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-xl">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <FaUser size={20} />
              </div>
              <div>
                <p className="text-xs opacity-60">Created by</p>
                <p className="font-bold text-sm truncate max-w-[150px]" title={emaill}>{emaill}</p>
              </div>
            </div>
          </div>

          <div className="card-actions justify-end mt-auto">
            <button
              className="btn btn-primary btn-lg w-full shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
              onClick={handleTakeAssignment}
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box bg-base-100 border border-base-content/10 shadow-2xl">
          <h3 className="font-bold text-2xl mb-6 text-center">Submit Assignment</h3>

          <form onSubmit={handlesubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FaFilePdf className="text-red-500" /> PDF/Doc Link
                </span>
              </label>
              <input
                name="pdfLink"
                type="url"
                placeholder="https://drive.google.com/..."
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FaStickyNote className="text-yellow-500" /> Quick Note
                </span>
              </label>
              <textarea
                name="note"
                className="textarea textarea-bordered h-32 w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                placeholder="Add any comments or details about your submission..."
                required
              ></textarea>
            </div>

            <div className="modal-action grid grid-cols-2 gap-4">
              <button
                type="button"
                className="btn btn-outline hover:bg-base-content/10"
                onClick={() => document.getElementById('my_modal_4').close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-white shadow-lg shadow-primary/30"
              >
                {loading ? <span className="loading loading-spinner"></span> : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default ViewDetails;