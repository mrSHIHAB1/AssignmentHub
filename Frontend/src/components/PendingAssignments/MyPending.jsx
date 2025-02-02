import React from 'react';

const MyPending = ({ass}) => {
    const{
        _id,
        pdfLink,
        note,
        emaill,
        status,
        Title,
        Marks,
        Tnote,
        TpdfLink

      }=ass
    return (
        <div>
              <div className="card w-full bg-green-400 text-white">
  <div className="card-body h-[250px]">
  {status === "Completed" ? (
                        <>
                            <h2 className="card-title  w-24 rounded-lg p-2 bg-green-700 text-white">{status}</h2>
                            <h2 className="card-title">Problem:{Title}</h2>
                            <p>Total Marks: {Marks} </p>
                            <p>Obtain Marks: {TpdfLink}</p>
                            <div className="card-actions justify-end">
    
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>See feedback</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    
    <p className="py-4">{Tnote}</p>
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
      
    </div>
                        </>
                    ) : (
                        <>
                            <h2 className="card-title  w-24 rounded-lg p-2 bg-yellow-400 text-white">{status}</h2>
                            <h2 className="card-title">Problem:{Title}</h2>
                            <p>Total Marks: {Marks}</p>
                        </>
                    )}
    
    
   
  </div>
</div>
        </div>
    );
};

export default MyPending;