const { useState } = React
const { useNavigate } = ReactRouter

import { ColorPicker } from "../cmps/ColorPicker.jsx"

export function InputActionBar({ onClose, note, onChange, onRemove, onDuplicate, isEditable = false }) {
    const navigate = useNavigate()
    const [isColorOpen, setIsColorOpen] = useState(false)

    function toggleColorPicker() {
        setIsColorOpen(prevIsColorOpen => !prevIsColorOpen)
    }

    function onRemoveNote(ev) {
        onRemove(ev, note.id)
        navigate('/note')
    }

    function onDuplicateNote() {
        onDuplicate(note)
        navigate('/note')
    }

    return <section className="input-action-bar">
        <div>
            <button onClick={toggleColorPicker}>
                <i className={`fa-palette ${isColorOpen === true ? 'fa-solid' : 'fa-regular'}`}></i>
            </button>
            {isEditable && <button onClick={onDuplicateNote}><i className="fa-regular fa-copy"></i></button>}
            {isEditable && <button onClick={(ev) => onRemoveNote(ev)}>
                <i className="fa-regular fa-trash-can"></i>
            </button>}
            {isColorOpen && <ColorPicker note={note} onChange={onChange} />}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
    </section>
}


