export function NoteTxt({ note, onChange }) {
    return <textarea className="txt-input" autoFocus type="text"
        name="info.txt" placeholder="Take a note..."
        id="rating" rows={note.info.txt ? note.info.txt.length / 50 : null}
        value={note.info.txt || ''} onChange={onChange}></textarea>
}