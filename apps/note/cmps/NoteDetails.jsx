const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { useOutletContext } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { NotePreview } from "./NotePreview.jsx"

export function NoteDetails() {
    const [onRemove, onSaveNote, onDuplicate] = useOutletContext()
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEdited, setIsEdited] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        setIsLoading(true)
        noteService.get(params.noteId)
            .then(note => {
                setNote(note)
            })
            .catch(() => {
                showErrorMsg('Could not get note.')
                navigate('/note')
            })
            .finally(() => setIsLoading(false))

    }, []) // params.noteId ?

    function handleChange({ target }) {
        // console.log('target from details:', target);
        setIsEdited(true)
        const { name, value } = target
        const props = name.split('.')

        if (props.length === 1) {
            setNote(prevNote => ({ ...prevNote, [props[0]]: value }))
        } else {
            setNote(prevNote => ({ ...prevNote, [props[0]]: { ...prevNote[props[0]], [props[1]]: value } }))
        }
    }

    function onCloseEdit() {
        if (!isEdited) {
            navigate('/note')
            return
        }
        saveEditedNote()
    }

    function saveEditedNote() {
        const createdAt = utilService.getCurrentDateTime()
        // noteService.save(note, createdAt)
        noteService.save({ ...note, createdAt: createdAt })
            .then(() => {
                showSuccessMsg('Note edited successfully.')
                navigate('/note')
                onSaveNote()
                // resetMainInput()
            })
            .catch(() => showErrorMsg('Could not edit note.'))
    }

    if (isLoading) return <span className="note-loader">Loading Note... </span>

    return <section className="details-container">
        <section className="details-screen"></section>
        <NotePreview isEditable={true} inputType={note.type} note={note} onChange={handleChange}
            onClose={onCloseEdit} onRemove={onRemove} onDuplicate={onDuplicate} />
    </section>

}