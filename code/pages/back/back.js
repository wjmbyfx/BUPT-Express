// pages/back/back.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    getPendingOrder(){
        wx.cloud.callFunction({name:'getOrder',data:{status:'pending'}})
        .then(res=>{
            console.log(res);
        })
    },

    getOrder(){
        wx.cloud.callFunction({name:'getOrder'})
        .then(res=>{
            console.log(res);
        })
    },

    getImage(){
        wx.cloud.callFunction({name:'getImage'}).then(res=>{
            console.log(res);
        })
    },
    
    signupc(){
        wx.cloud.callFunction({name:'signUp',data:{building:'A',floor:'3',contact:'1190'
        }}).then(res=>{
            console.log(res);
        })
    },

    isMember(){
        wx.cloud.callFunction({name:'isMember'}).then(res=>{
            console.log(res);
        })
    },
    
    getOpenID(){
        wx.cloud.callFunction({name:'getOpenID'})
        .then(res=>{
            console.log(res);
        })
    },

    sign(){
        wx.cloud.callFunction({name:"sign"}).then(res=>{
            console.log(res);
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