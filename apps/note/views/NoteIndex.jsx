const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";



export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query()
            .then(notes => setNotes(notes))

    }, [])

    function removeNote(noteId) {

    }



    return <section className="note-index ">
        <h1>notes</h1>
        {notes.length > 0 && <NoteList notes={notes} onRemove={removeNote} />}
        {!notes.length && <h2> Notes you add appear here</h2>}
    </section >
}
