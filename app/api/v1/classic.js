const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

// auth也是一个中间件，一定要写在后面的中间件前面，这样才能阻止后面的中间件
// 可以在new Auth()里传递值，确定访问当前接口需要什么权限
router.get('/latest', new Auth(2).m, async (ctx, next) => {

  const v = new PositiveIntegerValidator().validate(ctx)
  // parsed 是否取解析后的参数，默认为 true
  // http://doc.cms.7yue.pro/lin/server/koa/validator.html#%E4%BD%BF%E7%94%A8
  const id = await v.get('path.id', parsed = false) // path、query、body、header
  ctx.body = {
    msg: 'success',
    id: v.get('path.id')
  }
})

module.exports = router
