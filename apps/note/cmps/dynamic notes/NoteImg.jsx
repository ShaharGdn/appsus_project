export function NoteImg({ note, onChange, isEditable }) {
    return <React.Fragment>
        {isEditable && <img src={note.info.url} alt="note image" />}
        <input className="txt-input" type="text" name="info.url"
            placeholder="Image URL" value={note.info.url || ''} onChange={onChange} />
    </React.Fragment>
}