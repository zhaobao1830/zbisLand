const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

module.exports = {
  router
}

app.listen(3300)

