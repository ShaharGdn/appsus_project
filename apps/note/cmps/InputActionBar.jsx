export function InputActionBar({onClose}) {
    return <section className="input-action-bar">
        <div>
            <button><i className="fa-regular fa-palette"></i></button>
            <button><i className="fa-regular fa-copy"></i></button>
            <button><i className="fa-regular fa-trash-can"></i></button>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
    </section>
}