import { AppHeader } from "../cmps/AppHeader.jsx"
const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return <section className="home-page">
        <img src="assets/imgs/1.png" alt="" />
        <section className="hp-links">
            <NavLink to="/mail"><button className="hp-link"><img src="assets/imgs/gmail_link.png" /></button></NavLink>
            <NavLink to="/note"><button className="hp-link"><img src="assets/imgs/notes_link.png" /></button></NavLink>
        </section>
        <img src="assets/imgs/2.png" alt="" />
        <img className="footer-img" src="assets/imgs/3.png" alt="" />
        <AppHeader />
    </section>
}