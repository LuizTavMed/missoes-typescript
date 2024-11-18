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
function envioEmail (): void {
  transporter.sendMail({
    from: 'Luiz Fernando <luizfernandosport1987@gmail.com>',
    to: 'admin <luizfernandotavaresdemedeiros@gmail.com>',
    subject: 'Troca de Senha',
    text: 'O codigo para a troca de senha é: '
  }).then(() => {
    console.log('Email enviado com sucesso: ')
  }).catch((error: any) => {
    console.error(error)
  })
}

export default envioEmail
