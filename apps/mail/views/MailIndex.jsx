import { mailService } from "../services/mail.service.js"

import { SideMailFilter, TopMailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailDetails } from "../views/MailDetails.jsx"

const { useParams } = ReactRouter
const { Outlet, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const mail = mailService.getEmptyEmail()

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    // useEffect(() => {
    //     setSearchParams(filterBy)
    //     mailService.query().then(fetchedEmails => {
    //         fetchedEmails.sort((e1, e2) => new Date(e2.sentAt) - new Date(e1.sentAt))
    //         setEmails(fetchedEmails)
    //         console.log('imrerendering:')
    //     })
    // }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(fetchedEmails => {
                fetchedEmails.sort((e1, e2) => new Date(e2.sentAt) - new Date(e1.sentAt))
                setEmails(fetchedEmails)

            })
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

    async function onUpdatedEmail(updatedMail) {
        await mailService.save(updatedMail).then(savedMail => {
            setEmails(prevEmails => prevEmails.map(mail => (mail.id === savedMail.id ? savedMail : mail)));
        })
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
            {params.mailId && filterBy.box !== 'drafts' && <MailDetails onRemove={onRemove} onUpdatedEmail={onUpdatedEmail} filterBy={filterBy} /> || <MailList emails={emails} filterBy={filterBy} onRemove={onRemove} onUpdatedEmail={onUpdatedEmail} />}
            <Outlet context={[onUpdatedEmail, mail, onSetFilterBy, filterBy]} />
        </section>
    )
}