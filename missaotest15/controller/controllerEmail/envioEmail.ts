import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'e857d2c9e4e538',
    pass: '7510a023d88047'
  }
})
// corrigir
async function envioEmail (to: string, subject: string, text: string): Promise<void> {
  console.log(`Enviando email para: ${to}`)
  console.log(`Assunto: ${subject}`)
  console.log(`Conteudo: ${text}`)
  await transporter.sendMail({
    from: 'Luiz Fernando <luizfernandosport1987@gmail.com>',
    to,
    subject,
    text
  }).then(() => {
    console.log('Email enviado com sucesso')
  }).catch((error: any) => {
    console.error(error)
  })
}

export default envioEmail
