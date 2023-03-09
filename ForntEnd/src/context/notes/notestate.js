import React, { useState  } from 'react'



import notescontext from './notecontext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesintial = []
  // get all notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fecthnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setnotes(json)
  }
  const [notes, setnotes] = useState(notesintial)


  const addNote = async (title, description, tag) => {
    // Add a Note
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = {
      "_id": "63f5b4ecaa657ce28d35f9d484849",
      "user": "63ef1d7eecfdec3e97cd7710",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-02-22T06:23:40.398Z",
      "__v": 0
    };

    setnotes(notes.concat(note))
  }



  // delete a note
  const deletenote = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    //eslint-disable-next-line 
    let json = await response.json();
    // alert(json);
    const newnotes = notes.filter((note) => { return note._id !== id })
    setnotes(newnotes)
  }

  // edit a new note

  const editnote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line 
    const json = await response.json();

    // logic to edit in client
    let newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      setnotes(newnotes)
    }
  }

  // user login 
  

  return (
    <notescontext.Provider value={{ notes, addNote, deletenote, editnote, getNotes}}>
      {props.children}
    </notescontext.Provider>
  )
}

export default NoteState;