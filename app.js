const Koa = require('koa')

const app = new Koa()

// 应用程序对象 有很多中间件

// 发送HTTP KOA 接收HTTP(使用中间件，中间件实际就是函数)

// 注册
app.use(async (ctx, next) => {
  // ctx 上下文
  console.log('1')
  const a = next()
  console.log(a)
  console.log('2')
})

app.use(async (ctx, next) => {
  console.log('3')
  console.log('4')
  return 'abc'
})

app.listen(3300)

