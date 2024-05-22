const { useState } = React

export function LongTxt({ txt, length = 50 }) {
    const shortTxt = txt.substring(0, length)
    const [text, setText] = useState(shortTxt)

    // function getFullTxt() {
    //     setText(text.length === txt.length ? shortTxt : txt)
    // }

    // function getMsg() {
    //     return text.length === txt.length ? ' ...Read less' : ' ...Read more'
    // }

    return <p className="long-txt">
        <span style={{ textTransform: 'lowercase' }}>
            <span className="upper">{text.split(' ')[0]} </span>
            {text.substring(text.indexOf(' ') + 1)}...
        </span>
        {/* <span className='read-more' onClick={getFullTxt}>{getMsg()}</span> */}
    </p>
}
