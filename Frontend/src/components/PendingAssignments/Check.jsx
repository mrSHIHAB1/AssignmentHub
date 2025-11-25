import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf, FaCommentDots, FaStar, FaEye, FaTimes } from 'react-icons/fa';

const Check = () => {
    const as = useLoaderData();
    const navigate = useNavigate();
    const {
        _id,
        pdfLink,
        note,
        email,
        status,
        Title,
        Marks
    } = as;
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePreviewClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const TpdfLink = event.target.elements.TpdfLink.value;
        const Tnote = event.target.elements.Tnote.value;

        if (parseInt(TpdfLink) > parseInt(Marks)) {
            toast.error(`Obtained marks cannot exceed total marks (${Marks})`);
            setLoading(false);
            return;
        }

        const submitData = {
            TpdfLink,
            Tnote,
            Tstatus: 'Completed'
        };

        try {
            const response = await fetch(`https://as11server.vercel.app/subass/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                toast.success('Assignment graded successfully!');
                setTimeout(() => {
                    navigate('/pendingassignment');
                }, 1500);
            } else {
                toast.error('Failed to update assignment');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Error updating assignment');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-base-100">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Grade Assignment</h1>
                    <p className="text-base-content/60">Review submission and provide feedback</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Grading Form */}
                    <div className="card glass-card">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                                <FaStar className="text-yellow-500" />
                                Grade Submission
                            </h2>

                            <div className="alert alert-info mb-6">
                                <div>
                                    <span className="font-semibold">Assignment:</span> {Title}
                                    <br />
                                    <span className="font-semibold">Total Marks:</span> {Marks}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-2">
                                            <FaStar className="text-yellow-500" /> Obtained Marks
                                        </span>
                                    </label>
                                    <input
                                        name="TpdfLink"
                                        type="number"
                                        placeholder={`Enter marks (Max: ${Marks})`}
                                        className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                        max={Marks}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium flex items-center gap-2">
                                            <FaCommentDots className="text-primary" /> Feedback
                                        </span>
                                    </label>
                                    <textarea
                                        name="Tnote"
                                        className="textarea textarea-bordered h-32 w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                        placeholder="Provide constructive feedback..."
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full text-white shadow-lg shadow-primary/30 hover:scale-[1.01] transition-transform"
                                    >
                                        {loading ? <span className="loading loading-spinner"></span> : "Submit Grade"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Submission Preview */}
                    <div className="card glass-card">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                                <FaFilePdf className="text-red-500" />
                                Student Submission
                            </h2>

                            <div className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">PDF/Document Link</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            defaultValue={pdfLink}
                                            type="text"
                                            className="input input-bordered flex-1 bg-base-200/50"
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={handlePreviewClick}
                                            className="btn btn-primary gap-2"
                                        >
                                            <FaEye /> Preview
                                        </button>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Student's Note</span>
                                    </label>
                                    <div className="bg-base-200/50 p-4 rounded-lg min-h-[150px]">
                                        <p className="leading-relaxed">{note || "No note provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-base-100 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-base-content/10">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <FaFilePdf className="text-red-500" /> Document Preview
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="btn btn-circle btn-ghost text-error hover:bg-error/10"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="flex-1 p-6">
                            <iframe
                                src={pdfLink}
                                className="w-full h-full rounded-lg border border-base-content/10"
                                frameBorder="0"
                                title="PDF Preview"
                            />
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Check;
