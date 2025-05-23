import { inject, injectable } from "inversify";
import nodemailer from "nodemailer";
import { IEmailService } from "../interfaces/i-email-service";
import TYPES from "@/inversify/types";

@injectable()
export class EmailService implements IEmailService {
  constructor(
    @inject(TYPES.EmailTransporter) private transporter: nodemailer.Transporter
  ) {}

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const htmlContent = `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`;
    await this.transporter.sendMail({
      to,
      subject: "Your OTP Code",
      html: htmlContent,
    });
  }
}
