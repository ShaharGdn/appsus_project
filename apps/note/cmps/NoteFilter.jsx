export function NoteFilter() {

    return <section className="note-filter">
        <span>Note Filters:</span>
        <div className="content-container">
            <button><i class="fa-regular fa-magnifying-glass"></i></button>
            <input type="text" placeholder="Search content" />
        </div>

        <div className="type-container">
            <select name="rating" id="note-type">
                <option value="">Select type</option>
                <option value="1">Text Note</option>
                <option value="2">Image Note</option>
                <option value="3">Video Note</option>
                <option value="4">Check List Note</option>
            </select>
        </div>

    </section>
}