const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* email */}
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/inbox" element={<MailIndex />} />
                <Route path="/mail/starred" element={<MailIndex />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/drafts" element={<MailIndex />} />
                <Route path="/mail/snoozed" element={<MailIndex />} />
                <Route path="/mail/labels" element={<MailIndex />} />
                <Route path="/mail/trash" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={ <MailIndex /> }/>


                {/* note */}
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
