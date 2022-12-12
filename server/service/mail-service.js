const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport( {
            host: process.env.SNMP_HOST,
            port: process.env.SNMP_PORT,
            secure: false,
            auth: {
                user: process.env.SNMP_USER,
                pass: process.env.SNMP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail( {
            from: process.env.SNMP_USER,
            to,
            subject: 'Активация аккаунта на '+ process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>>
                `

        })

    }

}

module.exports = new MailService();