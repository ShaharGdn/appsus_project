const { useState } = React

import { InputActionBar } from "./InputActionBar.jsx"

export function NotePreview({ isPreview, isEditable, inputType, note, onChange, onClose, onRemove }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    function onTogglePin() {
        setIsPinned(prevIsPinned => {
            const newIsPinned = !prevIsPinned
            onChange({ target: { name: 'isPinned', value: newIsPinned } })
            return newIsPinned
        })
    }

    const { txt, title, url } = note.info
    const isLongText = (txt && txt.length) > 250

    if (isPreview) {
        return <article className="note-preview">
            <h3>{title}</h3>
            {txt && <p>{isLongText ? txt.substring(0, 250) + `...` : txt}</p>}
            {url && <img src={note.info.url} alt="note image" />}
            <button>
                <i className={`fa-thumbtack ${isPinned === true ? 'fa-solid pinned' : 'fa-regular'}`}></i>
            </button>
        </article>
    } else {
        return <section className="input-field-container" style={note.style}>
            <input className="title-input" type="text" name="info.title"
                placeholder="Title" value={note.info.title || ''} onChange={onChange} />
            <DynamicNote cmpType={inputType} note={note} onChange={onChange} isEditable={isEditable} />
            {isEditable && <span className="edit-time">Edited: {note.createdAt}</span>}
            <InputActionBar onClose={onClose} note={note} onChange={onChange} onRemove={onRemove} isEditable={isEditable} />

            <button onClick={onTogglePin}>
                <i className={`fa-thumbtack ${isPinned === true ? 'fa-solid pinned' : 'fa-regular'}`}></i>
            </button>
        </section>
    }
}

function DynamicNote(props) {
    switch (props.cmpType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
    }
}

function NoteTxt({ note, onChange }) {
    return <textarea className="txt-input" autoFocus type="text"
        name="info.txt" placeholder="Take a note..."
        id="rating" rows={note.info.txt ? note.info.txt.length / 50 : null}
        value={note.info.txt || ''} onChange={onChange}></textarea>
}

function NoteTodos({ name, handleClick }) {
    return <h1 onClick={handleClick}>Bye <u>{name}</u></h1>
}

function NoteImg({ note, onChange, isEditable }) {
    return <React.Fragment>
        {isEditable && <img src={note.info.url} alt="note image" />}
        <input className="txt-input" type="text" name="info.url"
            placeholder="Image URL" value={note.info.url || ''} onChange={onChange} />
    </React.Fragment>
}

function NoteVideo({ name }) {
    return <h1>Welcome back <u>{name}</u></h1>
}


