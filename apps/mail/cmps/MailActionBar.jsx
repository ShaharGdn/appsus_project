export function MailActionBar({ filterBy, onBulkRemove, onSelectAll, onBulkReadToggle, onBulkSnooze }) {
    return <section className="action-bar-container">
        <input type="checkbox" name="" id="" onClick={onSelectAll} />
        <span className="trash" onClick={onBulkRemove}><i className="fa-light fa-trash-can"></i></span>
        <span className="toggleRead" onClick={onBulkReadToggle}>{<i className="fa-solid fa-envelope"></i>}</span>
        {/* <span className="toggleRead hidden" onClick={onBulkReadToggle}>{isRead ? <i className="fa-solid fa-envelope"></i> : <i className="fa-light fa-envelope-open"></i>}</span> */}
        <span className="snooze" onClick={onBulkSnooze}><i className="fa-light fa-clock"></i></span>
    </section>
}