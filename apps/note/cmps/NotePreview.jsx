export function NotePreview({ note }) {
    const { txt, title } = note.info
    const isLongText = txt.length > 250

    return <article className="note-preview">
        <h3>{title}</h3>
        <p>{isLongText ? txt.substring(0, 250) + `...` : txt}</p>
    </article>
}

