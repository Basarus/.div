import axios from "axios";

export const localUrl = 'http://localhost:3000';

const $host = axios.create({
    baseURL: localUrl
})

const $authHost = axios.create({
    baseURL: localUrl
})

const authIntercepter = config => {
    config.headers.authorization = localStorage.getItem('token')
    return config
}

$authHost.interceptors.request.use(authIntercepter)

export {
    $authHost,
    $host
}