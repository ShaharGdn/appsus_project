import { utilService } from "../../../services/util.service.js"
const { useState, useEffect } = React

export function StarredMail({ isStarred, handleChange }) {

    const [isStarOn, setIsStar] = useState(isStarred)

    useEffect(() => {
        setIsStar(isStarred)
    }, [isStarred])

    function onToggleStar() {
        const newStarState = !isStarOn
        setIsStar(newStarState)
        handleChange({ type: 'isStarred', state: newStarState })
    }

    return (
        <div className={'starred'} >
            <span
                key={utilService.makeId()}
                className={`star ${isStarOn ? 'on' : 'off'}`}
                onClick={onToggleStar}
            >
                &#9733;
            </span>
        </div>
    )
}
