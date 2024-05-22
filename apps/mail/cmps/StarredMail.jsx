import { utilService } from "../../../services/util.service.js";
const { useState, useEffect } = React

export function StarredMail({isStarred}) {

    const [isStarOn , setIsStar] = useState(isStarred)

    function onToggleStar() {
        // handleChange({ target })
        setIsStar(prevState=> (prevState)? false : true)
    }

    return (
        <div className={'starred'} >
            <span
                key={utilService.makeId()}
                className={`star ${isStarOn? 'on' : 'off'}`}
                onClick={() => onToggleStar()}
            >
                &#9733;
            </span>
        </div>
    )
}