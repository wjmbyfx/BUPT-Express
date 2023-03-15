// pages/verify/verify.js

const {formatTime}=require('../../utils/util.js')
const {getLocation}=require('../../utils/getLocation.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollIndex:0
    },

    goVerify(e){
        console.log(e);
        const _id=e.detail._id
        wx.navigateTo({
          url: '/pages/detail2/detail2?_id='+_id+'&role=admin',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {   
        wx.cloud.callFunction({name:'postmanGetOrder',data:{
            status:'notVerified',skip:this.data.scrollIndex,building:'NA'
        }}).then(res=>{
            const orderList=res.result.data
            orderList.forEach((v,i)=>{
                v.time=formatTime(new Date(v.time))
                v.expectedtime=formatTime(new Date(v.expectedtime))
                if(v.type=='normal'){
                    v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
                }
            })
            this.setData({orderList:orderList})
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
        this.onLoad()
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