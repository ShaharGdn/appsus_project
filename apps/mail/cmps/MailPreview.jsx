import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { StarredMail } from "./StarredMail.jsx"

const { useState } = React
const { useNavigate } = ReactRouter

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Michal Shahar'
}

export function MailPreview({ mail, type, isFold, filterBy, onMailRemove, onStateChange }) {
    const { subject, body, isRead, sentAt, removedAt, from, isDraft, to, isSnoozed, isStarred } = mail
    const { email: fromEmail, fullname } = from
    const { email: toEmail, fullname: fullnameTo } = to

    const [newMail, setMail] = useState(mail)

    const navigate = useNavigate()

    
    if (type === 'read' && !isRead || type === 'read' && isFold.readFold) return
    if (type === 'unread' && isRead || type === 'unread' && isFold.unreadFold) return
    if (filterBy.box !== 'snoozed' && isSnoozed || filterBy.box === 'snoozed' && !isSnoozed) return
    if (filterBy.box !== 'drafts' && isDraft) return
    if (filterBy.box !== 'trash' && removedAt) return
    if (filterBy.box === 'starred' && !isStarred) return
    
    function getClassName() {
        let className = ''
        className += isRead ? ' read' : ' unread'
        if (removedAt) className += ' trash'
        if (fromEmail === loggedInUser.email) className += ' sent'
        if (to === loggedInUser.email) className += ' received'
        return className
    }

    function handleChange({ type, state }) {
        const updatedMail = { ...mail, [type]: state };
        setMail(prevMail => ({ ...prevMail, ...updatedMail }));
        onStateChange(updatedMail);
    }
    

    function onTrashClick() {
        if (filterBy.box === 'trash' || filterBy.box === 'drafts') {
            onMailRemove(mail)
        } else {
            handleChange({ type: 'removedAt', state: new Date() })
            showSuccessMsg(`Successfully sent to trash`)
        }
    }

    function onToggleRead() {
        handleChange({ type: 'isRead', state: !isRead })
    }

    function onToggleSnooze() {
        handleChange({ type: 'isSnoozed', state: !isSnoozed })
    }

    // function handleCheckboxChange() {
    //     setIsChecked(!isChecked)
    //     handleChange({ type: 'isSelected', state: !isChecked })
    // }

    function handleDraftClick() {
        if (filterBy.box === 'drafts') {
            navigate(`/mail/compose/${mail.id}`)
        } else {
            navigate(`/mail/${mail.id}`)
        }
    }

    return (
        <article className={`mail-preview ${getClassName()}`}>
            <input type="checkbox" />
            {filterBy.trash ? <i className="fa-light fa-trash-can second"></i> : <StarredMail className="second" isStarred={newMail.isStarred} handleChange={handleChange} />}
            {filterBy.box === 'drafts'? <span className="from-draft">Draft</span> : 
            filterBy.box === 'sent' ? <span className="from" onClick={handleDraftClick}>{fullnameTo}</span> : <span className="from" onClick={handleDraftClick}>{fullname}</span>} 
            {<span className="subject" onClick={handleDraftClick}>{subject}</span>}
            {<span className="body" onClick={handleDraftClick}><LongTxt txt={body} /></span>}
            <span className="sentAt">{utilService.elapsedTime(sentAt)}</span>

            <section className="inline-action">
                <span className="trash hidden" onClick={onTrashClick}><i className="fa-light fa-trash-can"></i></span>
                <span className="toggleRead hidden" onClick={onToggleRead}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>
                <span className="snooze hidden" onClick={onToggleSnooze}><i className="fa-light fa-clock"></i></span>
            </section>
        </article>
    )
}