// pages/pront/front.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handleSubmit(e){
        console.log(e);
        const building=e.detail.value.building
        const floor=e.detail.value.floor
        const contact=e.detail.value.contact
        console.log(building);
        console.log(floor)
        if(building=='') {wx.showToast({
          title: '请填写宿舍楼！',
          duration: 1000,
          mask: true,
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })}
        if(floor=='') {wx.showToast({
            title: '请填写楼层！',
            duration: 1000,
            icon:'fail',
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })}
    },

    handlePolicy(){
        wx.redirectTo({
          url: '../policy/policy?type=policy',
        })
    },
    handleUser(){
        wx.redirectTo({
          url: '../policy/policy?type=user',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})