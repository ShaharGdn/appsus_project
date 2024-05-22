const { useState, useEffect } = React

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        mailService.query().then(fetchedEmails => {
            setEmails(fetchedEmails);
        })
    }, [])

    useEffect(() => {
        mailService.query(filterBy)
            .then(fetchedEmails => setEmails(fetchedEmails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return (
        <section className="content-grid mail-index">
            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            <MailList emails={emails} />
        </section>
    )
}