const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

// auth也是一个中间件，一定要写在后面的中间件前面，这样才能阻止后面的中间件
router.get('/latest', new Auth().m, async (ctx, next) => {

  const v = new PositiveIntegerValidator().validate(ctx)
  const id = await v.get('path.id', parsed = false) // path、query、body、header
  ctx.body = {
    msg: 'success',
    id: v.get('path.id')
  }
})

module.exports = router
