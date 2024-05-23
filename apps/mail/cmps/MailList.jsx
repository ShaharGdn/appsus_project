import { MailPreview } from "./MailPreview.jsx";

const { useState } = React

export function MailList({ emails, filterBy }) {

    const [emailList, setEmailList] = useState(emails)
    const [isFold, setFold] = useState({ readFold: false, unreadFold: false })

    if (!emails.length) {
        return <p>No emails to display</p>
    }

    function onToggleFold(type) {
        setFold(prevFoldState => {
            const updatedState = { ...prevFoldState, [type]: !prevFoldState[type] }
            console.log('updatedState:', updatedState)
            return updatedState
        })
    }

    return (
        filterBy.inbox ? (
            <section className="mail-list">
                <h3 onClick={() => onToggleFold('unreadFold')}>
                    {isFold.unreadFold? <i className="fa-light fa-chevron-down"></i> : <i class="fa-light fa-chevron-up"></i>}
                    Unread
                </h3>
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'unread'} isFold={isFold}/>
                        </li>
                    ))}
                </ul>
                <h3 onClick={() => onToggleFold('readFold')}>
                {isFold.readFold? <i className="fa-light fa-chevron-down"></i> : <i class="fa-light fa-chevron-up"></i>}
                    Everything else
                </h3>
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} type={'read'} isFold={isFold}/>
                        </li>
                    ))}
                </ul>
            </section>
        ) : (
            <section className="mail-list">
                <ul>
                    {emails.map(mail => (
                        <li key={mail.id}>
                            <MailPreview mail={mail} filterBy={filterBy} />
                        </li>
                    ))}
                </ul>
            </section>
        )
    )
}