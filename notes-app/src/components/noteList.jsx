import React from "react";
import NoteCard from "./noteCard";

export default function NoteList({notes, setNoteToDelete, editNote, favorite, toggleArchiveNotes}){

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
                    setNoteToDelete={setNoteToDelete}
                    editNote={editNote}
                    favorite={favorite}
                    toggleArchiveNotes={toggleArchiveNotes}
                />
            )
        })}
    </div> )
    }

</>
)}