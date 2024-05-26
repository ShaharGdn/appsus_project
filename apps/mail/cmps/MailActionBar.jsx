export function MailActionBar({ filterBy, onRemove, onSelectAll, onReadToggle, onBulkSnooze, isRead }) {
    return <section className="action-bar-container">
        {/* <input type="checkbox" name="" id="" onClick={onSelectAll} /> */}
        <span className="trash" onClick={onRemove}><i className="fa-light fa-trash-can"></i></span>
        {/* <span className="toggleRead" onClick={onReadToggle}>{<i className="fa-solid fa-envelope"></i>}</span> */}
        {/* <span className="toggleRead hidden" onClick={onBulkReadToggle}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span> */}
        {<span className="toggleRead" onClick={onReadToggle}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span>}
        <span className="snooze" onClick={onBulkSnooze}><i className="fa-light fa-clock"></i></span>
    </section>
}