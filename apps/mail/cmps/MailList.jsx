import { MailPreview } from "./MailPreview.jsx";

export function MailList({ emails }) {
    if (!emails.length) {
        return <p>No emails to display</p>;
    }

    return (
        <section className="mail-list">
            <ul>
                {emails.map(mail => (
                    <li key={mail.id}>
                        <MailPreview mail={mail} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
