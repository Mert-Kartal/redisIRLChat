import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST') as string,
      port: this.configService.get('EMAIL_PORT') as number,
      secure: this.configService.get('EMAIL_SECURE') as boolean,
      auth: {
        user: this.configService.get('EMAIL_USER') as string,
        pass: this.configService.get('EMAIL_PASS') as string,
      },
    });
  }
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_FROM') as string,
      to,
      subject,
      text,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new Error('Email sending failed');
    }
  }
}
