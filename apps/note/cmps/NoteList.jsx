import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove }) {

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={note.style}>
                    <NotePreview note={note} />

                    <i className="remove-btn fa-sharp fa-solid fa-circle-xmark"
                        onClick={() => onRemove(note.id)}></i>
                    {/* <button className="remove-btn" onClick={() => onRemove(note.id)}>x</button> */}
                    <div className="actions"></div>
                </li>
            )}
        </ul>
    </section>
}

