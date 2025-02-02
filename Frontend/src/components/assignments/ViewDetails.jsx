import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProviders';
const ViewDetails = () => {
  const{user}=useContext(AuthContext)
    const assignment=useLoaderData();
    const notify = () => toast.success("Submitted");
    const{
        _id,
        Title,
        photo,
        Description,
        Marks,
     
        Dificultiy,
        Due_Date,
        
        emaill

    }=assignment
    const handlesubmit = (event) => {
      event.preventDefault(); 
      const pdfLink = event.target.elements.pdfLink.value;
      const note = event.target.elements.note.value;
      const emai=user.email
      const status='Pending'
      const submit={
        pdfLink,
        note,
        emai,
        status,
        Marks,
        Title
      }
      fetch(`https://as11server.vercel.app/subass`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submit)
      })
        .then(res => res.json())
        .then(data => {
            
            if(data.insertedId){
              notify();
            }
    })
 
      
  };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col bg-gray-300 w-5/6 rounded-xl">
    <img src={photo} className="max-w-sm rounded-lg shadow-2xl" />
    <h1 className="text-5xl font-bold">{Title}</h1>
    <p className="py-6"> <span className='font-bold'>Description :</span> {Description}</p>
    <div className='grid grid-cols-2 gap-3'>
     
     
      <p className="py-6"> <span className='font-bold'>Total Marks :</span> {Marks}</p>
      <p className="py-6"> <span className='font-bold'>Dificultiy :</span> {Dificultiy}</p>
      <p className="py-6"> <span className='font-bold'>Due_Date :</span> {Due_Date}</p>
      <p className="py-6"> <span className='font-bold'>Created by :</span> {emaill}</p>
     
      
      <div className=''><button className="btn bg-blue-500 text-white " onClick={()=>document.getElementById('my_modal_4').showModal()}>Take assignment</button></div>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Submit your Assignment here</h3>
   
    <div className="modal-action">
      <form onSubmit={handlesubmit} method="dialog" className='w-full'>
        <label>Submit the pdf of doc link here</label> <br/>
        <input name="pdfLink" type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" /><br/>
        <label>Take a note for the assignment</label><br/>
        <textarea name="note" className="textarea textarea-primary w-full" placeholder="Write your note here"></textarea><br/>
        <div><button type="submit"  className="btn bg-green-500 text-white">Submit</button><button type="button" className="btn bg-red-500 text-white" onClick={() => document.getElementById('my_modal_4').close()}>Close</button></div>
      </form>
    </div>
  </div>
</dialog>
    </div>
  </div>
</div>

{/* You can open the modal using document.getElementById('ID').showModal() method */}

      

<ToastContainer></ToastContainer>
        </div>
    );
};

export default ViewDetails;