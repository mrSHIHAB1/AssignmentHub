import React, { useContext  } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Asscard = ({handleDelete ,assmnt}) => {
    const {user}=useContext(AuthContext);
    const aotify = () => toast.success("Login successful");
    const otify = () => toast.error("This assignment is not created by you ");
    const navigate = useNavigate();
    const{
        _id,
        Title,
        photo,
        Description,
        Marks,
     
        Dificultiy,
        Due_Date,
        usernamee,
        emaill

    }=assmnt
    const handleUpdate = () => {
        if (user.email === emaill) {
            navigate(`/update/${_id}`);
           
        } else {
            otify();
        }
    };
    const handlecheck=()=>{
        if (user.email === emaill) {
          handleDelete(_id)
        } else {
            otify();
        }
    }
   
     return (
        <div className='lg:mx-10 '>
            <div className=" card  lg:h-[220px] card-side bg-base-100 shadow-xl border-2 mt-5">
  <figure className='h-[220px] w-[400px] '><img src={photo} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title font-bold">{Title}</h2>
    <p>To get the Details cick view details</p>
    <div>
        <ul>
            <li><span className='font-semibold'>Dificultiy: </span>{Dificultiy}</li>
            <li><span className='font-semibold'>Marks: </span>{Marks}</li>
        </ul>
    </div>
    
    <div>
    
    <div className="card-actions lg:justify-end grid grid-cols-3 p-1">

      <button onClick={handlecheck} className="btn bg-red-600 text-white">Delete</button>
      <button onClick={handleUpdate} className="btn bg-blue-600 text-white">Update</button>
      <Link to={`/vassignment/${_id}`}><button className="btn bg-yellow-600 text-white">View Details</button></Link>
      
    </div>
    </div>
  </div>
</div>
<ToastContainer></ToastContainer>
        </div>
    );
};

export default Asscard;