// pages/detail1/detail1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
            this.setData({_id:_id})
            wx.cloud.callFunction({name:'getSpecificOrder',data:{_id:_id}})
            .then(res=>{
                const currentOrder=res.result.data[0]
                this.setData({currentOrder:currentOrder})

                const time=formatTime(new Date(currentOrder.time))
                this.setData({time:time})

                const expectedtime=formatTime(new Date(currentOrder.expectedtime))
                this.setData({expectedtime:expectedtime})

                if(currentOrder.type=='normal'){
                    const location=getLocation(currentOrder.location.building)+'楼 '+currentOrder.location.floor+'层'
                    this.setData({location:location})
                }
                else{
                    const location=currentOrder.location
                    this.setData({location:location})
                }

                const note=currentOrder.note
                this.setData({note:note})

                if(currentOrder.postman&&currentOrder.postman!=''){
                    wx.cloud.callFunction({name:'getOpenID'})
                    .then(res=>{
                        console.log(res);
                        if(res.result==currentOrder.postman){
                            this.setData({isPostman:true})
                        }
                        else{
                            this.setData({isPostman:false})
                        }
                    })
                    
                }
                else{
                    this.setData({isPostman:false})
                }
            })
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