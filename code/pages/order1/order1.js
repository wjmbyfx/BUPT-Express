// pages/order1/order1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },
    getSelectedOrder(e){
        // console.log(e.currentTarget.dataset._id);
        const selectedOrder=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail1/detail1?_id='+selectedOrder
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'postmanGetOrder',data:{
            status:'pending'
        }}).then(res=>{
            const orderList=res.result.data
            orderList.forEach((v,i)=>{
                v.time=formatTime(new Date(v.time))
                v.expectedtime=formatTime(new Date(v.expectedtime))
                if(v.type=='normal'){
                    v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
                }
            })
            this.setData({orderList:res.result.data})
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