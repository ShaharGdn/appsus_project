import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./MailPreview.jsx";

const { useState } = React

export function MailList({ emails, filterBy, onRemove, onStateChange }) {
    const [isFold, setFold] = useState({ readFold: false, unreadFold: false })
    const [emailList, setEmails] = useState(emails)

    if (!emails.length) {
        return <p>No emails to display</p>
    }

    function onToggleFold(type) {
        setFold(prevFoldState => {
            const updatedState = { ...prevFoldState, [type]: !prevFoldState[type] }
            return updatedState
        })
    }

    function onMailRemove(mail) {
        onRemove(mail)
    }

    function onNewStateChange(updatedMail) {
        mailService.save(updatedMail)
        const updatedEmails = emails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
        )
        onStateChange(updatedEmails)
    }

    return (
        filterBy.inbox ? (
            <section className="mail-list">
                <h3 onClick={() => onToggleFold('unreadFold')}>
                    {isFold.unreadFold ? <i className="fa-light fa-chevron-down"></i> : <i className="fa-light fa-chevron-up"></i>}
                    Unread
                </h3>
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'unread'} isFold={isFold} onMailRemove={onMailRemove} onStateChange={onNewStateChange} />
                        </li>
                    ))}
                </ul>
                <h3 onClick={() => onToggleFold('readFold')}>
                    {isFold.readFold ? <i className="fa-light fa-chevron-down"></i> : <i className="fa-light fa-chevron-up"></i>}
                    Everything else
                </h3>
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'read'} isFold={isFold} onMailRemove={onMailRemove} onStateChange={onNewStateChange} />
                        </li>
                    ))}
                </ul>
            </section>
        ) : (
            <section className="mail-list">
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} onMailRemove={onMailRemove} onStateChange={onNewStateChange} />
                        </li>
                    ))}
                </ul>
            </section>
        )
    )
}