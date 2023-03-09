import React, { useContext, useEffect, useRef, useState } from 'react'
import notescontext from '../context/notes/notecontext';
import NOteIteam from './NoteIteam';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Note = (props) => {
    let navigate = useNavigate();
    const ref = useRef(null)
    const refclose = useRef(null)
    const context = useContext(notescontext)
    const { notes, getNotes , editnote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes();
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "default" })
    const chnage = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const updatenote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
    

    const handleclick = (event) => {
        // event.preventDefault()
        editnote(note.id, note.etitle , note.edescription, note.etag)
        refclose.current.click();
        props.showalert("Note Updated Successfully" , "success")
    }
  
    return (
        <>
            <Addnote showalert={props.showalert}/>
            <div>
                {/* Button trigger modal */}
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div >
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={chnage} />
                                            <label htmlFor="title">Enter the title</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={chnage} />
                                            <label htmlFor="description">Enter the description</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="text" className="form-control my-4" id="etag" name='etag' value={note.etag} onChange={chnage} />
                                            <label htmlFor="tag">Enter the tag</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" row  my-4">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "No Notes found add some notes"}
                </div>
                {notes.map((note) => {
                    return <NOteIteam key={note._id} updatenote={updatenote} note={note} showalert={props.showalert} />
                })}
            </div>
        </>
    )
}
export default Note  