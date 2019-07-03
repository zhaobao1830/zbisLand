module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'x5219438'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60*60*24*30
  },
  wx: {
    appId: 'wxe82771f4021e1e28',
    appSecret: 'ed8844cb1dd37bb60c8e8f4c13e942a6',
    loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
