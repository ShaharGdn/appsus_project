const { useState } = React

export function LongTxt({ text, length = 200 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = text.length > length
    const textToShow = isShowLong ? text : text.substring(0, length)
    return (
        <p className="long-txt">
            {textToShow + `...`}
            {isLongText && <a onClick={onToggleIsShowLong}>{isShowLong ? ' Less...' : ' More...'}</a>}
        </p>
    )
}
