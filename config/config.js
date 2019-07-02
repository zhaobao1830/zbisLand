module.exports = {
  environment: 'dev',
  database:{
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'x5219438'
  },
  security:{
    secretKey: "abcdefg",
    expiresIn: 60*60*24*30
  }
}
