const {sequelize} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

// Flow是业务表，真正的信息存储在相应的实体表中
class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER, // 序号:比如第一期、第二期
  art_id: Sequelize.INTEGER, // 是外键，用来关联相应的实体表
})

module.exports = {
  Flow
}
