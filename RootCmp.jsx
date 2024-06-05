const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { NoteDetails } from "./apps/note/cmps/NoteDetails.jsx"


export function App() {
    return <Router>
        <section className="app">
            {/* <AppHeader /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* email */}
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/compose" element={<MailCompose />} />
                    <Route path="/mail/compose/:mailId" element={<MailCompose />} />
                </Route >                
                {/* faux routs */}
                <Route path="/mail/:mailId" element={<MailIndex />} />
                <Route path="/mail/inbox" element={<MailIndex />} /> 
                <Route path="/mail/starred" element={<MailIndex />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/drafts" element={<MailIndex />} />
                <Route path="/mail/snoozed" element={<MailIndex />} />
                <Route path="/mail/labels" element={<MailIndex />} />
                <Route path="/mail/trash" element={<MailIndex />} />

                {/* note */}
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/:noteId" element={<NoteDetails />} />
                </Route >
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
