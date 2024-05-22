export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getRandomTimestamp,
    saveToStorage,
    loadFromStorage,
    makeEmailLorem,
    makeNamesLorem,
    elapsedTime
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeEmailLorem(size = 100) {
    var emailDemoData = [
        'Hello',
        'Hi',
        'Dear',
        'Greetings',
        'I hope this message finds you well',
        'Thank you for your email',
        'Regarding our last conversation',
        'I am writing to inform you',
        'Please find attached',
        'If you have any questions',
        'Feel free to reach out',
        'Looking forward to your response',
        'Best regards',
        'Sincerely',
        'Yours faithfully',
        'Kind regards',
        'Thank you',
        'Best wishes',
        'Please let me know',
        'I appreciate your time',
        'Thank you for your consideration',
        'I will follow up',
        'Have a great day',
        'Cheers',
        'Stay safe',
        'Best',
        'Talk to you soon',
        'Warm regards',
        'Looking forward to hearing from you',
        'I am available for a meeting',
        'Please confirm receipt',
        'Attached you will find',
        'Thank you for your prompt response',
        'If you need any further information',
        'Please let me know if you need anything else',
        'I appreciate your help',
        'I will be out of the office',
        'I will be back on',
        'Thank you for your patience',
        'I apologize for any inconvenience',
        'I hope to hear from you soon',
        'It was a pleasure meeting you',
        'Thank you for your time and consideration',
        'I am looking forward to our next meeting',
        'Let me know if you have any questions',
        'Please do not hesitate to contact me'
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += emailDemoData[Math.floor(Math.random() * emailDemoData.length)] + ' '
    }
    return txt
}

function makeNamesLorem(size = 1 ){
    var names = [
        'Alice Johnson',
        'Bob Smith',
        'Charlie Brown',
        'David Wilson',
        'Eva Green',
        'Frank Harris',
        'Grace Lee',
        'Hannah Scott',
        'Ian Thompson',
        'Jack White',
        'Katie Lewis',
        'Liam Turner',
        'Mia Adams',
        'Noah Clark',
        'Olivia Hall',
        'Paul Martinez',
        'Quincy Wright',
        'Rachel King',
        'Samuel Young',
        'Tina Baker'
      ]
      var txt = ''
      while (size > 0) {
          size--
          txt += names[Math.floor(Math.random() * names.length)] + ' '
      }
      return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getRandomTimestamp(start, end) {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    const randomTimestamp = Math.floor(Math.random() * (endDate - startDate + 1)) + startDate;

    return new Date(randomTimestamp);
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function elapsedTime(pastMs) {
    const now = new Date()
    const pastDate = new Date(pastMs)
    const secondsPast = Math.round((now - pastDate) / 1000)

    if (secondsPast < 60 * 5) return 'just now'

    const minutesPast = Math.floor(secondsPast / 60)
    if (minutesPast < 60) return pastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const hoursPast = Math.floor(minutesPast / 60)
    if (hoursPast < 24) return pastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const nowYear = now.getFullYear()
    const pastYear = pastDate.getFullYear()

    if (nowYear === pastYear) {
        return `${getMonthName(pastDate)} ${pastDate.getDate()}`
    } else {
        const day = String(pastDate.getDate()).padStart(2, '0')
        const month = String(pastDate.getMonth() + 1).padStart(2, '0')
        const year = String(pastDate.getFullYear()).slice(-2)
        return `${day}/${month}/${year}`
    }
}