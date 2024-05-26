import { mailService } from "../services/mail.service.js"
import { mailUtilService } from "../services/mail.utilService.js"
import { MailActionBar } from "../cmps/MailActionBar.jsx"

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
                alert('Couldnt get mail...')
                navigate('/mail/inbox')
            })
    }, [params.mailId])

    if (!mail) return <section className="mail-details"></section>

    const { body, subject, from, to, sentAt, isRead, labels, isStarred, isDraft } = mail
    const { email: fromEmail, fullname } = from


    function onReadToggle() {
        const updatedMail = { ...mail, isRead: !isRead }
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

    return <section className="mail-details">
        <div className="controls-details">
            <i className="fa-light fa-arrow-left" onClick={() => navigate('/mail/inbox')}></i>
            <MailActionBar isRead={isRead} onReadToggle={onReadToggle} />
        </div>
        <h1>{subject}</h1>
        {senderDetails()}
        <p>{body}</p>
    </section>


}