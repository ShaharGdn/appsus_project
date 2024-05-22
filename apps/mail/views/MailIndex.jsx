import { mailService } from "../services/mail.service.js";

import { SideMailFilter, TopMailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";

const { useState, useEffect } = React

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        mailService.query().then(fetchedEmails => {
            fetchedEmails.sort((p1, p2) => new Date(p2.sentAt) - new Date(p1.sentAt))
            setEmails(fetchedEmails)
        })
    }, [])

    useEffect(() => {
        mailService.query(filterBy)
            .then(fetchedEmails => {
                fetchedEmails.sort((p1, p2) => new Date(p2.sentAt) - new Date(p1.sentAt))
                setEmails(fetchedEmails)
            });
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return (
        <section className="content-grid mail-index">
            <section className="menu-bar">
                <button className="menu-btn">
                    <i className="fa-light fa-bars"></i>
                </button>
                <img src="assets/imgs/logo_gmail.png" alt="logo" />
            </section>
            <TopMailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            <SideMailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            <MailList emails={emails} />
        </section>
    )
}