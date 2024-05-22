const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="mail-filter">
        <section className="filter-by">
            <input id="txt" onChange={handleChange} autoFocus name="txt" type="text" placeholder="Search in mail"/>
        </section>
    </section>
}