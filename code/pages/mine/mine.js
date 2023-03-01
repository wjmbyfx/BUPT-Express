// pages/mine/mine.js
const {getLocation}=require('../../utils/getLocation')
const {mustSignUp}=require('../../utils/mustSignUp')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location:'',
        username:''
    },
    pending(){
        wx.navigateTo({
          url: '/pages/order/order?status=pending',
        })
    },
    delivering(){
        wx.navigateTo({
          url: '/pages/order/order?status=delivering',
        })
    },
    all(){
        wx.navigateTo({
          url: '/pages/order/order?status=all',
        })
    },

    handleSuggest(){
        wx.navigateTo({
          url: '../suggest/suggest',
        })
    },

    handleEdit(){
        wx.navigateTo({
          url: '../signup/signup',
        })
    },

    handleUser(){
        wx.navigateTo({
          url: '../policy/policy?type=user',
        })
    },

    handlePolicy(){
        wx.navigateTo({
          url: '../policy/policy?type=policy',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        wx.cloud.callFunction({name:'getImage'})
        .then(res=>{
        const src=res.result
        this.setData({src:src})})
        wx.cloud.callFunction({name:'getUser'})
        .then(res=>{
            console.log(res);
            const building=res.result.data[0].location.building
            const floor=res.result.data[0].location.floor
            let location=getLocation(building)+'楼 '+ floor+'层'
            this.setData({location:location})
            this.setData({username:res.result.data[0].username})
        })
        
        
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
        mustSignUp()
        wx.cloud.callFunction({name:'getUser'})
        .then(res=>{
            console.log(res);
            const building=res.result.data[0].location.building
            const floor=res.result.data[0].location.floor
            let location=getLocation(building)+'楼 '+ floor+'层'
            this.setData({location:location})
        })
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