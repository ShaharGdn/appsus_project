import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, isLoading }) {

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={{ ...note.style, opacity: isLoading ? 0.5 : 1 }}>
                    <NotePreview note={note} />
                    <i className="remove-btn fa-sharp fa-solid fa-circle-xmark"
                        onClick={() => onRemove(note.id)}></i>
                    <div className="actions"></div>
                </li>
            )}
        </ul>
    </section >
}

