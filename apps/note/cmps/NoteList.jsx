const { Link, Outlet } = ReactRouterDOM

import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onRemove, isLoading }) {
    if (!notes.length) {
        return <h2> Notes you add appear here</h2>
    }

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <Link to={`/note/${note.id}`} key={note.id}>
                    <li style={{ ...note.style, opacity: isLoading ? 0.5 : 1 }}>
                        <NotePreview note={note} />
                        <i className="remove-btn fa-sharp fa-solid fa-circle-xmark"
                            onClick={(ev) => onRemove(ev, note.id)}></i>
                        <div className="actions"></div>
                    </li>
                </Link>
            )}
        </ul>
        <Outlet />
    </section >


}

