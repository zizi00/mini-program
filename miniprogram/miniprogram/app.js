//app.js
/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')
/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('./utils/baidu.js')
App({
  data: {
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '北京'
  },
  wechat: wechat,
  baidu: baidu,
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wechat.getLocation()
      .then(res => {
        const {latitude, longitude} = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        // console.log(name)   // 深圳市
        this.data.currentCity = name.replace('市', '')
        console.log('currentCity:' + this.data.currentCity)  // 深圳
      })
      .catch(err => {
        this.data.currentCity = '北京'   // 如果获取不到当前位置，默认为北京
        console.error(err)
      })
  }
})
