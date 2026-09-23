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
            isFavorite:false
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
         <input 
                ref={inputRef}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event)=> setTitle(event.target.value)}
            />
            <textarea
                placeholder="Write your note"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                maxLength={30}
            />
                <p>{body.length} / 30</p>
            <button >Add Note</button> 
        </form>
    )

}