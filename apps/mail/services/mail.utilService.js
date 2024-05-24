import { utilService } from "../../../services/util.service.js"

export const mailUtilService = {
    createSender
}

function createSender() {
    return {
        fullname: utilService.makeNamesLorem(),
        email: makeEmail()
    }
}

function makeEmail() {
    return `${utilService.makeLorem(1)}@gmail.com`
}