const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next() // 有了next，函数调用后就会触发
  } catch (error) {
    // 判断error是否是HttpException
    if (error instanceof HttpException) {
      // 返回的错误信息
      ctx.body = {
        mag: error.msg,
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
