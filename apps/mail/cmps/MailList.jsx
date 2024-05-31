import { MailPreview } from "./MailPreview.jsx"
import { MailTopActionBar } from "./MailActionBar.jsx"

const { useState, useEffect } = React

export function MailList({ emails, filterBy, onRemove, onUpdatedEmail }) {
    const [isFold, setFold] = useState({ readFold: false, unreadFold: false })
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [emailList, setEmailList] = useState(emails)


    useEffect(() => {
        if (isAllChecked) {
            setEmailList(prevEmails => prevEmails.map(email => ({ ...email, isSelected: true })))
        } else {
            setEmailList(prevEmails => prevEmails.map(email => ({ ...email, isSelected: false })))
        }
    }, [isAllChecked])

    useEffect(() => {
        return () => {
            setIsAllChecked(false);
        }
    }, [])

    function onToggleFold(type) {
        setFold(prevFoldState => ({
            ...prevFoldState,
            [type]: !prevFoldState[type],
        }))
    }

    function onMailRemove(mail) {
        onRemove(mail)
    }

    function onNewStateChange(updatedMail) {
        setEmailList(prevEmails =>
            prevEmails.map(email => (email.id === updatedMail.id ? updatedMail : email))
        );
        onUpdatedEmail(updatedMail)
    }

    function onSelectAll() {
        const allSelected = !isAllChecked
        setIsAllChecked(allSelected)
        const updatedEmails = emails.map(email => ({ ...email, isSelected: allSelected }))
        setEmailList(updatedEmails)
        updatedEmails.forEach(onUpdatedEmail)
    }

    function onBulkRemove() {
        const selectedEmails = emailList.filter(mail => mail.isSelected);
        const updatedEmails = selectedEmails.map(email => {
            if (filterBy.trash) {
                onRemove(email)
                return null
            } else {
                const updatedMail = { ...email, removedAt: new Date() }
                onUpdatedEmail(updatedMail)
                return updatedMail
            }
        }).filter(email => email !== null)
        setEmailList(prevEmails => prevEmails.filter(email => !selectedEmails.includes(email)))
    }

    if (!filterBy.box) return null

    if (!emails.length) {
        return <p className="no-emails">No emails yet...</p>
    }

    return (
        filterBy.box === 'inbox' ? (
            <section className="mail-list">
                <MailTopActionBar onRemove={onMailRemove} onUpdatedEmail={onNewStateChange} onSelectAll={onSelectAll} onBulkRemove={onBulkRemove} />
                <h3 onClick={() => onToggleFold('unreadFold')}>
                    {isFold.unreadFold ? <i className="fa-light fa-chevron-down"></i> : <i className="fa-light fa-chevron-up"></i>}
                    Unread
                </h3>
                <ul>
                    {emails.filter(mail => !mail.isRead).map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'unread'} isFold={isFold} onMailRemove={onMailRemove} onStateChange={onNewStateChange} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />
                        </li>
                    ))}
                </ul>
                <h3 onClick={() => onToggleFold('readFold')}>
                    {isFold.readFold ? <i className="fa-light fa-chevron-down"></i> : <i className="fa-light fa-chevron-up"></i>}
                    Everything else
                </h3>
                <ul>
                    {emails.filter(mail => mail.isRead).map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'read'} isFold={isFold} onMailRemove={onMailRemove} onStateChange={onNewStateChange} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />
                        </li>
                    ))}
                </ul>
            </section>
        ) : (
            <section className="mail-list">
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} onMailRemove={onMailRemove} onStateChange={onNewStateChange} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked}/>
                        </li>
                    ))}
                </ul>
            </section>
        )
    )
}    