const { useState } = React

import { NoteActionBar } from "./NoteActionBar.jsx"
import { DynamicNote } from "./dynamic notes/DynamicNote.jsx"

export function NotePreview({ isPreview, isEditable, inputType, note, onChange, onClose, onRemove, onDuplicate }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    function onTogglePin() {
        setIsPinned(prevIsPinned => {
            const newIsPinned = !prevIsPinned
            onChange({ target: { name: 'isPinned', value: newIsPinned } })
            return newIsPinned
        })
    }

    const { txt, title, url, videoUrl, todos } = note.info
    const isLongText = (txt && txt.length) > 250

    if (isPreview) {
        return <article className="note-preview">
            <h3>{title}</h3>
            {txt && <p>{isLongText ? txt.substring(0, 250) + `...` : txt}</p>}
            {url && <img src={note.info.url} alt="note image" />}
            {/* {videoUrl && <iframe className="iframe-large" width="420" height="250" src={note.info.videoUrl} frameBorder="0" allowFullScreen></iframe>} */}
            {videoUrl && <iframe className="iframe-small" width="200" height="150" src={note.info.videoUrl} frameBorder="0" allowFullScreen></iframe>}

            {todos && <ul>
                {todos.map((todo, idx) => <li key={idx}>{todo.txt}</li>)}
            </ul>}

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
            <NoteActionBar onClose={onClose} note={note} onChange={onChange} onRemove={onRemove}
                isEditable={isEditable} onDuplicate={onDuplicate} />
            <button onClick={onTogglePin}>
                <i className={`fa-thumbtack ${isPinned === true ? 'fa-solid pinned' : 'fa-regular'}`}></i>
            </button>
        </section>
    }
}

