export function AddNote() {
    return <section className="add-note">
        <h3>Take a note...</h3>
        <div className="note-type">
            <button><i className="fa-regular fa-square-check"></i></button>
            <button><i className="fa-regular fa-image"></i></button>
            <button><i className="fa-brands fa-youtube"></i></button>
            {/* <i className="fa-regular fa-square-check"></i>
            <i className="fa-regular fa-image"></i>
            <i className="fa-brands fa-youtube"></i> */}
        </div>
    </section>

}