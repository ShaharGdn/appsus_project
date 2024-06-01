import { utilService } from "../../../services/util.service.js"

export const mailUtilService = {
    createSender,
    formatTimestamp,
    makeEmailLorem,
    makeNamesLorem,
    getRandomPastelColor,
    createUsers
}

function createSender() {
    return {
        fullname: makeNamesLorem(),
        email: makeEmail(),
        color: getRandomPastelColor()
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

function makeEmailLorem(size = 100) {
    var emailDemoData = [
        'Guess what? Free pizza!',
        'Oops, my bad! Ignore this.',
        'Party at 7! Don’t be late.',
        'Need coffee ASAP! Help!',
        'Bring donuts! It’s urgent!',
        'Cat stole it. Seriously.',
        'Lost again? Typical, right?',
        'Oopsie daisy! My mistake.',
        'Bananas are blue! Surprise!',
        'Catch ya later, alligator!',
        'Free tacos! Yes, really!',
        'Penguins approve this message.',
        'Ninja skills needed. Stat!',
        'Got any gum? Share, please!',
        'Why not? Life’s short.',
        'Surprise inside! Open now.',
        'Hamster dance! Join in!',
        'Shiny things! Look here!',
        'Whoopsie! I did it again.',
        'Fun times ahead! Excited?',
        'Moo! Just because.',
        'Napping now. Do not disturb.',
        'You’re awesome! Just saying.',
        'Dance break! Get up!',
        'Oops, a typo! Ignore it.',
        'Mystery box! What’s inside?',
        'Bubble wrap fun! Pop away!',
        'Giggle time! Laugh out loud.',
        'High five! You deserve it.',
        'Zebra stripes! Fashion alert.',
        'Monkey business! Let’s do it.',
        'Jazz hands! Go wild!',
        'Oops, a slip! My bad.',
        'Waffle time! Bring syrup.',
        'Bingo night! Game on!',
        'Laugh track! You’re funny.',
        'Bacon alert! Frying now.',
        'Silly goose! That’s you.',
        'Pillow fort! Build one.',
        'Smile! It’s contagious.',
        'Tickle fight! You’re it!',
        'Marshmallow world! Sweet times.'
    ];
    var txt = ''
    while (size > 0) {
        size--
        txt += emailDemoData[Math.floor(Math.random() * emailDemoData.length)] + ' '
    }
    return txt
}


function makeNamesLorem(size = 1) {
    var names = [
        'Bingo Bongo',
        'Sally Sizzle',
        'Timmy Tofu',
        'Wendy Whiz',
        'Frankie Fizz',
        'Lulu Lollipop',
        'Mickey Munch',
        'Penny Pop',
        'Ricky Rocket',
        'Susie Sprinkle',
        'Tommy Tickle',
        'Micky Vanilla',
        'Billy Bongo',
        'Jenny Jellybean',
        'Nina Noodle',
        'Oscar Oodle',
        'Patty Puddle',
        'Quincy Quirk',
        'Randy Razzle',
        'Tina Tingle',
        'Spongey Squarepants',
        'Patrick Starfish',
        'Squidward Tentacles',
        'Mr. Krabs',
        'Sandy Cheeks',
        'Plankton Pickle',
        'Gary the Snail',
        'Pearl the Whale',
        'Larry the Lobster',
        'Bubble Bass',
        'Barnacle Boy',
        'Mermaid Man',
        'Flying Dutchman',
        'Mrs. Puff',
        'King Jellyfish',
        'DoodleBob',
        'Bubble Buddy',
        'Old Man Jenkins',
        'Kevin the Sea Cucumber'
    ];
    var txt = '';
    while (size > 0) {
        size--;
        txt += names[Math.floor(Math.random() * names.length)] + ' ';
    }
    return txt;
}

// function getRandomPastelColor() {
//     const r = Math.floor((Math.random() * 127) + 127);
//     const g = Math.floor((Math.random() * 127) + 127);
//     const b = Math.floor((Math.random() * 127) + 127);
//     return `rgb(${r}, ${g}, ${b})`;
// }

function getRandomPastelColor() {
    const r = Math.floor((Math.random() * 155) + 100);
    const g = Math.floor((Math.random() * 155) + 100);
    const b = Math.floor((Math.random() * 155) + 100);
    return `rgb(${r}, ${g}, ${b})`;
}

function createUsers(numUsers = 10) {
    const users = [];
    const usedNames = [];
    const usedEmails = [];

    while (users.length < numUsers) {
        const name = makeNamesLorem();
        const email = makeEmail();

        if (usedNames.indexOf(name) === -1 && usedEmails.indexOf(email) === -1) {
            usedNames.push(name);
            usedEmails.push(email);
            users.push(createSender(name, email));
        }
    }

    return users;
}
