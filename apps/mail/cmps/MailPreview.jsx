import { StarredMail } from "./StarredMail.jsx"

export function MailPreview({ mail }) {
    const { subject, body, isRead, sentAt, removedAt, from, to } = mail

    return (
        <article className="mail-preview">
                <input type="checkbox" />
                <StarredMail />
                <i className="fa-light fa-circle-user"></i>
                <span className="from">{from}</span>
                <span className="subject">{subject}</span>
        </article>
    )
}