import { EmailProvider, IMessage } from "../EmailProvider";
import nodeMailer from 'nodeMailer';
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements EmailProvider {

    private transporter: Mail;

    construct() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'a5503d77bb9002',
                pass: '57ab4704dc90e4'
            }
        });
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        })
    }
}