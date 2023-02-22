// pages/hall/hall.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:null,
        ordertext:null,
        array:null,
        location:null,
        scheduledtime:null,
        status:null,
        starttime:null
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({
            name:'getOrder'

        })
        .then(res=>{
            console.log(res);
            this.setData({array:res.result.data})
            if(res.result.data[0].status=='pending') this.setData({status:'等待确认'})
            else if(res.result.data[0].status=='delivering') this.setData({status:'派送中'})
            else if(res.result.data[0].status=='success') this.setData({status:'已完成'})
            else if(res.result.data[0].status=='fail') this.setData({status:'出错'})
            
        })
          

        wx.cloud.callFunction({name:'getImage'})
        .then(res=>{
        const src=res.result
        this.setData({src:src})
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
        const mustSignUp=require('../../utils/mustSignUp')
        mustSignUp();
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