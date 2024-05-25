const { useState } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { InputField } from "./dynamic cmp/InputField.jsx"


export function AddNote() {

    const [note, setNote] = useState(noteService.getEmptyNote())

    const [isInputActive, setIsInputActive] = useState(false)
    const [inputType, setInputType] = useState('NoteTxt')

    function showInputBox({ target }) {
        if (target.value === '' || target.value.length > 1 || isInputActive === true) return
        setIsInputActive(true)
    }

    function setByType(type) {
        setInputType(type)
        setNote(prevNote => ({ ...prevNote, type: type }))
    }

    function handleChange({ target }) {
        console.log('target', target);
        const { name, value } = target
        const props = name.split('.')

        if (props.length === 1) {
            setNote(prevNote => ({ ...prevNote, [props[0]]: value }))
        } else {
            setNote(prevNote => ({ ...prevNote, [props[0]]: { ...prevNote[props[0]], [props[1]]: value } }))
        }
    }

    function onAddNote() {
        if (!note.info.txt && !note.info.todos && !note.info.url) {
            resetMainInput()
            return
        }
        const createdAt = utilService.getCurrentDateTime()
        noteService.save(note, createdAt)
            .then(() => {
                showSuccessMsg('Note added successfully.')
                resetMainInput()
                window.location.reload()
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
                <button onClick={() => setByType('NoteTodos')}>
                    <i className="fa-regular fa-square-check"></i></button>
                <button onClick={() => setByType('NoteImg')}>
                    <i className="fa-regular fa-image"></i></button>
                <button onClick={() => setByType('NoteVideo')}>
                    <i className="fa-brands fa-youtube"></i></button>
            </div>
        </section>}
        {isInputActive && <InputField inputType={inputType} note={note}
            onChange={handleChange} onClose={onAddNote} />}
    </section>
}


