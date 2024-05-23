const { useState, useEffect } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddNote } from "../cmps/AddNote.jsx";

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        noteService.query()
            // .then(notes => setNotes(notes))
            .then(notes => {
                setNotes(notes)
                console.log(notes)

            })
    }, [])

    function removeNote(noteId) {
        setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note removed successfully.')
            })
            .catch(err => {
                console.log('error:', err)
                showErrorMsg('Could not remove note.')
            })
            .finally(() => setIsLoading(false))
    }

    return <section className="note-index">
        <AddNote />
        {notes.length > 0 && <NoteList notes={notes} onRemove={removeNote} isLoading={isLoading} />}
        {!notes.length && <h2> Notes you add appear here</h2>}
    </section >
}
