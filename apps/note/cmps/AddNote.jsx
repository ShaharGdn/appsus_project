const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { NotePreview } from "./NotePreview.jsx"

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isInputActive, setIsInputActive] = useState(false)
    const [inputType, setInputType] = useState('NoteTxt')
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.size > 0) turnMailtoNote(searchParams)
    }, [])

    function turnMailtoNote(searchParams) {
        const mail = noteService.getMailFromSearchParams(searchParams)
        setIsInputActive(true)
        setNote(prevNote => ({ ...prevNote, info: { title: mail.subject, txt: mail.body } }))
    }

    function showInputBox({ target }) {
        if (target.value === '' || target.value.length > 1 || isInputActive === true) return
        setIsInputActive(true)
    }

    function changeNoteType(type) {
        setInputType(type)
        setNote(prevNote => ({ ...prevNote, type: type }))
        setIsInputActive(true)
    }

    function handleChange({ target }) {
        const { name, value } = target
        const props = name.split('.')

        if (props.length === 1) {
            setNote(prevNote => ({ ...prevNote, [props[0]]: value }))
        } else {
            setNote(prevNote => ({ ...prevNote, [props[0]]: { ...prevNote[props[0]], [props[1]]: value } }))
        }
    }

    function addNote() {
        if (!note.info.txt && !note.info.url && !note.info.videoUrl &&
            (!note.info.todos || note.info.todos.length === 0 || note.info.todos.every(todo => todo.txt === ''))) {
            resetMainInput()
            return
        }
        const createdAt = utilService.getCurrentDateTime()
        noteService.save({ ...note, createdAt: createdAt })
            .then(() => {
                resetMainInput()
                showSuccessMsg('Note added successfully.')
                onSaveNote()
            })
            .catch(() => showErrorMsg('Could not add note.'))
    }

    function resetMainInput() {
        setIsInputActive(false)
        setInputType('NoteTxt')
        setNote(prevNote => ({ ...noteService.getEmptyNote() }))
    }

    return <section className="add-note-container">
        {!isInputActive && <section className="add-note">
            <div className="input-container">
                <input className="main-input" autoFocus type="text" placeholder="Take a note..."
                    onInput={showInputBox} onClick={() => setIsInputActive(true)} />
            </div>
            <div className="add-btns">
                <button onClick={() => changeNoteType('NoteTodos')} title="New list note">
                    <i className="fa-regular fa-square-check"></i></button>
                <button onClick={() => changeNoteType('NoteImg')} title="New note with image">
                    <i className="fa-regular fa-image"></i></button>
                <button onClick={() => changeNoteType('NoteVideo')} title="New note with video">
                    <i className="fa-brands fa-youtube"></i></button>
            </div>
        </section>}
        {isInputActive && <NotePreview inputType={inputType} note={note}
            onChange={handleChange} onClose={addNote} />}
    </section>
}


