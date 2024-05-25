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
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => (regExp.test(note.info.txt) || regExp.test(note.info.title)) )
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

function save(note, createdAt) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        note.createdAt = createdAt
        return asyncStorageService.post(NOTE_KEY, note)
    }
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

function getFilterFromSearchParams(searchParams) {
    return {
        type: searchParams.get('type') || '',
        color: searchParams.get('color') || '',
        color: searchParams.get('title') || '',
    }
}

function getDefaultFilter(filterBy = { txt: '', type: '' }) {
    return { txt: filterBy.txt, type: filterBy.type }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        for (let i = 0; i < 5; i++) {

            const colors = [
                '#fff',
                '#faafa8',
                '#f39f76',
                '#fff8b8',
                '#e2f6d3',
                '#b4ddd3',
                '#d4e4ed',
                '#aeccdc',
                '#d3bfdb',
                '#f6e2dd',
                '#e9e3d4',
                '#f6e2dd',
                '#efeff1',
            ]

            const note = {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: colors[utilService.getRandomIntInclusive(0, colors.length - 1)]
                },
                info: {
                    title: utilService.makeLorem(2),
                    txt: utilService.makeLorem(utilService.getRandomIntInclusive(2, 10))
                }
            }
            notes.push(note)
        }
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

