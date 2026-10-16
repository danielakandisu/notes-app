import React,{ useState } from "react";


export default function DeleteConfirmation({deleteNote, noteToDelete, setNoteToDelete}){

    return (
        <>
            {noteToDelete  
                ? <>
               <div className="delete-content">
                    <button onClick={() => 
                            {deleteNote(noteToDelete) 
                            setNoteToDelete(null)}}>Confirm Delete</button> 
                    
                    <button onClick={() => setNoteToDelete(null)}>
                        Cancel
                    </button>
                </div> 
                </> 
                : null
            }
        
        </>
    )
}