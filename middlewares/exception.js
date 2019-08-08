const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next() // 有了next，函数调用后就会触发
  } catch (error) {
    const isHttpException = error instanceof HttpException
    // 如果是生产环境下，就抛出错误
    const isDev = global.config.environment === 'dev'
    if(isDev && !isHttpException){
      throw error
    }
    // 判断error是否是HttpException
    if (isHttpException) {
      // 返回的错误信息
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 未知异常
      ctx.body = {
        msg: 'we made a mistake O(∩_∩)O~~',
        error_code: 999,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
