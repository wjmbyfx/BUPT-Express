// pages/detail1/detail1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id:'',
    },

    getBack(){
        wx.navigateBack({
          delta: 1,
        })
    },

    reload(){
        const detail=this.selectComponent('.detail')
        detail.reload();
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options==undefined||options._id==undefined){
            wx.showToast({
              title: '当前无订单!',
              icon:'error',
              duration:1000
            })
            setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
            },1000)
        }
        else{
            const _id=options._id
            const role=options.role
            this.setData({_id:_id,role:options.role})
        }
        
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
        this.onLoad({_id:this.data._id})
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.onLoad({_id:this.data._id})
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