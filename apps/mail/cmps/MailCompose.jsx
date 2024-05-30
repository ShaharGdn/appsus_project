import { useLayoutEffect } from "react"
import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouter
const { useOutletContext, Link, NavLink, useSearchParams } = ReactRouterDOM

const { useState, useEffect, useRef } = React

// export function MailCompose() {
//     const params = useParams()
//     const navigate = useNavigate()


//     const [searchParams, setSearchParams] = useSearchParams()
//     const [saveMail, mail, onSetFilterBy, filterBy, onRemove] = useOutletContext()

//     const [newMail, setNewMail] = useState(mail)
//     const [openState, setOpenState] = useState('full')

//     const newMailRef = useRef(newMail)
//     newMailRef.current = newMail

//     const noteSubject = mailService.getNoteFromSearchParams(searchParams).subject
//     const noteBody = mailService.getNoteFromSearchParams(searchParams).body


//     useEffect(() => {
//         if (noteSubject || noteBody) {
//             setSearchParams(mailService.getNoteFromSearchParams(searchParams))
//             setNewMail(prevMail => ({ ...prevMail, subject: noteSubject, body: noteBody }))
//         }
//     }, [])

//     useEffect(() => {
//         setSearchParams(mailService.getNoteFromSearchParams(searchParams))
//         if (params.mailId) {
//             const mailId = params.mailId
//             mailService.get(mailId).then(editMail => {
//                 setNewMail(editMail)
//                 newMailRef.current = editMail
//             })
//         }
//     }, [params.mailId])

//     useEffect(() => {
//         setSearchParams(mailService.getNoteFromSearchParams(searchParams))
//         return () => {
//             if (noteSubject || noteBody) return
//             if (newMailRef.current.removedAt) return
//             if (newMailRef.current.body.length >= 1 || newMailRef.current.subject.length >= 1) {
//                 saveMail(newMailRef.current).then(() => {
//                     onSetFilterBy({ box: filterBy.box })
//                 })
//             }
//         }
//     }, [saveMail, onSetFilterBy, filterBy.box])


//     function handleChange({ target }) {
//         const { type, name: prop } = target
//         let { value } = target

//         switch (type) {
//             case 'range':
//             case 'number':
//                 value = +value
//                 break;
//             case 'checkbox':
//                 value = target.checked
//                 break;
//         }
//         const updatedMail = { ...newMailRef.current, [prop]: value, sentAt: new Date() }
//         setNewMail(updatedMail)
//         newMailRef.current = updatedMail
//     }


//     function onClose() {
//         navigate(`/mail/${filterBy.box}`)
//     }

//     function onSend() {
//         if (!newMailRef.current.body.length || !newMailRef.current.subject.length) return
//         const updatedMail = { ...newMailRef.current, isDraft: false, sentAt: new Date() }
//         setNewMail(updatedMail)
//         newMailRef.current = updatedMail
//         saveMail(newMailRef.current).then(() => {
//             navigate(`/mail/${filterBy.box}`)
//         })
//     }

//     function onDiscard() {
//         const updatedMail = { ...newMailRef.current, removedAt: new Date() }
//         setNewMail(updatedMail)
//         newMailRef.current = updatedMail
//         navigate(`/mail/${filterBy.box}`)
//         if (params.mailId) {
//             onRemove(newMailRef.current)
//         }
//         return
//     }

//     return (
//         <div className={`compose-mail ${openState}`}>
//             <section className="compose-header">
//                 <h1>New Message</h1>
//                 <section className="ctrl-btns">
//                     <button className="minimize-btn" onClick={() => setOpenState(openState === 'mini' ? 'open' : 'mini')}><i className="fa-solid fa-window-minimize"></i></button>
//                     <button className="maximize-btn" onClick={() => setOpenState(openState === 'full' ? 'open' : 'full')}><i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i></button>
//                     <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
//                 </section>
//             </section>
//             <section className="compose-inputs">
//                 <div className="input-group">
//                     <label htmlFor="to">To</label>
//                     <input
//                         type="text"
//                         id="to"
//                         name="to"
//                         onInput={handleChange}
//                         value={newMail.to || ''}
//                     />
//                 </div>
//                 <hr className="horizontal-line" />
//                 <div className="input-group">
//                     <input
//                         type="text"
//                         id="subject"
//                         name="subject"
//                         onInput={handleChange}
//                         value={newMail.subject || ''}
//                         placeholder="Subject"
//                     />
//                 </div>
//                 <hr className="horizontal-line" />
//                 <textarea
//                     id="body"
//                     className="mail-body"
//                     name="body"
//                     onInput={handleChange}
//                     value={newMail.body || ''}
//                 />
//             </section>
//             <section className="bottom-ctrls">
//                 <Link to={`/mail/${filterBy.box}`}><button className="send-btn" onClick={onSend}>Send</button></Link>
//                 <div>
//                     <Link to={`/note/?subject=${newMail.subject}&body=${newMail.body}`}><button className="to-note-btn"><i className="fa-regular fa-note-sticky"></i></button></Link>
//                     <Link to={`/mail/${filterBy.box}`}><button className="exit-btn" onClick={onDiscard}><i className="fa-regular fa-trash-can"></i></button></Link>
//                 </div>
//             </section>
//         </div>
//     );
// }


export function MailCompose() {
    const params = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [saveMail, mail, onSetFilterBy, filterBy, onRemove] = useOutletContext()

    const [newMail, setNewMail] = useState(mail)
    const [openState, setOpenState] = useState()

    const newMailRef = useRef(newMail)
    newMailRef.current = newMail

    const noteSubject = mailService.getNoteFromSearchParams(searchParams).subject
    const noteBody = mailService.getNoteFromSearchParams(searchParams).body

    useEffect(() => {
        if (noteSubject || noteBody) {
            setNewMail(prevMail => ({ ...prevMail, subject: noteSubject, body: noteBody }))
        }
        // return () => {
        //     console.log('hello:')
        //     if (newMailRef.current.removedAt) return
        //     if (newMailRef.current.body.length >= 1 || newMailRef.current.subject.length >= 1) 
        //     saveMail(newMailRef.current).then(() => {
        //         onSetFilterBy({ box: filterBy.box })
        //     })
        // }
        return () => {
            if (newMailRef.current.removedAt) return
            if (newMailRef.current.body.length >= 1 || newMailRef.current.subject.length >= 1) {
                const updatedMail = { ...newMailRef.current, sentAt: new Date() , isRead: true}
                setNewMail(updatedMail)
                saveMail(updatedMail).then(() => {
                    onSetFilterBy({ box: filterBy.box })
                })
            }
        }
    }, [])


    useEffect(() => {
        if (params.mailId) {
            const mailId = params.mailId
            mailService.get(mailId).then(editMail => {
                setNewMail(editMail)
                newMailRef.current = editMail
            })
        }
    }, [params.mailId])

    // useEffect(() => {
    //     return () => {
    //         if (noteSubject || noteBody) return
    //         if (newMailRef.current.removedAt) return
    //         if (newMailRef.current.body.length >= 1 || newMailRef.current.subject.length >= 1) {
    //             saveMail(newMailRef.current).then(() => {
    //                 onSetFilterBy({ box: filterBy.box })
    //             })
    //         }
    //         onClose()
    //     }
    // }, [noteSubject, noteBody, saveMail, onSetFilterBy, filterBy.box])

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        const updatedMail = { ...newMailRef.current, [prop]: value, sentAt: new Date() , isRead: true}
        setNewMail(updatedMail)
        newMailRef.current = updatedMail
    }

    function onClose() {
        navigate(`/mail/${filterBy.box}`)
    }

    function onSend() {
        if (!newMailRef.current.body.length || !newMailRef.current.subject.length) return
        const updatedMail = { ...newMailRef.current, isDraft: false, sentAt: new Date() , isRead: true}
        setNewMail(updatedMail)
        newMailRef.current = updatedMail
        saveMail(newMailRef.current).then(() => {
            navigate(`/mail/${filterBy.box}`)
        })
    }

    function onDiscard() {
        const updatedMail = { ...newMailRef.current, removedAt: new Date() , isRead: true}
        setNewMail(updatedMail)
        newMailRef.current = updatedMail
        navigate(`/mail/${filterBy.box}`)
        if (params.mailId) {
            onRemove(newMailRef.current)
        }
    }

    return (
        <form className={`compose-mail ${openState}`}>
            <section className="compose-header">
                <h1>New Message</h1>
                <section className="ctrl-btns">
                    <button className="minimize-btn" onClick={() => setOpenState(openState === 'mini' ? 'open' : 'mini')}><i className="fa-solid fa-window-minimize"></i></button>
                    <button className="maximize-btn" onClick={() => setOpenState(openState === 'full' ? 'open' : 'full')}><i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i></button>
                    <button className="close-btn" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                </section>
            </section>
            <section className="compose-inputs">
                <div className="input-group">
                    <label htmlFor="to">To</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        onInput={handleChange}
                        value={newMail.to || ''}
                        required
                    />
                </div>
                <hr className="horizontal-line" />
                <div className="input-group">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        onInput={handleChange}
                        value={newMail.subject || ''}
                        placeholder="Subject"
                    />
                </div>
                <hr className="horizontal-line" />
                <textarea
                    id="body"
                    className="mail-body"
                    name="body"
                    onInput={handleChange}
                    value={newMail.body || ''}
                />
            </section>
            <section className="bottom-ctrls">
                <Link to={`/mail/${filterBy.box}`}><button className="send-btn" onClick={onSend} type="submit">Send</button></Link>
                <div>
                    <Link to={`/note/?subject=${newMail.subject}&body=${newMail.body}`}><button className="to-note-btn"><i className="fa-regular fa-note-sticky"></i></button></Link>
                    <Link to={`/mail/${filterBy.box}`}><button className="exit-btn" onClick={onDiscard}><i className="fa-regular fa-trash-can"></i></button></Link>
                </div>
            </section>
        </form>
    )
}