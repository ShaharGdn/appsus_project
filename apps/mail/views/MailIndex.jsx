import { mailService } from "../services/mail.service.js";

import { SideMailFilter, TopMailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { MailDetails } from "../views/MailDetails.jsx";

const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    const params = useParams()
    const navigate = useNavigate()

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

    function onRemove(email) {
        const removedEmailId = email.id
        mailService.remove(removedEmailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== removedEmailId))
                showSuccessMsg(`Successfully removed mail ${removedEmailId}!`)
            })
    }

    function onStateChange(updatedEmails) {
        setEmails(updatedEmails)
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
            {params.mailId && <MailDetails /> || <MailList emails={emails} filterBy={filterBy} onRemove={onRemove} onStateChange={onStateChange} />}
        </section>
    )
}