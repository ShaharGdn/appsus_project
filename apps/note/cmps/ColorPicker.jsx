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
                        className={`color ${note.style.backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}
