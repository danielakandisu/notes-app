import React, { useState } from "react";
import {Star} from 'lucide-react'
import clsx from "clsx"

export default function NoteCard({note, setNoteToDelete, editNote, newestNoteRef, favorite, toggleArchiveNotes}){

    const [isEditing,setIsEditing] = useState(false)
    const [title,setTitle] = useState(note.title)
    const [body,setBody] = useState(note.body)


    const noteCard = clsx('note-card',{
                favorite: note.isFavorite,
                archived: note.isArchived
            })
    function handleSave(){

            editNote(note.id,{

                title:title,
                body:body
            })

            setIsEditing(false)

    }

    return (

    <div>
        
        { isEditing ? (
        <>
      
            <input
                className="edit-input"
                value={title}
                onChange={(e) => setTitle(e.target.value) }
            />
            <textarea
                className="edit-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button className="save-btn" onClick={handleSave}>Save</button>   
         </>

        ) : (

            
            <div className={noteCard}
            ref={newestNoteRef}
            >
            <div className="star-row">
                <button className='star-btn' 
                onClick={() => favorite(note.id)}
                aria-label="Favorite-button"
                >
                    <Star fill={note.isFavorite? "#FFD700" : "none" }/>
                </button>
            </div>
            <div className="note-header">
                <h3>{note.title}</h3>
            </div>
                <p>{note.body}</p>
                <button onClick={() => setIsEditing(true) }>Edit</button>
                <button onClick={()=> setNoteToDelete(note.id)}>Delete</button>
                <button onClick={() => toggleArchiveNotes(note.id)}>Archive</button>
        
            </div>

        )}

    </div>

)}