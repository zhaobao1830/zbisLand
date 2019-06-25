const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  // 入口方法
  static initCore(app) {
    InitManager.initLoadRouters(app)
  }

  static initLoadRouters(app) {
  // 通过requireDirectory获取app/api/v1下的所有routers
  // visit: whenLoadModule 函数
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: whenLoadModule
    })

  // 用来判断引入的是router
    function whenLoadModule(obj) {
      if(obj instanceof Router) {
        app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager
