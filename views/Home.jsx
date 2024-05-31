import { AppHeader } from "../cmps/AppHeader.jsx"
const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return <section className="home-page">
        <header className="main-header">
            <img src="assets/imgs/appsus-logo.png" />
            <AppHeader />
        </header>
        <main>
        <h1>Welcome to AppSus!</h1>
        <p>Navigate to our apps</p>
        <section className="hp-links">
            <NavLink to="/mail"><button className="hp-link"><img src="assets/imgs/gmail_link.png" /></button></NavLink>
            <NavLink to="/note"><button className="hp-link"><img src="assets/imgs/notes_link.png" /></button></NavLink>
        </section>
        </main>
    </section>
}