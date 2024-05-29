import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouter
const { useOutletContext, Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {
    const [saveMail, mail, onSetFilterBy, filterBy] = useOutletContext()
    const [newMail, setNewMail] = useState(mail)

    const params = useParams()
    const navigate = useNavigate()

    const newMailRef = useRef(newMail)
    newMailRef.current = newMail

    useEffect(() => {
        if (params.mailId) {
            const mailId = params.mailId
            mailService.get(mailId).then(editMail => {
                setNewMail(editMail)
                newMailRef.current = editMail
            })
        }
    }, [params.mailId])

    useEffect(() => {
        return () => {
            saveMail(newMailRef.current).then(() => {
                onSetFilterBy({ box: filterBy.box })
            })
        }
    }, [saveMail, onSetFilterBy, filterBy.box])


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
        const updatedMail = { ...newMailRef.current, [prop]: value, sentAt: new Date() }
        setNewMail(updatedMail)
        newMailRef.current = updatedMail
    }


    function onClose() {
        navigate(`/mail/${filterBy.box}`)
    }

    function onSend() {
        const updatedMail = { ...newMailRef.current, isDraft: false, sentAt: new Date() }
        setNewMail(updatedMail)
        newMailRef.current = updatedMail
        saveMail(newMailRef.current).then(() => {
            navigate(`/mail/${filterBy.box}`)
        })
    }

    return (
        <div className="compose-mail">
            <section className="compose-header">
                <h1>New Message</h1>
                <section className="ctrl-btns">
                    <button className="minimize-btn"><i className="fa-solid fa-window-minimize"></i></button>
                    <button className="maximize-btn"><i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i></button>
                    <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                </section>
            </section>
            <section className="compose-inputs">
                <div className="input-group">
                    <label htmlFor="to">To</label>
                    <input
                        type="text"
                        id="to"
                        name="to"
                        onInput={handleChange}
                        value={newMail.to || ''}
                    />
                </div>
                <hr className="horizontal-line" />
                <div className="input-group">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        onInput={handleChange}
                        value={newMail.subject}
                        placeholder="Subject"
                    />
                </div>
                <hr className="horizontal-line" />
                <textarea
                    id="body"
                    className="mail-body"
                    name="body"
                    onInput={handleChange}
                    value={newMail.body}
                />
            </section>
            <section className="bottom-ctrls">
                <Link to={`/mail/${filterBy.box}`}><button className="send-btn" onClick={onSend}>Send</button></Link>
            </section>
        </div>
    );
}