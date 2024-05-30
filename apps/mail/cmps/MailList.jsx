import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./MailPreview.jsx";
import { MailActionBar } from "./MailActionBar.jsx";

const { useState } = React

export function MailList({ emails, filterBy, onRemove, onUpdatedEmail }) {
    const [isFold, setFold] = useState({ readFold: false, unreadFold: false })

    if (!filterBy.box) return

    if (!emails.length) {
        return <p className="no-emails">No emails yet...</p>
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

    async function onNewStateChange(updatedMail) {
        onUpdatedEmail(updatedMail)
    }

    return (
        filterBy.box === 'inbox' ? (
            <section className="mail-list">
                <h3 onClick={() => onToggleFold('unreadFold')}>
                    {isFold.unreadFold ? <i className="fa-light fa-chevron-down"></i> : <i className="fa-light fa-chevron-up"></i>}
                    Unread
                </h3>
                <ul>
                    {emails.filter(mail => !mail.isRead).map(mail => (
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
                    {emails.filter(mail => mail.isRead).map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'read'} isFold={isFold} onMailRemove={onMailRemove} onStateChange={onNewStateChange} />
                        </li>
                    ))}
                </ul>
            </section>
        ) : (
            <section className="mail-list">
                <MailActionBar />
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