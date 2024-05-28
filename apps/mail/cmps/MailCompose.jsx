import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouter
const { useOutletContext } = ReactRouterDOM
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
            })
        }
    }, [params.mailId])

    useEffect(() => {
        return () => {
            saveMail(newMailRef.current)
            onSetFilterBy({ box: filterBy.box })
            // onSetFilterBy({ box: 'inbox' })
        }
    }, [])


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
        // onSetFilterBy({ box: 'inbox' })
        navigate(`/mail/${filterBy.box}`)
        // navigate('/mail/inbox')
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
                    {/* <label htmlFor="subject">Subject</label> */}
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
        </div>
    );
}