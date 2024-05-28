import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouter
const { useOutletContext } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {
    const [saveMail, onStateChange, mail, onSetFilterBy] = useOutletContext()
    const [newMail, setNewMail] = useState(mail)

    if (mail.id) return 'edit'

    const newMailRef = useRef(newMail)
    newMailRef.current = newMail

    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            saveMail(newMailRef.current)
            onSetFilterBy({ box: 'inbox' })
        }
    }, [saveMail, onSetFilterBy])


    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setNewMail(prevMail => ({ ...prevMail, [prop]: value, sentAt: new Date() }))
    }

    function onClose() {
        onSetFilterBy({ box: 'inbox' })
        navigate('/mail/inbox')
    }

    return (
        <div className="compose-mail">
            <section className="compose-header">
                <h1>New Message</h1>
                <section className="ctrl-btns">
                    <button className="minimize-btn"><i className="fa-solid fa-window-minimize"></i></button>
                    <button className="maximize-btn"><i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i></button>
                    <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                    {/* <button className="close-btn" onClick={() => navigate('/mail/inbox')}><i className="fa-solid fa-xmark"></i></button> */}
                </section>
            </section>
            <label htmlFor="to">
                To:
                <input
                    type="text"
                    id="to"
                    name="to"
                    onInput={handleChange}
                    value={mail.to}
                />
            </label>
            <label htmlFor="subject">
                Subject:
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    onInput={handleChange}
                    value={mail.subject}
                />
            </label>
            <label htmlFor="body">
                Body:
                <textarea
                    id="body"
                    className="mail-body"
                    name="body"
                    onInput={handleChange}
                    value={mail.body}
                />
            </label>
        </div>
    );
}