import axios from "axios";

const localUrl = 'http://localhost:3000';

const $host = axios.create({
    baseURL: localUrl
})

const $authHost = axios.create({
    baseURL: localUrl
})

const authIntercepter = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
}

$authHost.interceptors.request.use(authIntercepter)

export {
    $authHost,
    $host
}