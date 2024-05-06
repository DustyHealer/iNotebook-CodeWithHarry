import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //   const s1 = {
  //     name: "Harry",
  //     class: "5b",
  //   };
  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Himanshu",
  //         class: "10b",
  //       });
  //     }, 1000);
  //   };

  const notesInitial = [
    {
      _id: "662a4dd3259ccd3afefeb1fb",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1fc",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1fd",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1fe",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1fg",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1fr",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1ft",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
    {
      _id: "662a4dd3259ccd3afefeb1f",
      user: "662a3b2eec79cf4811c4cfcb",
      title: "My title",
      description: "Please wake up early",
      tag: "personal",
      date: "2024-04-25T12:34:27.312Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Get All notes
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    console.log("Adding a new note");

    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);

    console.log("Deleting a note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
