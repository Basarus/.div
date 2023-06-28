import { $authHost, $host } from ".";

export const registration = async (name, email, password) => {
    const response = await $host.post('/auth/registration', {name, email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/auth/login', {email, password})
    return response
}

export const sendQuestions = async (message) => {
    const response = await $authHost.post('/answer/create', {message})
    return response
}

export const getQuestions = async () => {
    const response = await $authHost.get('/answer/all')
    return response
}

export const sendAnswer = async (id, message) => {
    const response = await $authHost.post(`/answer/${id}`, {message})
    return response
}

// export const check = async () => {
//     const response = await $host.post('/auth/registration', {})
//     return response
// }