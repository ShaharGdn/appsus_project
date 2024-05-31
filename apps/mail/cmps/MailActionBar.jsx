import { StarredMail } from "./StarredMail.jsx";
const { Link } = ReactRouterDOM
const { useState } = React

export function MailActionBar({ mail, onTrashClick, handleChange, type }) {
    if (!mail) return

    const { isRead, isStarred, isSnoozed } = mail

    return <section className="action-bar-container">
        {<span className="toggleRead" onClick={() => handleChange({ type: 'isRead', state: !isRead })}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>}
        <Link to={`/note/?subject=${mail.subject}&body=${mail.body}`}><span className="to-note-btn"><i className="fa-light fa-note-sticky"></i></span></Link>
        {<span className="snooze" onClick={() => handleChange({ type: 'isSnoozed', state: !isSnoozed })}>{isSnoozed ? <i className="fa-sharp fa-solid fa-clock"></i> : <i className="fa-light fa-clock"></i>}</span>}
        <span className="trash" onClick={onTrashClick}><i className="fa-light fa-trash-can"></i></span>
        <StarredMail isStarred={isStarred} handleChange={handleChange} />
    </section>
}

export function MailTopActionBar({ mail, onBulkRemove, onUpdatedEmail, onSelectAll, emails }) {
    const [isAllChecked, setIsAllChecked] = useState(false)

    function handleChange({ type, state }) {
        const updatedMail = { ...mail, [type]: state }
        setMail(updatedMail)
        onUpdatedEmail(updatedMail)
    }

    function selectAll() {
        setIsAllChecked(prevIsAllChecked => {
            const newIsAllChecked = !prevIsAllChecked
            onSelectAll()
            return newIsAllChecked
        })
    }

    return <section className="action-bar-container">
        <input type="checkbox" name="" id="" onChange={selectAll} />
        {/* {isAllChecked && <span className="toggleRead" onClick={() => handleChange({ type: 'isRead', state: !isRead })}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>} */}
        {/* <Link to={`/note/?subject=${mail.subject}&body=${mail.body}`}><span className="to-note-btn"><i className="fa-light fa-note-sticky"></i></span></Link> */}
        {/* {<span className="snooze" onClick={() => handleChange({ type: 'isSnoozed', state: !isSnoozed })}>{isSnoozed ? <i className="fa-sharp fa-solid fa-clock"></i> : <i className="fa-light fa-clock"></i>}</span>} */}
        {isAllChecked && <span className="trash" onClick={onBulkRemove}><i className="fa-light fa-trash-can"></i></span>}
        {/* <StarredMail isStarred={isStarred} handleChange={handleChange} /> */}
    </section>
}

