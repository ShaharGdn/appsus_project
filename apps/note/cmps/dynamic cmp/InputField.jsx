import { InputActionBar } from "../InputActionBar.jsx"

export function InputField({ isEditable, inputType, note, onChange, onClose }) {

    return <section className="input-field-container" style={note.style}>
        <input className="title-input" type="text" name="info.title"
            placeholder="Title" value={note.info.title || ''} onChange={onChange} />
        <DynamicInput cmpType={inputType} note={note} onChange={onChange} />
        {isEditable && <span className="edit-time">Edited: {note.createdAt}</span>}
        <InputActionBar onClose={onClose} note={note} onChange={onChange} />

        <button><i className="fa-regular fa-thumbtack"></i></button>
    </section>
}

function DynamicInput(props) {
    switch (props.cmpType) {
        case 'NoteTxt':
            return <TxtInput {...props} />
        case 'NoteTodos':
            return <TodosInput {...props} />
        case 'NoteImg':
            return <ImgInput {...props} />
        case 'NoteVideo':
            return <VideoInput {...props} />
    }
}

function TxtInput({ note, onChange }) {
    return <textarea className="txt-input" autoFocus type="text"
        name="info.txt" placeholder="Take a note..."
        id="rating" rows={note.info.txt ? note.info.txt.length / 60 : null}
        value={note.info.txt || ''} onChange={onChange}></textarea>
}

function TodosInput({ name, handleClick }) {
    return <h1 onClick={handleClick}>Bye <u>{name}</u></h1>
}

function ImgInput({ name }) {
    return <h1>Welcome back <u>{name}</u></h1>
}

function VideoInput({ name }) {
    return <h1>Welcome back <u>{name}</u></h1>
}


