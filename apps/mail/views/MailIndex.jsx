import { mailService } from "../services/mail.service.js"

import { SideMailFilter, TopMailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailDetails } from "../views/MailDetails.jsx"

const { useParams, useNavigate } = ReactRouter
const { Outlet, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {

    const navigate = useNavigate()
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const mail = mailService.getEmptyEmail()

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortBy, setSortBy] = useState(mailService.getSortFromSearchParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const combinedParams = { ...filterBy, ...sortBy }
        setSearchParams(combinedParams)
        mailService.query().then(fetchedEmails => {
            const unread = fetchedEmails.filter(email => !email.isRead)
            setUnreadCount(unread.length)
        })
    }, [emails])

    useEffect(() => {
        const combinedParams = { ...filterBy, ...sortBy }
        setSearchParams(combinedParams)
        mailService.query(combinedParams).then(fetchedEmails => {
            if (sortBy.sort === 'subject') {
                fetchedEmails.sort((e1, e2) => {
                    const result = e1.subject.localeCompare(e2.subject)
                    return sortBy.order === 'dsc' ? -result : result
                })
            } else if (sortBy.sort === 'date') {
                fetchedEmails.sort((e1, e2) => {
                    const result = new Date(e1.sentAt) - new Date(e2.sentAt)
                    return sortBy.order === 'dsc' ? -result : result
                })
            }
            setEmails(fetchedEmails)
        })
    }, [filterBy, sortBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function onSetSortBy(newSort) {
        setSortBy(newSort)
    }

    async function onRemove(email) {
        const removedEmailId = email.id
        await mailService.remove(removedEmailId)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== removedEmailId))
                showSuccessMsg(`Successfully removed mail ${removedEmailId}!`)
            })
    }

    async function onUpdatedEmail(updatedMail) {
        await mailService.save(updatedMail).then(savedMail => {
            setEmails(prevEmails => prevEmails.map(mail => (mail.id === savedMail.id ? savedMail : mail)))
            return savedMail
        })
    }

    function onHomeBtnClick() {
        setFilterBy({ box: 'inbox' })
        navigate('/mail/inbox')
    }

    return (
        <section className="content-grid mail-index">
            <section className="menu-bar">
                <button className="menu-btn">
                    <i className="fa-light fa-bars"></i>
                </button>
                <img src="assets/imgs/logo_gmail.png" alt="logo" onClick={onHomeBtnClick} />
            </section>
            <TopMailFilter filterBy={filterBy} onFilter={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} />
            <SideMailFilter filterBy={filterBy} onFilter={onSetFilterBy} unreadCount={unreadCount} />
            {params.mailId && filterBy.box !== 'drafts' && <MailDetails onRemove={onRemove} onUpdatedEmail={onUpdatedEmail} filterBy={filterBy} /> || <MailList emails={emails} filterBy={filterBy} onRemove={onRemove} onUpdatedEmail={onUpdatedEmail} />}
            <Outlet context={[onUpdatedEmail, mail, onSetFilterBy, filterBy, onRemove]} />
        </section>
    )
}