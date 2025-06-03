import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Client } from "../clients/entities/client.entity";
import { Notification } from "../notifications/entities/notification.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(client: Client) {
    const url = `${process.env.API_URL}/api/clients/activate/${client.activationLink}`;

    await this.mailerService.sendMail({
      to: client.email,
      subject: "Welcome to Smart Navbat",
      template: "./confirmation",
      context: {
        name: client.fullName.split(" ")[0],
        url,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendMailByNotification(notification: Notification, client: Client) {
    await this.mailerService.sendMail({
      to: client.email,
      subject: "Notification Smart Navbat",
      template: "./notification",
      context: {
        clientId: client.id,
        message: "Sizga yangi xabar bor!",
        via: "email",
        status: "sent",
        sentAt: new Date(Date.now()),
      },
    });
  }

  async sendMailNewTicket(info:object, email:string) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Siz Yangi navbat oldingiz",
      template: "./ticket",
      context: info
    });
  }

  async sendMailComeTicket(info:object, email:string) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Sizning navbatingiz chaqirildi",
      template: "./called-ticket",
      context: info
    });
  }
}
