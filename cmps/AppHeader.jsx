const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
    const [isMenuOpen, setMenuOpen] = useState()

    function onToggleMenu() {
        setMenuOpen(!isMenuOpen)
    }

    return <section className="app-header-container">
        <button className="app-header-btn" onClick={onToggleMenu}>
            <i className="fa-solid fa-grid-round-4"></i>
        </button>

        {isMenuOpen && <section className="nav-btns">
            <NavLink to="/"><button className="home-link" onClick={onToggleMenu}><img src="assets/imgs/home_link.png" /></button></NavLink>
            <NavLink to="/mail"><button className="mail-link" onClick={onToggleMenu}><img src="assets/imgs/gmail_link.png" /></button></NavLink>
            <NavLink to="/note"><button className="note-link" onClick={onToggleMenu}><img src="assets/imgs/notes_link.png" /></button></NavLink>
            {/* <NavLink to="/about"><button className="about-link"></button></NavLink> */}
        </section>}
    </section>

}