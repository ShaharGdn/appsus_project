import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { LongTxt } from "./LongTxt.jsx"
import { StarredMail } from "./StarredMail.jsx"

const { useState } = React

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export function MailPreview({ mail }) {
    const { subject, body, isRead, sentAt, removedAt, from, isStarred, to } = mail
    const { email: fromEmail, fullname } = from

    const [newMail, setMail] = useState(mail)

    // function getClassName() {
    //     let className = ''
    //     if (isRead) className += ' read'
    //     if (removedAt) className += ' trash'
    //     if (fromEmail === loggedInUser.email) className += ' sent'
    //     if (to === loggedInUser.email) className += ' received'
    //     return className
    // }

    function handleChange(state) {
        setMail(prevMail => {
            const updatedMail = { ...prevMail, isStarred: state }
            mailService.save(updatedMail)
            return updatedMail
        })
    }

    return (
        <article className={`mail-preview`}>
        {/* <article className={`mail-preview ${getClassName()}`}> */}
            <input type="checkbox" />
            <StarredMail isStarred={newMail.isStarred} handleChange={handleChange} />
            <i className="fa-light fa-circle-user"></i>
            <span className="from">{fullname}</span>
            <span className="subject">{subject}</span>
            <span className="body"><LongTxt txt={body} /></span>
            <span className="sentAt">{utilService.elapsedTime(sentAt)}</span>
        </article>
    )
}
