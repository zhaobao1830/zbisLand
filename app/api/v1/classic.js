const Router = require('koa-router')
const router = new Router()
const { HttpException } = require('../../../core/http-exception')

router.post('/v1/:id/classic/latest', (ctx, next) => {

  const path = ctx.params  // 获取的是:id里的值
  const query = ctx.request.query // 获取的是?param的值
  const headers = ctx.request.header // header传递的值
  const body = ctx.request.body // body里的值，json格式

  if (true) {
    const error = new HttpException('为什么错误', 10000, 400)
    throw error
  }

  ctx.body = {
    key: 'classic'
  }

})

module.exports = router
