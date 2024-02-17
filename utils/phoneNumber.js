const PREFIX_STRING = "789"
const MIDDLE_STRING = "1234567890"


export const generatePhonenumber = () => {
    let phoneNumberString = "0"
    for(let i = 0; i < 2; i++){
        phoneNumberString += PREFIX_STRING[Math.floor(Math.random() * PREFIX_STRING.length)]
    }

    for(let i = 0; i < 7; i++){
        phoneNumberString += MIDDLE_STRING[Math.floor(Math.random() * MIDDLE_STRING.length)]
    }

    return phoneNumberString;
}