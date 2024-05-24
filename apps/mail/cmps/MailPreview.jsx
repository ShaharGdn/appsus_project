import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { utilService } from "../../../services/util.service.js"
import { StarredMail } from "./StarredMail.jsx"

const { useState } = React

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export function MailPreview({ mail, type, isFold, filterBy, onMailRemove, onStateChange }) {
    const { subject, body, isRead, sentAt, removedAt, from, isStarred, to } = mail
    const { email: fromEmail, fullname } = from

    const [newMail, setMail] = useState(mail)

    if (type === 'read' && !isRead || type === 'read' && isFold.readFold) return
    if (type === 'unread' && isRead || type === 'unread' && isFold.unreadFold) return
    if (!filterBy.trash && removedAt) return

    function getClassName() {
        let className = ''
        className += isRead ? ' read' : ' unread'
        if (removedAt) className += ' trash'
        if (fromEmail === loggedInUser.email) className += ' sent'
        if (to === loggedInUser.email) className += ' received'
        return className
    }

    function handleChange({ type, state }) {
        setMail(prevMail => {
            const updatedMail = { ...prevMail, [type]: state }
            onStateChange(updatedMail)
            return updatedMail
        })
    }

    function onTrashClick() {
        if (filterBy.trash) {
            onMailRemove(newMail)
        } else {
            handleChange({ type: 'removedAt', state: new Date() })
        }
    }

    return (
        <article className={`mail-preview ${getClassName()}`}>
            <input type="checkbox" />
            {filterBy.trash ? <i className="fa-light fa-trash-can second"></i> : <StarredMail className="second" isStarred={newMail.isStarred} handleChange={handleChange} />}
            <span className="from">{fullname}</span>
            <span className="subject">{subject}</span>
            <span className="body"><LongTxt txt={body} /></span>
            <span className="sentAt">{utilService.elapsedTime(sentAt)}</span>

            <section className="inline-action">
                <span className="trash hidden" onClick={onTrashClick}><i className="fa-light fa-trash-can"></i></span>
                <span className="toggleRead hidden" onClick={handleChange}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>
                <span className="snooze hidden" onClick={handleChange}><i className="fa-light fa-clock"></i></span>
            </section>
        </article>
    )
}