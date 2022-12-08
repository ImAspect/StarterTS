import nodemailer from 'nodemailer'

export async function mail(to: string, subject: string, text: string) {
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const details = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    text: text,
  }

  return mailTransporter.sendMail(details)
}
