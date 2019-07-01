const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 键
    autoIncrement: true // 自增长
  },
  nickname: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    // 观察者模式
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      // 10是位数，标识计算机计算的时候用多久，不宜太大
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user' // 自定义数据库表名
})

module.exports = {
  User
}
