// pages/hall1/hall1.js
const {formatTime}=require('../../utils/util.js')
const {getLocation}=require('../../utils/getLocation.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        delivering:[],
        displayOrder:[1,2,3]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'postmanGetDutyOrder'})
        .then(res=>{
            
            res.result.data.forEach((v,i)=>{
                v.expectedtime=formatTime(new Date(v.expectedtime))
                v.time=formatTime(new Date(v.time))
                wx.cloud.callFunction({name:'postmanGetUser',data:{
                    openid:v.openid
                }}).then(result=>{
                    const username=result.result.data[0].username
                    v.username=username
                    if(v.type=='normal'){
                        v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
                    }
                    this.setData({all:res.result.data})
                    this.setData({displayOrder:this.data.all})

                })
                
            })
            
        
        }
        
            
        )

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