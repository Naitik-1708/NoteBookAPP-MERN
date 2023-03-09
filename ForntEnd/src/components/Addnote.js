import React, { useContext, useState } from 'react'
import notescontext from '../context/notes/notecontext';

const Addnote = (props) => {
    const context = useContext(notescontext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "default" })

    const handleclick = (event) => {
        event.preventDefault()
        addNote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        props.showalert(" Note added Successfully ", "success")
    }
    const chnage = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='my-5'>
                <h1> Add your Notes</h1>
            </div>
            <form>
                <div >
                    <div className="form-floating mb-3">
                        <input type="text" style={{ width: "800px" }} className="form-control" id="title" name='title' value={note.title} onChange={chnage} minLength={5} required />
                        <label htmlFor="title">Enter the title</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" style={{ width: "800px" }} id="description" name='description' value={note.description} onChange={chnage} minLength={5} required />
                        <label htmlFor="description">Enter the description</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control my-4" style={{ width: "800px" }} id="tag" name='tag' value={note.tag} onChange={chnage} />
                        <label htmlFor="tag">Enter the tag</label>
                    </div>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn my-4 btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </>
    )
}
export default Addnote
