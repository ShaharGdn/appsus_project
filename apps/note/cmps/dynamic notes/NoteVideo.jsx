export function NoteVideo({ note, onChange, isEditable }) {
    return <React.Fragment>
        {isEditable && <iframe
            width="500"
            height="315"
            src={note.info.videoUrl}
            frameBorder="0"
            allowFullScreen>
        </iframe>}
        <input className="txt-input" type="text" name="info.videoUrl"
            placeholder="Video URL" value={note.info.videoUrl || ''} onChange={onChange} />
    </React.Fragment>
}