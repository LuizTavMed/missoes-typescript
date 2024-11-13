import * as nodemailer from 'nodemailer'

// credenciais do email que envia

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'e857d2c9e4e538',
    pass: '7510a023d88047'
  }
})

// informação do email
transporter.sendMail({
  from: 'luizfernandotavaresdemedeiros@gmail.com',
  to: 'luizfernandosport1987@gmail.com',
  subject: 'pegue pelo amor',
  text: 'Conteúdo do Email'
}).then(() => {
  console.log('Email enviado com sucesso: ')
}).catch((error: any) => {
  console.error('Deu errado', error)
})
