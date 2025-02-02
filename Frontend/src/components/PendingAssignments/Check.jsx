import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Check = () => {
    const as = useLoaderData();
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

    const handlePreviewClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const TpdfLink = event.target.elements.TpdfLink.value;
        const Tnote = event.target.elements.Tnote.value;

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
                console.log('Assignment updated successfully');
            } else {
                console.error('Failed to update assignment');
            }
        } catch (error) {
            console.error('Error updating assignment:', error);
        }
    };

    return (
        <div className='flex w-full mt-5 p-5 gap-5'>
            <div className='w-[55%]'>
                <p className='font-bold text-red-500 mb-5'>
                    Give marks based on submitted assignment and also give feedback
                </p>
                <br />
                <form onSubmit={handleSubmit} className='w-full'>
                    <label className='font-bold'>Give marks</label>
                    <br />
                    <input
                        name="TpdfLink"
                        type="text"
                        placeholder="Type Marks"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <br />
                    <label className='font-bold'>Give feedback for the assignment</label>
                    <br />
                    <textarea
                        name="Tnote"
                        className="textarea textarea-primary w-full"
                        placeholder="Give Your feedback"
                    />
                    <br />
                    <div>
                        <button type="submit" className="btn bg-green-500 text-white">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-[40%] bg-gray-300 p-5 rounded-md'>
                <p className='font-bold pb-3'>Examine Submission</p>
                <form className='w-full'>
                    <label>Examine PDF or doc link here</label>
                    <br />
                    <div className="flex items-center">
                        <input
                            defaultValue={pdfLink}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-primary w-full max-w-xs"
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={handlePreviewClick}
                            className="btn bg-blue-500 text-white ml-2"
                        >
                            Preview
                        </button>
                    </div>
                    <br />
                    <label>Examine note for the assignment</label>
                    <br />
                    <textarea
                        defaultValue={note}
                        className="textarea textarea-primary w-full"
                        placeholder="Write your note here"
                        readOnly
                    />
                    <br />
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg w-3/4 h-3/4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">PDF Preview</h2>
                            <button onClick={handleCloseModal} className="text-red-500">
                                Close
                            </button>
                        </div>
                        <iframe
                            src={pdfLink}
                            className="w-full h-full"
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Check;
