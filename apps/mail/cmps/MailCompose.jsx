import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouter
const { useOutletContext } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {
    const [saveMail, onStateChange, mail] = useOutletContext()
    const [newMail, setNewMail] = useState(mail)

    if (mail.id) return 'edit'

    const newMailRef = useRef(newMail)
    newMailRef.current = newMail

    useEffect(() => {
        return () => {
            saveMail(newMailRef.current)
        }
    }, [])

    function handleChange({ type, value }) {
        setNewMail(prevMail => ({ ...prevMail, [type]: value , sentAt: new Date()}))
    }

    return (
        <div className="compose-mail">
            <section className="compose-header">
                <h1>New Message</h1>
                <section className="ctrl-btns">
                    <button className="minimize-btn"><i className="fa-solid fa-window-minimize"></i></button>
                    <button className="maximize-btn"><i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i></button>
                    <button className="close-btn"><i className="fa-solid fa-xmark"></i></button>
                </section>
            </section>
            <label htmlFor="to">
                To:
                <input 
                    type="text" 
                    id="to" 
                    onInput={(event) => handleChange({ type: 'to', value: event.target.value })} 
                />
            </label>
            <label htmlFor="subject">
                Subject:
                <input 
                    type="text" 
                    id="subject" 
                    onInput={(event) => handleChange({ type: 'subject', value: event.target.value })} 
                />
            </label>
            <label htmlFor="body">
                Body:
                <textarea 
                    id="body" 
                    className="mail-body" 
                    onInput={(event) => handleChange({ type: 'body', value: event.target.value })} 
                />
            </label>
        </div>
    );
}