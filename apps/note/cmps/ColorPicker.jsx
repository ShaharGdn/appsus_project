export function ColorPicker({ note, onChange }) {
    const colors = [
        '#fff',
        '#faafa8',
        '#f39f76',
        '#fff8b8',
        '#e2f6d3',
        '#b4ddd3',
        '#d4e4ed',
        '#aeccdc',
        '#d3bfdb',
        '#f6e2dd',
        '#e9e3d4',
        '#efeff1',
    ]

    const imgs = [
        'none',
        'url(https://www.gstatic.com/keep/backgrounds/food_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/grocery_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/music_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/recipe_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/notes_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/places_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/travel_light_0614.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/video_light_0609.svg)',
        'url(https://www.gstatic.com/keep/backgrounds/celebration_light_0714.svg)',
    ]

    function onSetBackgroundImg(img) {
        const target = { name: 'style.backgroundImage', value: img }
        onChange({ target })
    }

    function onSetColor(color) {
        const target = { name: 'style.backgroundColor', value: color }
        onChange({ target })
    }

    return (
        <section className="color-input">
            <div className="color-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`color ${note.style.backgroundColor === color ? 'chosen' : ''} 
                        ${color === '#fff' ? 'blank' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>

            <div className="bg-img-container">
                {imgs.map((img, idx) => (
                    <div
                        key={idx}
                        className={`bg-img ${note.style.backgroundImage === img ? 'chosen' : ''}
                        ${img === 'none' ? 'blank' : ''}`}
                        style={{ backgroundImage: img }}
                        onClick={() => onSetBackgroundImg(img)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}


// export function ColorPicker({ note, onChange }) {
//     const colors = [
//         '#fff',
//         '#faafa8',
//         '#f39f76',
//         '#fff8b8',
//         '#e2f6d3',
//         '#b4ddd3',
//         '#d4e4ed',
//         '#aeccdc',
//         '#d3bfdb',
//         '#f6e2dd',
//         '#e9e3d4',
//         '#efeff1',
//     ]

//     function onSetColor(color) {
//         const target = { name: 'style.backgroundColor', value: color }
//         onChange({ target })
//     }

//     return (
//         <section className="color-input">
//             <div className="color-container">
//                 {colors.map(color => (
//                     <div
//                         key={color}
//                         className={`color ${note.style.backgroundColor === color ? 'chosen' : ''}`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => onSetColor(color)}
//                     >
//                     </div>
//                 ))}
//             </div>
//         </section >
//     )
// }
