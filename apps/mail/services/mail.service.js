import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from "../../../services/util.service.js"
import { mailUtilService } from './mail.utilService.js'

const MAIL_KEY = 'emailsDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Michal Shahar'
}

_createEmails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    _createEmails,
    _createEmail,
    getDefaultFilter,
    _setNextPrevEmailId,
    removeLabel,
    saveLabel,
}
// For Debug (easy access from console):
window.cs = mailService


// get the mails from ls then filter by .... using filter. return the mails
function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.from.email) ||
                    regExp.test(mail.from.fullname) ||
                    regExp.test(mail.to.fullname) ||
                    regExp.test(mail.body)
                )
            }

            if (filterBy.inbox) {
                mails = mails.filter(mail =>
                    mail.to.email === loggedInUser.email
                )
            }
            if (filterBy.sent) {
                mails = mails.filter(mail =>
                    mail.to.email !== loggedInUser.email
                )
            }
            if (filterBy.starred) {
                mails = mails.filter(mail =>
                    mail.isStarred
                )
            } 
            if (filterBy.trash) {
                mails = mails.filter(mail =>
                    mail.removedAt
                )
            } 
            if (filterBy.snoozed) {
                mails = mails.filter(mail =>
                    mail.isSnoozed
                )
            } 


            // Default sorting by sentAt in descending order (newest first)
            mails.sort((p1, p2) => p2.sentAt - p1.sentAt)

            return mails
        })
}


// using the async service get function to get a specific mail and adding next prev on the mail obj. return the mail
function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevmailId(mail)
            return mail
        })
}

// using the storage service remove with the mail key and ID
function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

// depending on whether we have a mail.id we will decide if using put or post from storage service 
function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

// an empty mail obj template
function getEmptyEmail() {
    const mail = {
        subject: '',
        body: '',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: '',
        to: ''
    }
    return mail
}

// an empty filter to initialize the filter settings
function getDefaultFilter(filterBy = { txt: '' }) {
    return { txt: filterBy.txt, inbox: true }
}

function getDefaultSort(SortBy = { date: '' }) {
    sortBy[prop] = (isDesc) ? -1 : 1
    return { date: SortBy.date }
}

// create 19 random mails. save to storage
function _createEmails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        const labels = ['Critical', 'Family', 'Work', 'Friends', 'Spam', 'Memories', 'Romantic']
        const mails = []
        for (let i = 0; i < 20; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeEmailLorem(1),
                body: utilService.makeEmailLorem(50),
                isRead: Math.random() > 0.5 ? false : true,
                sentAt: utilService.getRandomTimestamp('2024-01-01', '2024-05-22'),
                removedAt: Math.random() > 0.1 ? null : utilService.getRandomTimestamp('2024-01-01', '2024-05-22'),
                from: Math.random() > 0.1 ? mailUtilService.createSender() : loggedInUser,
                to: Math.random() > 0.1 ? loggedInUser : mailUtilService.createSender(),
                labels: [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]],
                isStarred: Math.random() > 0.8 ? true : false,
                isDraft: false,
                isSnoozed: false,
                isSelected: false,
            }
            mails.push(mail)
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    return mails
}

// create a single mail
function _createEmail() {
    const labels = ['Critical', 'Family', 'Work', 'Friends', 'Spam', 'Memories', 'Romantic']

    const mail = {
        id: utilService.makeId(),
        subject: utilService.makeEmailLorem(1),
        body: utilService.makeEmailLorem(50),
        isRead: false,
        sentAt: utilService.getRandomTimestamp('2024-01-01', '2024-05-21'),
        removedAt: null,
        from: mailUtilService.createSender(),
        to: loggedInUser.email,
        labels: [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]],
        isStarred: false,
        isDraft: false,
        isSnoozed: false,
        isSelected: false,
    }
    return mail
}

// set next prev mail id
function _setNextPrevEmailId(mail) {
    return asyncStorageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
        const nextEmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevEmail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextEmailId = nextEmail.id
        mail.prevEmailId = prevEmail.id
        return mail
    })
}

function saveLabel(mailId, label) {
    return query().then(mails => {
        const mail = mails.find((mail) => mail.id === mailId)
        mail.labels ? mail.labels : mail.labels = []
        mail.labels.unshift(label)
        _saveEmailsToStorage(mails)
        return (review)
    })
}

function removeLabel(mailId, labelName) {
    return query().then(mails => {
        const mail = mails.find((mail) => mail.id === mailId)
        const labelIdx = mail.labels.findIndex((label) => label === labelName)
        if (labelIdx !== -1) {
            mail.reviews.splice(labelIdx, 1)
            _saveEmailsToStorage(mails)
        }
        return mail
    })
}

function _saveEmailsToStorage(mails) {
    utilService.saveToStorage(MAIL_KEY, mails)
}

function _loadEmailsFromStorage() {
    return utilService.loadFromStorage(MAIL_KEY)
}