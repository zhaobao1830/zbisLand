const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  Auth
} = require('../../../middlewares/auth')
const {
  Flow
} = require("../../models/flow")
const {
  Art
} = require('../../models/art')
const {
  Favor
} = require('../../models/favor')
const {
  PositiveIntegerValidator
} = require('../../validators/validator')

// auth也是一个中间件，一定要写在后面的中间件前面，这样才能阻止后面的中间件
// 可以在new Auth()里传递值，确定访问当前接口需要什么权限  new Auth(2)
router.get('/latest', new Auth().m, async (ctx, next) => {

  // const v = new PositiveIntegerValidator().validate(ctx)
  // // parsed 是否取解析后的参数，默认为 true
  // // http://doc.cms.7yue.pro/lin/server/koa/validator.html#%E4%BD%BF%E7%94%A8
  // const id = await v.get('path.id', parsed = false) // path、query、body、header
  // ctx.body = {
  //   msg: 'success',
  //   id: v.get('path.id')
  // }

  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(
    flow.art_id, flow.type, ctx.auth.uid
  )
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

router.get('/:index/next', new Auth().m, async (ctx) => {
  const v = new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      id: index + 1
    }
  })
  if (!Flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likeNext = await Favor.userLikeIt(
    flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeNext)
  // art.exclude = ['index','like_status']
  ctx.body = art
})

module.exports = router
