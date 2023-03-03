// pages/hall1/hall1.js
const {formatTime}=require('../../utils/util.js')
const {getLocation}=require('../../utils/getLocation.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        displayOrder:[],
        displayFinished:[],
        displayCanceled:[],
        all:[],
        success:[],
        canceled:[]
    },

    goTakeOrder(){
        wx.navigateTo({
          url: '/pages/order1/order1',
        })
    },


    toDetail(e){
        console.log(e);
        wx.navigateTo({
          url: '/pages/detail1/detail1?_id='+e.currentTarget.dataset._id,

        })
    },
    goEdit(){
        wx.navigateTo({
          url: '/pages/signup1/signup1',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'postmanGetDutyOrder',data:{
            status:'delivering'
        }})
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
                    
                })
            })
        }
        )
        wx.cloud.callFunction({name:'postmanGetDutyOrder',data:{
            status:'success'
        }})
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
                    this.setData({success:res.result.data})
                    
                })
            })
        }
        )
        wx.cloud.callFunction({name:'postmanGetDutyOrder',data:{
            status:'cancled'
        }})
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
                    this.setData({canceled:res.result.data})
                    
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
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.onLoad()
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
        this.onLoad()
        wx.stopPullDownRefresh()
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