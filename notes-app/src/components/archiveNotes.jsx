

export default function ArchiveBtn( {showArchiveNotes, showArchive}){

    return (
        <button onClick={showArchiveNotes}>
            {showArchive ? 'Show notes': 'show Archive' }
        </button>


    )
}