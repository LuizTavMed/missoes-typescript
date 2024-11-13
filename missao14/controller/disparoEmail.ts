import * as nodemailer from 'nodemailer'

// credenciais do email que envia

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: 'e857d2c9e4e538',
    pass: '7510a023d88047'
  }
})

// informação do email
function envioEmail (): void {
  transporter.sendMail({
    from: 'Luiz Fernando <luizfernandotavaresdemedeiros@gmail.com>',
    to: 'Nome do Destinatário <luizfernandosport1987@gmail.com>',
    subject: 'Sport Club do Recife',
    text: 'Pague o que você está devendo'
  }).then(() => {
    console.log('Email enviado com sucesso: ')
  }).catch((error: any) => {
    console.error(error)
  })
}

export default envioEmail
