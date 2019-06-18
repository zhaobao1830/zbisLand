const Koa = require('koa')
const requireDirectory = require('require-directory')
const Router = require('koa-router')

const app = new Koa()

// 通过requireDirectory获取app/api/v1下的所有routers
// visit: whenLoadModule 函数
const modules = requireDirectory(module, './app/api/v1', {
  visit: whenLoadModule
})

// 用来判断引入的是router
function whenLoadModule(obj) {
  if(obj instanceof Router) {
    app.use(obj.routes())
  }
}

app.listen(3300)

