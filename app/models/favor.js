const {
  sequelize
} = require('../../core/db')

const {
  Art
} = require('./art')

const {
  Sequelize,
  Model
} = require('sequelize')

class Favor extends Model{
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (favor) {
      throw new global.errs.LikeError()
    }

    // 这是用了sequelize的事务
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {
         transaction: t
      })
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DislikeError()
    }
    // Favor 表 favor 记录
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async userLikeIt (art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type,
      }
    })
    return favor ? true : false
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}
