import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configs } from "../configs/configs";
import { emailConstants } from "../constants/email.constants";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailTypeToPayloadType } from "../types/email-type-to-payload.type";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: configs.SMPT_EMAIL,
      auth: {
        user: configs.SMPT_EMAIL,
        pass: configs.SMPT_PASSWORD,
      },
    });

    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
          layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        },
        viewPath: path.join(process.cwd(), "src", "templates", "views"),
        extName: ".hbs",
      }),
    );
  }
  public async sendEmail<T extends EmailTypeEnum>(
    type: T,
    to: string,
    context: EmailTypeToPayloadType[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type];

    context["frontUrl"] = configs.FRONTEND_URL;
    const options = {
      to,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
