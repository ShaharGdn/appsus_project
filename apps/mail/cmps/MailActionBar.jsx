import { StarredMail } from "./StarredMail.jsx";

export function MailActionBar({ mail, onTrashClick, handleChange }) {
    if (!mail) return

    const { isRead, isStarred, isSnoozed } = mail

    return <section className="action-bar-container">
        {/* <input type="checkbox" name="" id="" onClick={onSelectAll} /> */}
        <span className="trash" onClick={onTrashClick}><i className="fa-light fa-trash-can"></i></span>
        {<span className="toggleRead" onClick={() => handleChange({ type: 'isRead', state: !isRead })}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>}
        {<span className="snooze" onClick={() => handleChange({ type: 'isSnoozed', state: !isSnoozed })}>{isSnoozed ? <i className="fa-sharp fa-solid fa-clock"></i> : <i className="fa-light fa-clock"></i>}</span>}
        <StarredMail isStarred={isStarred} handleChange={handleChange} />
    </section>
}

