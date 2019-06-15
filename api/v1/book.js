const router = require('../../app')

router.get('/v1/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'classic'
  }
})
