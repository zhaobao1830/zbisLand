const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
  // 为何要在new RegisterValidator()前面加await，而且使用lin-validator-v2？
  /**
   * 因为RegisterValidator里validateEmail方法中的User.findOne是一个Promise异步操作，
   * 不加await的话，无法阻止错误，还是会执行后面的代码，引起系统报错
   */
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }

  User.create(user)
})

module.exports = router
