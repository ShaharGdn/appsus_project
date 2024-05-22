const { useState, useEffect } = React

export function AddNote() {

    const [isInputActive, setIsInputActive] = useState(false)

    function showInputBox({ target }) {
        if (target.value === '' || target.value.length > 1 || isInputActive === true) return
        setIsInputActive(true)

    }

    return <section className="add-note">
        <div className="input-container">
            <input className="txt-input" autoFocus type="text"
                placeholder="Take a note..." onInput={showInputBox} onClick={() => setIsInputActive(true)} />
                

        </div>
        <div className="add-btns">
            <button><i className="fa-regular fa-square-check"></i></button>
            <button><i className="fa-regular fa-image"></i></button>
            <button><i className="fa-brands fa-youtube"></i></button>
        </div>
    </section>
}

