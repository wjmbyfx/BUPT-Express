// pages/order1/order1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollIndex:0
    },
    getSelectedOrder(e){
        // //console.log(e.currentTarget.dataset._id);
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
            status:'pending',skip:this.data.scrollIndex
        }}).then(res=>{
            // console.log(res);
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
        wx.cloud.callFunction({name:'getOpenID'}).then(res=>{
            wx.cloud.callFunction({name:'getPostman',data:{openid:res.result}}).then(res=>{
                //console.log(res);
                this.setData({openid:res.result.data[0].openid})
                this.setData({currentUser:res.result.data[0]})
                if(this.data.currentUser.credit<60){
                    wx.showModal({
                      title:'您的信誉积分过低',
                      content:'您当前的信誉积分低于60分,可能由于多次不守信导致,如果您有任何疑问,可前往反馈界面进行反馈'
                    }).then(res=>{
                        if(res.confirm){
                            wx.navigateTo({
                              url: '/pages/suggest/suggest',
                            })
                        }
                        else{
                            wx.reLaunch({
                              url: '/pages/hall1/hall1',
                            })
                        }
                    })
                }
            })
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
        this.setData({scrollIndex:0})
        this.onLoad()
        wx.stopPullDownRefresh()
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({scrollIndex:this.data.scrollIndex+1})
        wx.cloud.callFunction({name:'postmanGetOrder',data:{
            status:'pending',skip:this.data.scrollIndex
        }}).then(res=>{
            const orderList=res.result.data
            orderList.forEach((v,i)=>{
                v.time=formatTime(new Date(v.time))
                v.expectedtime=formatTime(new Date(v.expectedtime))
                if(v.type=='normal'){
                    v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
                }
            })
            this.setData({orderList:this.data.orderList.concat(res.result.data)})
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})