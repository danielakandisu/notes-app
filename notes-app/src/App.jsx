import React from "react"
import NoteForm from "./components/noteForm"
import NoteList from "./components/noteList"
import { useState } from "react"
import SearchBar from "./components/searchBar"
import FavoriteBtn from "./favoriteBtn"
import { Archive, ReceiptPoundSterling } from "lucide-react"
import ArchiveBtn from "./components/archiveNotes"
import DeleteConfirmation from "./components/deleteConfirmation"
import SortNotes from "./components/sortNotes"
import clsx from "clsx"

export default function App(){

  // State

    const [notes,setNotes] = React.useState([])

    const [searchItem, setSearchItem] = useState('')

    const [showFav, setShowFav] = useState(false)

    const [showArchive, setShowArchive] = useState(false)

    const [ noteToDelete, setNotetoDelete] = useState(null)

    const [sortNotes, setSortNotes] = useState('newest')

    //derived values

    const filteredFavoriteNote = notes.filter(note =>  note.isFavorite)

    const archivedNotes = notes.filter(note => note.isArchived)

    const activeNotes = notes.filter(note => !note.isArchived)
    
    const filteredNotes = activeNotes.filter((note) => {
      
      return note.title.toLowerCase().includes(searchItem.toLowerCase().trim()) ||
      note.body.toLowerCase().includes(searchItem.toLowerCase().trim())
      
      
    })

    //Action functions


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
  
  setNotes(prevNotes => 
    prevNotes.map((note) => {
      return note.id === id
      ? {...note, isFavorite: !note.isFavorite}:
      note
      
    }))
  }

function toggleArchiveNotes(id){
    setNotes(prevNotes =>
      prevNotes.map((note) =>  {
        return note.id === id ?
        {...note, isArchived:!note.isArchived}
        : note
      })
    )
    
  }
  
  function showArchiveNotes(){
  
          setShowArchive(archive => !archive)
  
      }

    function showFavNotes(){

      setShowFav(fav => !fav)
    
    }

    function showSortedNotes(notesSorted) {

        const copiedNotes = [...notesSorted]

        if(sortNotes === 'az') {
          
          return copiedNotes.sort((a,b) => {

           return a.title.localeCompare(b.title)
          })}

        if(sortNotes === 'za'){

          return copiedNotes.sort((a,b) => {

           return b.title.localeCompare(a.title)
          })}
        if(sortNotes === 'newest') {

          return copiedNotes.sort((a,b) => {

           return b.createdAt - a.createdAt
          })
        }
        
        if(sortNotes === 'oldest')

         return copiedNotes.sort((a,b) => {

          return a.createdAt - b.createdAt

         })
         
        }

        
        //Display logic
          const isArchiveEmpty = showArchive && archivedNotes.length === 0

          const isFavoriteEmpty = showFav && filteredNotes.length === 0

          const isNotesEmpty = activeNotes && notes.length === 0
        
          const notesToDisplay = showArchive ? archivedNotes : showFav ? filteredFavoriteNote: filteredNotes
        
          const sortedNotes = showSortedNotes(notesToDisplay)

          const statusMessages = 
            isArchiveEmpty
              ? <p>Archive is Empty</p>
              : isFavoriteEmpty
                ? <p>No Favorite Notes</p>
                : isNotesEmpty
                  ? <p>No Notes Yet</p>
                  : null


        
        
    
    return (
    <>
    { noteToDelete ? (
    <div className="delete-confirmation">
        <div className="delete-box">
          <DeleteConfirmation
            deleteNote={deleteNote}
            noteToDelete={noteToDelete}
            setNoteToDelete={setNotetoDelete}
          />
        </div>
      </div>
    ): null}
    
    <div className="header">
          <SearchBar 
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />

        <FavoriteBtn
          showFavNotes= {showFavNotes}
        />
        <ArchiveBtn
          showArchive = {showArchive}
          showArchiveNotes = {showArchiveNotes}
        />

        < SortNotes
          sortNotes={sortNotes}
          setSortNotes= {setSortNotes}
        />
    </div>

        <NoteForm addNote={addNote}/>

      <div className="status-text">
        {statusMessages}
      </div>

        <NoteList 
        editNote={editNote} 
        setNoteToDelete={setNotetoDelete} 
        notes={sortedNotes} 
        favorite={favorite}
        toggleArchiveNotes = {toggleArchiveNotes} 
        />


      </>
      
        
    )
}