import React from "react";
import NoteCard from "./noteCard";

export default function NoteList({notes, deleteNote, editNote}){

const newestNoteRef = React.useRef(null)

    React.useEffect(() => {
      if(newestNoteRef.current){
        newestNoteRef.current.scrollIntoView()
      }

    },[notes])



    return (
<>
    {notes.length > 0 && (
        <div className ="note-list">
        {notes.map((note, index) => {
            return (
                <NoteCard
                    newestNoteRef={
                        index === notes.length - 1 ? newestNoteRef : null
                    } 
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    editNote={editNote}
                />
            )
        })}
    </div> )
    }

</>
)}