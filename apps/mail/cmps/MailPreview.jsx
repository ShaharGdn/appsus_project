import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { mailUtilService } from "../services/mail.utilService.js"
import { StarredMail } from "./StarredMail.jsx"

const { useState, useEffect } = React
const { useNavigate } = ReactRouter

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Michal Shahar',
    color: mailUtilService.getRandomPastelColor(),
}

export function MailPreview({ mail, type, isFold, filterBy, onMailRemove, onStateChange, isAllChecked, setIsAllChecked }) {
    const { subject, body, isRead, sentAt, removedAt, from, isDraft, to, isSnoozed, isStarred } = mail
    const { email: fromEmail, fullname } = from
    const { email: toEmail, fullname: fullnameTo } = to

    const [newMail, setMail] = useState(mail)
    const [isChecked, setIsChecked] = useState(isAllChecked)

    const navigate = useNavigate()

    const shouldRender = () => {
        if ((type === 'read' && !isRead) || (type === 'read' && isFold.readFold)) return false
        if ((type === 'unread' && isRead) || (type === 'unread' && isFold.unreadFold)) return false
        if ((filterBy.box !== 'snoozed' && isSnoozed) || (filterBy.box === 'snoozed' && !isSnoozed)) return false
        if (filterBy.box !== 'drafts' && isDraft) return false
        if (filterBy.box !== 'trash' && removedAt) return false
        if (filterBy.box === 'starred' && !isStarred) return false
        return true
    }

    useEffect(() => {
        setIsChecked(isAllChecked);
    }, [isAllChecked]);

    useEffect(() => {
        return () => {
            setIsChecked(false)
            setIsAllChecked(false)
        }
    }, [])


    if (!shouldRender()) return null

    function getClassName() {
        let className = ''
        className += isRead ? ' read' : ' unread'
        if (removedAt) className += ' trash'
        if (fromEmail === loggedInUser.email) className += ' sent'
        if (to === loggedInUser.email) className += ' received'
        return className
    }

    function handleChange({ type, state }) {
        const updatedMail = { ...mail, [type]: state }
        setMail(prevMail => ({ ...prevMail, ...updatedMail }))
        onStateChange(updatedMail)
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

    function handleCheckboxChange() {
        const newCheckedState = !isChecked
        setIsChecked(newCheckedState)
        handleChange({ type: 'isSelected', state: newCheckedState })
    }

    function handleDraftClick() {
        if (filterBy.box === 'drafts') {
            navigate(`/mail/compose/${mail.id}`)
        } else {
            navigate(`/mail/${mail.id}`)
        }
    }

    return (
        <article className={`mail-preview ${getClassName()}`}>
            {filterBy.box === 'sent' ? <span className="user-icon"><i className="fa-light fa-circle-user" style={{ color: to.color }}></i></span> : <span className="user-icon"><i className="fa-light fa-circle-user" style={{ color: from.color }}></i></span>}
            <input
                type="checkbox"
                className="is-selected"
                onChange={handleCheckboxChange}
                checked={isChecked}
            />
            {filterBy.trash ? <i className="fa-light fa-trash-can second"></i> : <StarredMail className="second" isStarred={newMail.isStarred} handleChange={handleChange} />}
            {filterBy.box === 'drafts' ? <span className="from-draft">Draft</span> :
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