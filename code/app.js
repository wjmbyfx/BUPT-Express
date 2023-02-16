// app.js
App({
  onLaunch() {
    wx.cloud.init({env:'buptexpress-5goetp5o571a721f'}) //启动后初始化云环境
  },
  globalData: {
    userInfo: null
  }
})
