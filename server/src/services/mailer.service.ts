import nodemailer from "nodemailer";

export class MailerService {
  private static instance: MailerService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });
  }

  public static getInstance(): MailerService {
    if (!MailerService.instance) {
      MailerService.instance = new MailerService();
    }

    return MailerService.instance;
  }

  public async sendMail(
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    await this.transporter.sendMail({
      from: "",
      to,
      subject,
      text,
    });
  }
}
