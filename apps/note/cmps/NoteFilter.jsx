const { useState, useEffect, useRef } = React

export function NoteFilter({ filterBy, onFilter }) {
    const initialFilterBy = useRef(filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name } = target
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [name]: value }))
    }

    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }

    return <section className="note-filter">
        <span></span>
        <div className="content-container">
            <button><i className="fa-regular fa-magnifying-glass"></i></button>
            <input type="text" placeholder="Search" value={filterByToEdit.txt}
                onChange={handleChange} name="txt" />
        </div>

        <div className="type-container">
            <select name="type" value={filterByToEdit.type} onChange={handleChange}>
                <option className="type-opt" value="">Type</option>
                <option value="NoteTxt">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">List</option>
            </select>
        </div>
        <button className="reset-btn" onClick={reset}>Clear</button>
    </section>
}