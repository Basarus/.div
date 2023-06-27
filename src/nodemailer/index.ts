import * as nodemailer from 'nodemailer';

let transporter = null;

export function load() {
    try {
        transporter = nodemailer.createTransport({
            host: process.env.POSTMAIL_HOST,
            port: Number(process.env.POSTMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.POSTMAIL_LOGIN,
                pass: process.env.POSTMAIL_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        console.log('Почтовый сервис успешно загружен')
    } catch (error) {
        console.error('Почтовый сервис не загрузился')
        console.log(error)
    }

}



export async function sendMail(email: string, name: string, question: string, answer: string) {
    try {
        const info = await transporter.sendMail({
            from: `"Администратор 👻" <div@gmail.com>'`,
            to: `${name}, ${email}`,
            subject: "Ответ на Ваш вопрос",
            text: `Здравствуйте!\nАдминистратор ответил на ваш вопрос\nВы: ${question}\nАдминистратор:${answer}\nСпасибо за то что спрашиваете у нас!`,
        });
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}

