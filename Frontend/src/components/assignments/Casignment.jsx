import Swal from 'sweetalert2'
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../providers/AuthProviders';

const Casignment = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const Title = form.Title.value;
        const photo = form.photo.value;
        const Description = form.Description.value;
        const Marks = form.Marks.value;
        const Dificultiy = form.Dificultiy.value;

        const dueDateISOString = startDate;
        const dueDate = new Date(dueDateISOString);
        const Due_Date = dueDate.toISOString().split('T')[0];
        const usernamee = user.displayName;
        const emaill = user.email

        const cassignment = {
            Title,
            photo,
            Description,
            Marks,
            Dificultiy,
            Due_Date,
            usernamee,
            emaill
        };

        fetch(`https://as11server.vercel.app/creass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cassignment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment created successfully',
                        icon: 'success',
                        confirmButtonText: 'Done',
                        background: '#1E293B',
                        color: '#fff'
                    })
                    form.reset();
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    background: '#1E293B',
                    color: '#fff'
                })
            });
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-base-100 flex items-center justify-center">
            <div className="card w-full max-w-4xl glass-card shadow-2xl animate-fade-in-up">
                <div className="card-body p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gradient mb-2">Create Assignment</h1>
                        <p className="text-base-content/60">Share your knowledge and challenge the community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Assignment Title</span>
                            </label>
                            <input type="text" name="Title" placeholder="e.g., Advanced React Patterns" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Thumbnail URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="https://example.com/image.jpg" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea name="Description" placeholder="Provide detailed instructions..." className="textarea textarea-bordered h-24 w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Marks</span>
                            </label>
                            <input type="number" name="Marks" placeholder="e.g., 100" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Difficulty Level</span>
                            </label>
                            <select name="Dificultiy" className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all" required defaultValue="">
                                <option value="" disabled>Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Due Date</span>
                            </label>
                            <div className="w-full">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all"
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>

                        <div className="form-control md:col-span-2 mt-6">
                            <button disabled={loading} className="btn btn-primary w-full text-white shadow-lg shadow-primary/30 hover:scale-[1.01] transition-transform">
                                {loading ? <span className="loading loading-spinner"></span> : "Create Assignment"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Casignment;