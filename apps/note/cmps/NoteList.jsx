const { Link, Outlet } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, isLoading }) {
    if (!notes.length) {
        return <h2> Notes you add appear here</h2>
    }

    const pinnedNotes = notes.filter(note => note.isPinned === true)

    return <section className="note-list">
        {pinnedNotes.length > 0 && <ul>
            <span>PINNED</span>
            {pinnedNotes.map(note =>
                <Link to={`/note/${note.id}`} key={note.id}>
                    <li style={{ ...note.style, opacity: isLoading ? 0.5 : 1 }}>
                        <NotePreview isPreview={true} note={note} />
                        <i className="remove-btn fa-sharp fa-solid fa-circle-xmark"
                            onClick={(ev) => onRemove(ev, note.id)}></i>
                        <div className="actions"></div>
                    </li>
                </Link>
            )}
        </ul>}

        <ul>
            {pinnedNotes.length > 0 && <span>OTHERS</span>}
            {notes.filter(note => note.isPinned !== true)
                .map(note =>
                    <Link to={`/note/${note.id}`} key={note.id}>
                        <li style={{ ...note.style, opacity: isLoading ? 0.5 : 1 }}>
                            <NotePreview isPreview={true} note={note} />
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

