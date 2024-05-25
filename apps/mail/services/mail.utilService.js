import { utilService } from "../../../services/util.service.js"

export const mailUtilService = {
    createSender,
    formatTimestamp
}

function createSender() {
    return {
        fullname: utilService.makeNamesLorem(),
        email: makeEmail()
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makeEmail() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"]

    const username = Math.random().toString(36).substring(2, 10)
    const domain = getRandomElement(domains)

    return `${username}@${domain}`
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Format the date and time
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const formattedDate = date.toLocaleString('en-US', options);

    // Calculate the relative time
    const now = new Date();
    const diff = now - date;

    let relativeTime;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;
    const msInMonth = 30 * msInDay; // Approximation
    const msInYear = 365 * msInDay; // Approximation

    if (diff < msInMinute) {
        relativeTime = 'just now';
    } else if (diff < msInHour) {
        const minutes = Math.floor(diff / msInMinute);
        relativeTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diff < msInDay) {
        const hours = Math.floor(diff / msInHour);
        relativeTime = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diff < msInMonth) {
        const days = Math.floor(diff / msInDay);
        relativeTime = `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diff < msInYear) {
        const months = Math.floor(diff / msInMonth);
        relativeTime = `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diff / msInYear);
        relativeTime = `${years} year${years !== 1 ? 's' : ''} ago`;
    }

    return `${formattedDate} (${relativeTime})`;
}

