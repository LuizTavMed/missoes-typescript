const config = {
  cryptography:{
    saltRounds: process.env.SALT_ROUNDS_BCRYPT
  },
  api: {
    host: process.env.HOST_API ?? 'localhost',
    port: process.env.PORT_API ?? 4000
  },
  mariadb: {
    type: 'mysql',
    productionDatabase: process.env.PRODUCTION_DATABASE_MARIADB ?? 'intranet',
    testDatabase: process.env.TEST_DATABASE_MARIADB ?? 'test',
    host: process.env.HOST_DATABASE_MARIADB ?? 'localhost',
    username: process.env.USER_DATABASE_MARIADB ?? 'root',
    password: process.env.PASSWORD_DATABASE_MARIADB ?? 'mariadb',
    port: process.env.PORT_DATABASE_MARIADB ?? 3306
  }
}

export default config
