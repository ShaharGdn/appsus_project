const { useState, useEffect } = React

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
    </section>
}

export function SideMailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="mail-side-filter">
        <button className="compose-btn">
            <i className="fa-light fa-pencil"></i>
            Compose
        </button>

        <a className="side-link">
            <i className="fa-light fa-inbox"></i>
            Inbox
        </a>
        <a className="side-link">
            <i className="fa-light fa-star"></i>
            Starred
        </a>
        <a className="side-link">
            <i className="fa-light fa-clock"></i>
            Snoozed
        </a>
        <a className="side-link">
            <i className="fa-light fa-paper-plane-top"></i>
            Sent
        </a>
        <a className="side-link">
            <i className="fa-light fa-file"></i>
            Drafts
        </a>
        <a className="side-link">
            <i className="fa-solid fa-tag"></i>
            Labels
        </a>
    </section>
}
