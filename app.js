const Koa = require('koa')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const book = require('./app/api/v1/book')
const classic = require('./app/api/v1/classic')

const app = new Koa()

const modules = requireDirectory(module, './app/api/v1', {
  visit: whenLoadModule
})

function whenLoadModule(obj) {
  if(obj instanceof Router) {
    app.use(obj.routes())
  }
}

// app.use(book.routes())
// app.use(classic.routes())

app.listen(3300)

