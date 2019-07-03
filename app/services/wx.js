const util = require('util')
const axios = require('axios')
const config = require('../../config/config')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)

    const result = await axios.get(url)
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if (errcode){
      throw new global.errs.AuthFailed('openid获取失败:'+errmsg)
    }
  }
}

module.exports = {
  WXManager
}
