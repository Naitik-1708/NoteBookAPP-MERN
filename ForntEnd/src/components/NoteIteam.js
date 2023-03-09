import React, { useContext } from 'react'
import notescontext from '../context/notes/notecontext';

const NOteIteam = (props) => {
    const { note , updatenote } = props;
    const context = useContext(notescontext);
    const { deletenote } = context;

    

    return (
        <>
            <div className=" col-md-3 my-3">
                <div className="card inline-block">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash me-5 ms-3" onClick={()=>{deletenote(note._id);
                        props.showalert("N0te Deleted successfully" , "success")}}></i>
                        <i className="fa-solid fa-pen-to-square me-5 ms-3" onClick={()=>{updatenote(note)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NOteIteam