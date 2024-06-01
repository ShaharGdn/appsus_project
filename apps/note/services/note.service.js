import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getFilterFromSearchParams,
    getDefaultFilter,
    getMailFromSearchParams,
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY, 200)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => (regExp.test(note.info.txt) || regExp.test(note.info.title)))
            }
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regExp.test(note.type))
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(note => {
            return note
        })
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.info.videoUrl) {
        const embedUrl = embedVideoUrl(note.info.videoUrl)
        note.info.videoUrl = embedUrl
    }
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}
function embedVideoUrl(videoUrl) {
    if (videoUrl.includes('embed')) return videoUrl
    const idStartIdx = (videoUrl).indexOf('=')
    const videoId = (videoUrl).substring(idStartIdx + 1)
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return embedUrl
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: '',
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title: '',
        }
    }
}

function getMailFromSearchParams(searchParams) {
    return {
        subject: searchParams.get('subject'),
        body: searchParams.get('body')
    }
}

function getFilterFromSearchParams(searchParams) {
    return {
        type: searchParams.get('type') || '',
        color: searchParams.get('color') || '',
        title: searchParams.get('title') || '',
        txt: searchParams.get('txt') || '',
        isPinned: searchParams.get('isPinned') || '',
    }
}

function getDefaultFilter(filterBy = { txt: '', type: '' }) {
    return { txt: filterBy.txt, type: filterBy.type }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#faafa8'
                },
                info: {
                    title: 'Project deadline reminder',
                    txt: 'Submit report by Friday, no exceptions.'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteImg',
                isPinned: true,
                style: {
                    backgroundColor: '#d4e4ed'
                },
                info: {
                    title: 'Special day',
                    url: 'https://picsum.photos/200'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#fff8b8'
                },
                info: {
                    title: 'Call studio',
                    txt: 'Sign up for class on Friday and check if they are willing to extend membership, ask to speak to Jenny if needed.'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#e2f6d3'
                },
                info: {
                    title: 'Get tickets',
                    videoUrl: 'https://www.youtube.com/embed/52Upr_5fusc'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteVideo',
                isPinned: true,
                style: {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    title: 'Micky\'s song',
                    videoUrl: 'https://www.youtube.com/embed/wSaDElz7wSI'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#b4ddd3'
                },
                info: {
                    title: 'Trip',
                    url: 'https://picsum.photos/201'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#f39f76'
                },
                info: {
                    title: 'Dan\'s Minestrone',
                    txt: `Heat olive oil in a large pot over medium heat.
                    Add chopped onion and minced garlic, and sauté until softened and fragrant, about 2-3 minutes. 
                    Stir in diced carrots, celery, and zucchini, and cook for another 5 minutes until slightly softened. 
                    Add canned diced tomatoes (with juices) and vegetable broth to the pot. Bring to a simmer. 
                    Once simmering, add drained and rinsed cannellini beans and pasta to the pot. Cook for about 10-12 minutes, or until the pasta is al dente. 
                    Stir in chopped spinach or kale, dried oregano, and dried basil. Let the soup simmer for another 2-3 minutes until the greens are wilted. 
                    Season the soup with salt and pepper to taste. 
                    Ladle the Vegan Minestrone Soup into bowls and garnish with fresh chopped basil. 
                    Serve hot with a sprinkle of vegan parmesan cheese on top, if desired.
                    Call Wolt.`
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#f6e2dd'
                },
                info: {
                    title: 'For cover',
                    url: 'https://picsum.photos/210'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#efeff1'
                },
                info: {
                    title: 'Vacation',
                    txt: 'Flight to New York on June 15th, hotel reservation at Hilton Times Square, Broadway show tickets for Saturday night.'
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTodos',
                isPinned: true,
                style: {
                    backgroundColor: '#b4ddd3'
                },
                info: {
                    title: 'To do:',
                    todos: [
                        { txt: 'Remember to eat', doneAt: null },
                        { txt: 'Get anxiety meds', doneAt: null },
                        { txt: 'Finish sprint', doneAt: utilService.getCurrentDateTime() },
                        { txt: 'Sleep', doneAt: null },
                        { txt: 'Feed dog', doneAt: null },
                        { txt: 'Sleep again', doneAt: null },
                    ]
                }
            },
            {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    title: 'Grocerey',
                    todos: [
                        { txt: 'Pepsi max', doneAt: null },
                        { txt: 'Tofu', doneAt: null },
                        { txt: 'Chocolate', doneAt: null },
                        { txt: 'Almonds', doneAt: null },
                        { txt: 'Granola bars', doneAt: null },
                        { txt: 'Bananas', doneAt: utilService.getCurrentDateTime() },
                        { txt: 'Bread', doneAt: null },
                    ]
                }
            },
        ]
    }
    utilService.saveToStorage(NOTE_KEY, notes)
}


