const { useState, useEffect } = React

import { utilService } from "../../../services/util.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddNote } from "../cmps/AddNote.jsx";
import { NoteFilter } from "../cmps/NoteFilter.jsx";

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
                console.log(notes)
            })
    }, [filterBy])

    function onSetFilterBy(newFilterBy) {
        setFilterBy({ ...newFilterBy })
    }

    function onSaveNote() {
        onSetFilterBy(noteService.getDefaultFilter()) // patch for refresh problem
    }

    function removeNote(ev, noteId) {
        console.log('noteId', noteId);
        ev.preventDefault()
        ev.stopPropagation()

        setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note removed successfully.')
            })
            .catch((err) => {
                console.log('error:', err)
                showErrorMsg('Could not remove note.')
            })
            .finally(() => setIsLoading(false))
    }

    function duplicateNote(note) {
        const createdAt = utilService.getCurrentDateTime()
        noteService.save({ ...note, id: '', createdAt: createdAt })
            .then(note => {
                setNotes(prevNotes => [...prevNotes, note])
                showSuccessMsg('Note duplicated successfully.')
            })
            .catch((err) => {
                console.log('error:', err)
                showErrorMsg('Could not duplicate note.')
            })
    }

    return <section className="note-index content-grid">
        <section className="top-nav content-grid">
            <section className="menu-bar">
                <button className="menu-btn">
                    <i className="fa-light fa-bars"></i>
                </button>
                <img src="assets/imgs/google_keep_logo.png" alt="logo" />
                <span>Keep</span>
            </section>
            <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </section>
        <AddNote onSaveNote={onSaveNote} />
        <NoteList notes={notes} onRemove={removeNote} isLoading={isLoading}
            onSaveNote={onSaveNote} onDuplicate={duplicateNote} />
    </section >
}

