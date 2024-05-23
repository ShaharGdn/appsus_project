import { InputActionBar } from "../InputActionBar.jsx"

export function InputField({ inputType }) {
    return <section className="input-field-container">
        <input className="title-input" type="text"
            placeholder="Title" />
        <DynamicInput cmpType={inputType} />
        {/* <input className="txt-input" autoFocus type="text"
            placeholder="Take a note..." /> */}
        <InputActionBar />
        <button><i className="fa-regular fa-thumbtack"></i></button>
    </section>
}

function DynamicInput(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'txt':
            console.log('txt input');
            return <TxtInput {...props} />
        case 'todos':
            return <TodosInput {...props} />
        case 'img':
            return <ImgInput {...props} />
        case 'video':
            return <VideoInput {...props} />
    }
}

function TxtInput({ name }) {
    // console.log('props inside TxtInput:', props)
    return <input className="txt-input" autoFocus type="text"
        placeholder="Take a note..." name="info.txt"/>
}

function TodosInput({ name, handleClick }) {
    return <h1 onClick={handleClick}>Bye <u>{name}</u></h1>
}

function ImgInput({ name }) {
    return <h1>Welcome back <u>{name}</u></h1>
}

function VideoInput({ name }) {
    return <h1>Welcome back <u>{name}</u></h1>
}
