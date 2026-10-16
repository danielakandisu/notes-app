import React, { useState } from "react"

export default function NoteForm({addNote}){

    const [title,setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error,setError] = useState('');

     const inputRef = React.useRef(null)
     const enterRef = React.useRef(null)
    
        React.useEffect(() => {
    
          inputRef.current.focus()
    
        }, [])

        React.useEffect(() => {

            function handleKey(event){

                if(event.ctrlKey && event.key === 'k') {
                    event.preventDefault()
                    inputRef.current.focus()
                } else if(event.ctrlKey && event.key === 'Enter') {
                    event.preventDefault()
                    enterRef.current.requestSubmit()

                }
            }
            window.addEventListener('keydown',handleKey)
            

            return () => {

                window.removeEventListener('keydown', handleKey)
                
            }

        },[])
    
    
    
    function handleSubmit(event){
       
        event.preventDefault()
        
        if(!title.trim() || !body.trim()){
    
             setError('Please fill in all the required fields')
             return
            
        }

        addNote({
            id:Date.now(),
            title:title,
            body:body,
            createdAt: Date.now(),
            isFavorite:false,
            isArchive: false
        })
        setError('')
        setTitle('')
        setBody('')

    }
    

    return (
        <form 
        ref={enterRef}
        id="note-form"
        className="note-form"
        onSubmit={handleSubmit}>
        {(error) && <p className='error'style={{color: 'red'}}>{error}</p>}
        <label htmlFor="title">title</label>
         <input 
                id="title"
                ref={inputRef}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event)=> setTitle(event.target.value)}
            />
            <label htmlFor="body">body</label>
            <textarea
                id="body"
                placeholder="Write your note"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                maxLength={30}
            />
                {body.length > 0?<p className="word-count">{body.length} / 50</p>:null}
            <button >Add Note</button> 
        </form>
    )

}