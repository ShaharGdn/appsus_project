const { useState, useEffect } = React

import { mailService } from "../../../services/email-service.js";
import { MailList } from "../cmps/MailList.jsx";

export function MailIndex() {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        mailService.query().then(fetchedEmails => {
            setEmails(fetchedEmails);
        })
    }, []) 

    return (
        <section className="content-grid mail-index">
            <h1>Emails</h1>
            <MailList emails={emails} />
        </section>
    )
}