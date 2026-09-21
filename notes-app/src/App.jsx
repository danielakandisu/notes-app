import React from "react"
import NoteForm from "./components/noteForm"
import NoteList from "./components/noteList"
import { useState } from "react"
import SearchBar from "./components/searchBar"

export default function App(){

    const [notes,setNotes] = React.useState([])

    const [searchItem, setSearchItem] = useState('')

    const filteredNotes = notes.filter((note) => {

       return note.title.toLowerCase().includes(searchItem.toLowerCase().trim()) ||
       note.body.toLowerCase().includes(searchItem.toLowerCase().trim())


    })
    const addNote = (newNote) => setNotes(prev => [...prev,newNote])

    function deleteNote(id){

       return setNotes(prevNotes => prevNotes.filter( note => note.id !== id))
    }

    function editNote(id, updateNote){

      return setNotes(prevNotes =>
        prevNotes.map((note) => 
        note.id === id
        ? {...note, ...updateNote}
          :note
        )
      )
    }

    function favorite(id){

      setNotes(prevNotes => prevNotes.map((note) => {
          return note.id === id
          ? {...note, isFavorite: !note.isFavorite}:
          note

      }))
    }



    
    return (
      <>
        <SearchBar 
          searchItem={searchItem}

          setSearchItem={setSearchItem}
        />

        <NoteForm addNote={addNote} />

        <NoteList editNote={editNote} deleteNote={deleteNote} notes={filteredNotes} favorite={favorite} />


      </>
      
        
    )
}