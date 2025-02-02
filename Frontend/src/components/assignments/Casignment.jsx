import Swal from 'sweetalert2'
import  { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../providers/AuthProviders';

const Casignment = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const Title = form.Title.value;
        const photo = form.photo.value;
        const Description = form.Description.value;
        const Marks = form.Marks.value;
      
        const Dificultiy = form.Dificultiy.value;
        
        const dueDateISOString = startDate;
        const dueDate = new Date(dueDateISOString);
        const Due_Date = dueDate.toISOString().split('T')[0];
        const usernamee=user.displayName;
        const emaill=user.email

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


        console.log("New Tourist Spot:", cassignment);
        fetch(`https://as11server.vercel.app/creass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cassignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Spot added successfully',
                        icon: 'success',
                        confirmButtonText: 'Done'
                    })
                }
            })
        form.reset();
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Create a Assignment</h1>
                        <p className="py-6">You can create a assignment by giving proper information below that will help others for practice</p>
                    </div>
                    <div className=" card w-full shadow-2xl bg-base-100 ">
                        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-3 p-5">
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name="Title" placeholder="Title" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo </span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo " className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text" name="Description" placeholder="Description" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marks</span>
                                </label>
                                <input type="text" name="Marks" placeholder="Marks" className="input input-bordered" required />
                            </div>
                            

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Dificultiy</span>
                                </label>
                                <select name="Dificultiy" className="input input-bordered" required>
                                    <option value="" disabled selected>Select Dificultiy level</option>
                                    <option value="Hard">Hard</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Easy">Easy</option>

                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due_Date</span>
                                </label>
                                
                                <div className=' border-gray-300 border-[1px] rounded-md p-2.5'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                            </div> 



                            <div className="form-control col-span-2">
                                <input type="submit" value="Create Assignment" className="btn bg-blue-500 w-full text-white" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Casignment;