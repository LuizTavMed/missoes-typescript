export const config = {
  api_port: process.env.PORT_API ?? 4000,
  db: {
    username: process.env.USERNAME ?? ''
  }

}
