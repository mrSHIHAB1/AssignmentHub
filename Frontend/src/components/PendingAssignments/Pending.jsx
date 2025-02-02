import React from 'react';
import{Link} from 'react-router-dom'
const Pending = ({as}) => {
    const{
        _id,
        pdfLink,
        note,
        emaill,
        status,
        Title,
        Marks
      }=as
    return (
        <div>
          <div className="card w-full bg-blue-400 text-white">
  <div className="card-body">
    <h2 className="card-title  w-24 rounded-lg p-2 bg-yellow-400 text-white">{status}</h2>
    <h2 className="card-title">Problem:{Title}</h2>
    <p> Total Marks: {Marks}</p>
    <p>SubmitedBy: {emaill}</p>
    <div className="card-actions justify-end">
    
     <Link to={`/check/${_id}`}> <button className="btn">Give Mark</button></Link>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default Pending;