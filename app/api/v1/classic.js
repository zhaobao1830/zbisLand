const Router = require('koa-router')
const router = new Router()

router.post('/v1/:id/classic/latest', (ctx, next) => {
  if (true) {
    // const error = new ParameterException()
    const error = new global.errs.ParameterException()
    throw error
  }

  ctx.body = {
    key: 'classic'
  }

})

module.exports = router
