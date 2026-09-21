import React, { useState } from "react";
import {Star} from 'lucide-react'

export default function NoteCard({note, deleteNote, editNote, newestNoteRef, favorite}){

    const [isEditing,setIsEditing] = useState(false)
    const [title,setTitle] = useState(note.title)
    const [body,setBody] = useState(note.body)

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

            
            <div className="note-card"
            ref={newestNoteRef}
            >
            <div className="note-header">
                <h3>{note.title}</h3>
                <button className='star-btn' onClick={() => favorite(note.id)}>
                    <Star fill={note.isFavorite? "#FFD700" : "none" }/>
                </button>
            </div>
                <p>{note.body}</p>
                <button onClick={() => setIsEditing(true) }>Edit</button>
                <button onClick={()=> deleteNote(note.id)}>Delete</button>
        
            </div>

        )}

    </div>

)}