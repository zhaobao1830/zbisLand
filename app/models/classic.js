const {
  sequelize
} = require("../../core/db")

const {
  Sequelize,
  Model
} = require("sequelize")

const classicFields = {
  image: {
    type: Sequelize.STRING // 图片
  },
  content: Sequelize.STRING, // 内容
  pubdate: Sequelize.DATEONLY, // 发布日期
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}

class Movie extends Model {
}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

class Sentence extends Model {
}

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

const musicFields = Object.assign({
  url:Sequelize.STRING
}, classicFields)

class Music extends Model {
}

Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})
module.exports = {
  Movie,
  Sentence,
  Music
}
