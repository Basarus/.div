import { $authHost, $host } from ".";

export const registration = async (name, email, password) => {
    const response = await $host.post('/auth/registration', {name, email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/auth/login', {email, password})
    return response
}

// export const check = async () => {
//     const response = await $host.post('/auth/registration', {})
//     return response
// }