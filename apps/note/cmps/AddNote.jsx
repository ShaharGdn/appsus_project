import { InputField } from "./dynamic cmp/InputField.jsx"

const { useState, useEffect } = React

export function AddNote() {

    const [isInputActive, setIsInputActive] = useState(false)
    const [inputType, setInputType] = useState('txt')

    function showInputBox({ target }) {
        if (target.value === '' || target.value.length > 1 || isInputActive === true) return
        setIsInputActive(true)
    }

    return <section>
        {!isInputActive && <section className="add-note">
            <div className="input-container">
                <input className="main-input" autoFocus type="text"
                    placeholder="Take a note..." onInput={showInputBox} onClick={() => setIsInputActive(true)} />
            </div>
            <div className="add-btns">
                <button onClick={() => setInputType('todos')}><i className="fa-regular fa-square-check"></i></button>
                <button onClick={() => setInputType('img')}><i className="fa-regular fa-image"></i></button>
                <button onClick={() => setInputType('video')}><i className="fa-brands fa-youtube"></i></button>
            </div>
        </section>}
        {isInputActive && <InputField inputType={inputType} />}
    </section>

}


