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
  timezone: '+08:00', // 默认的时间会比正常时间慢8小时
  define: {
    // timestamps: false // 设置为false，就不会生成createdAt和updateAt了
    timestamps: true, // 管理 createdAt和updateAt
    paranoid: true, // 管理deletedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true // 把驼峰转换成下划线
  }
})

// 加了这个，才能把定义的模型同步到数据库中
sequelize.sync({
  force: false // true会自动运行，通过定义的model修改数据库中的表
})

module.exports = {
  sequelize
}
