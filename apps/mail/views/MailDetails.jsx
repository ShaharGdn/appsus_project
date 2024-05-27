import { mailService } from "../services/mail.service.js"
import { mailUtilService } from "../services/mail.utilService.js"
import { MailActionBar } from "../cmps/MailActionBar.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

export function MailDetails({ onUpdatedEmail, onRemove }) {
    const params = useParams()
    const navigate = useNavigate()

    const [mail, setMail] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
            })
            .catch(() => {
                alert(`couldn't get mail...`)
                navigate('/mail/inbox')
            })
    }, [params.mailId])

    if (!mail) return <section className="mail-details"></section>

    const { body, subject, from, to, sentAt, isRead, labels, isStarred, isDraft } = mail
    const { email: fromEmail, fullname } = from


    function handleChange({ type, state }) {
        const updatedMail = { ...mail, [type]: state }
        setMail(updatedMail)
        onUpdatedEmail(updatedMail)
    }

    function senderDetails() {
        return <section className="mail-info">
            <div className="sender-details">
                <i className="fa-light fa-circle-user"></i>
                <div>
                    <span className="name">{fullname}</span>
                    <span className="from-email">{`<${fromEmail}>`}</span>
                </div>
            </div>
            <span>{mailUtilService.formatTimestamp(sentAt)}</span>
        </section>
    }

    function onTrashClick() {
        if (mail.removedAt) {
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