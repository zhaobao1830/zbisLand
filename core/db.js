const { Sequelize } = require('sequelize')

const {
  dbName,
  host,
  port,
  username,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, username, password, {
  dialect:'mysql', // 数据库类型
  host,
  port,
  logging: true, // 记录操作的sql语句
  timezone: '+08:00' // 默认的时间会比正常时间慢8小时
})

module.exports = {
  dn: sequelize
}
