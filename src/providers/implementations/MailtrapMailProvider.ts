import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port:  2525,
            auth:{
                user:'a0cb08b2d4fa1d',
                pass:'8ac7eeb00373b4'
            }
        })
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