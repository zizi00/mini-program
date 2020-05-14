//index.js
const app = getApp()

Page({
  data: {
    movies: [],
    loading: true
  },
  // 点击立即体验事件
  handleStart() {
    // 切换到tabbar对应的文件，必须使用wx.switchTab;切换到不是tabbar对应的文件，用wx.navigateTo
    wx.switchTab({
      url: '../board/board',
    })
  },
  // 获取缓存
  getCache() {
    return new Promise((resolve) => {
      app.wechat.getStorage('last_splash_data')
        .then(res =>{
          const {movies, expires} = res.data
          // 有缓存，判断是否过期
          if(movies && expires > Date.now()) {
            return resolve(res.data)
          }
          // 已经过期
          console.log('uncached')
          return resolve(null)
        })
        .catch(err =>{
          return resolve(null)
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getCache()
      .then(cache => {
        if(cache) {
          // 有缓存拿缓存的数据
          return this.setData({ movies: cache.movies, loading: false })
        }
        // 没有缓存，查询数据
        app.douban.find('coming_soon', 1, 2)
          .then(res =>{
            let arr = []
            arr.push(res.subjects[1])
            // console.log(res.subjects[1])
            // console.log(arr)
            this.setData({
              movies: arr,
              loading: false
            })
            app.wechat.setStorage('last_splash_data', {
              movies: arr,
              expires: Date.now() + 1 * 24 * 60 * 60 * 1000
            })
            .then(() => console.log('storage last splash data'))
          })
      })
  },
})
