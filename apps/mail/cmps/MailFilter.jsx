import { AppHeader } from "../../../cmps/AppHeader.jsx"

const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM


export function TopMailFilter({ onFilter, onSetSortBy }) {
    const [isSortByOpen, setSortByOpen] = useState(false)
    const [isAscending, setSortOrder] = useState()

    function handleChange({ target }, kind) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        if (kind === 'filter') {
            onFilter(prevFilterBy => ({ 
                ...prevFilterBy,
                 [name]: value 
                })) 
        } else {
            setSortOrder(!isAscending)
            onSetSortBy(prevSortBy => ({
                ...prevSortBy,
                [name]: value,
                order: isAscending ? 'asc' : 'dsc'
            }))
        }
    }

    return <section className="mail-top-filter">
        <section className="search-container">
            <input id="txt" onChange={(ev)=> handleChange(ev, 'filter')} autoFocus name="txt" type="text" placeholder="Search mail" />
            <button type="submit"><i className="fa-light fa-magnifying-glass"></i></button>
        </section>
        <div className={`sort-by-container ${isSortByOpen? 'sort-by-open' : ''}`}>
            <button className="sort-by" onClick={() => setSortByOpen(!isSortByOpen)}>
                <i className="fa-light fa-filter-list"></i>
            </button>
            {isSortByOpen && <section className="sort-by-btns">
                <span>Sort By:</span>
                <button className="sort-btn" onClick={()=>handleChange({target: {name:'sort', value:'subject'}})}>Subject</button>
                <button className="sort-btn"onClick={()=>handleChange({target: {name:'sort', value:'date'}})}>Date</button>
            </section>}
        </div>
        <img className='user-img' src="assets/imgs/sg.jpeg" alt="user image" />
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
                <span>Compose</span>
            </button>
        </Link>


        <NavLink to='/mail/inbox' className="side-link inbox" onClick={() => handleChange('inbox')}>
            <i className="fa-light fa-inbox"></i>
            <span>Inbox</span>
            <span className="unread-count">{unreadCount ? unreadCount : ''}</span>
        </NavLink>
        <NavLink to='/mail/starred' className="side-link" onClick={() => handleChange('starred')}>
            <i className="fa-light fa-star"></i>
            <span>Starred</span>
        </NavLink>
        <NavLink to='/mail/snoozed' className="side-link" onClick={() => handleChange('snoozed')}>
            <i className="fa-light fa-clock"></i>
            <span>Snoozed</span>
        </NavLink>
        <NavLink to='/mail/sent' className="side-link" onClick={() => handleChange('sent')}>
            <i className="fa-light fa-paper-plane-top"></i>
            <span>Sent</span>
        </NavLink>
        <NavLink to='/mail/trash' className="side-link" onClick={() => handleChange('trash')}>
            <i className="fa-light fa-trash-can"></i>
            <span>Trash</span>
        </NavLink>
        <NavLink to='/mail/drafts' className="side-link" onClick={() => handleChange('drafts')}>
            <i className="fa-light fa-file"></i>
            <span>Drafts</span>
        </NavLink>
        <NavLink to='/mail/labels' className="side-link">
            <i className="fa-solid fa-tag"></i>
            <span>Labels</span>
        </NavLink>
    </section>
}
