const { useState } = React

import { ColorPicker } from "../cmps/ColorPicker.jsx"

export function InputActionBar({ onClose, note, onChange }) {
    const [isColorOpen, setIsColorOpen] = useState(false)

    function toggleColorPicker() {
        setIsColorOpen(prevIsColorOpen => !prevIsColorOpen)
    }

    return <section className="input-action-bar">
        <div>
            <button onClick={toggleColorPicker}><i className="fa-regular fa-palette"></i></button>
            <button><i className="fa-regular fa-copy"></i></button>
            <button><i className="fa-regular fa-trash-can"></i></button>
            {isColorOpen && <ColorPicker note={note} onChange={onChange} />}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
    </section>
}


