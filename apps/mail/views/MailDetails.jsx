import { mailService } from "../services/mail.service.js"
import { mailUtilService } from "../services/mail.utilService.js"
import { MailActionBar } from "../cmps/MailActionBar.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

export function MailDetails({ onUpdatedEmail, onRemove, filterBy }) {
    const params = useParams()
    const navigate = useNavigate()

    const [mail, setMail] = useState(null)

    useEffect(() => {
        mailService.get(params.mailId)
            .then(mail => {
                const readMail = { ...mail, isRead: true }
                setMail(readMail)
                onUpdatedEmail(readMail)
            })
            .catch(() => {
                alert(`couldn't get mail...`)
                navigate('/mail/inbox')
            })
    }, [params.mailId])

    if (!mail) return <section className="mail-details"></section>

    const { body, subject, from, to, sentAt, isRead, labels, isStarred, isDraft } = mail
    const { email: fromEmail, fullname } = from
    const { email: toEmail, fullname: fullnameTo } = to


    function handleChange({ type, state }) {
        const updatedMail = { ...mail, [type]: state }
        setMail(updatedMail)
        onUpdatedEmail(updatedMail)
    }

    function senderDetails() {
        return <section className="mail-info">
            <div className="sender-details">
            <span className="user-icon"><i className="fa-light fa-circle-user" style={{ color: from.color }}></i></span>
                <div>
                    <span className="name">{fullname}</span>
                   {filterBy.box === 'sent' ? <span className="from-email">{`<${toEmail}>`}</span> : <span className="from-email">{`<${fromEmail}>`}</span>}
                </div>
            </div>
            <span className="sent-at">{mailUtilService.formatTimestamp(sentAt)}</span>
        </section>
    }

    function onTrashClick() {
        if (filterBy.box === 'trash') {
            onRemove(mail)
        } else {
            handleChange({ type: 'removedAt', state: new Date() })
            showSuccessMsg(`Successfully sent to trash`)
        }
        navigate('/mail/inbox')
    }

    return <section className="mail-details">
        <div className="controls-details">
            <i className="fa-light fa-arrow-left" onClick={() => navigate('/mail/inbox')}></i>
            <MailActionBar mail={mail} handleChange={handleChange} onTrashClick={onTrashClick} />
        </div>
        <h1>{subject}</h1>
        {senderDetails()}
        <p>{body}</p>
    </section>


}