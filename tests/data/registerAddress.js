import { v4 as uuidv4 } from "uuid"

export const registerAddress = {
    username: uuidv4().replace(/[0-9-]/g, ''),
    email: uuidv4() + "@gmail.com",
    password: uuidv4(),
    firstName: uuidv4().replace(/[0-9-]/g, ''),
    lastName: uuidv4().replace(/[0-9-]/g, ''),
    street: uuidv4(),
    postCode: uuidv4().replace(/[a-f-]/g, ''),
    city: uuidv4().replace(/[0-9-]/g, ''),
    country: "Iran",
}