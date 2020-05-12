// 微信获取本地缓存
function getStorage(key) {
  return new Promise((resolve,reject) => {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}
// 微信获取地理位置接口
function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      altitude: 'altitude',
      type: type,
      success: resolve,
      fail: reject
    })
  })
}
module.exports = {
  getLocation,
  getStorage
}