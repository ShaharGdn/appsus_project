import { AppHeader } from "../../../cmps/AppHeader.jsx"

const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM


export function TopMailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="mail-top-filter">
        <section className="search-container">
            <input id="txt" onChange={handleChange} autoFocus name="txt" type="text" placeholder="Search mail" />
            <button type="submit"><i className="fa-light fa-magnifying-glass"></i></button>
        </section>
        <AppHeader />
    </section>
}

export function SideMailFilter({ filterBy, onFilter, unreadCount }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy || {})

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(type) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, box: type }))
    }

    return <section className="mail-side-filter">
        <Link replace to='/mail/compose'>
            <button className="compose-btn">
                <i className="fa-light fa-pencil"></i>
                Compose
            </button>
        </Link>


        <NavLink to='/mail/inbox' className="side-link inbox" onClick={() => handleChange('inbox')}>
            <i className="fa-light fa-inbox"></i>
            <span>Inbox</span>
            <span className="unread-count">{unreadCount? unreadCount : ''}</span>
        </NavLink>
        <NavLink to='/mail/starred' className="side-link" onClick={() => handleChange('starred')}>
            <i className="fa-light fa-star"></i>
            Starred
        </NavLink>
        <NavLink to='/mail/snoozed' className="side-link" onClick={() => handleChange('snoozed')}>
            <i className="fa-light fa-clock"></i>
            Snoozed
        </NavLink>
        <NavLink to='/mail/sent' className="side-link" onClick={() => handleChange('sent')}>
            <i className="fa-light fa-paper-plane-top"></i>
            Sent
        </NavLink>
        <NavLink to='/mail/trash' className="side-link" onClick={() => handleChange('trash')}>
            <i className="fa-light fa-trash-can"></i>
            Trash
        </NavLink>
        <NavLink to='/mail/drafts' className="side-link" onClick={() => handleChange('drafts')}>
            <i className="fa-light fa-file"></i>
            Drafts
        </NavLink>
        <NavLink to='/mail/labels' className="side-link">
            <i className="fa-solid fa-tag"></i>
            Labels
        </NavLink>
    </section>
}
