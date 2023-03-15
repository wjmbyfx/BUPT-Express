// pages/order1/order1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollIndex:0,
        region: ['全部','雁北A', '雁北B', '雁北C', '雁北D1', '雁北D2', '雁北E', '雁南S2', '雁南S3', '雁南S4', '雁南S5', '雁南S6'],
        index:0,
        tap:'all'
    },
    bindRegionChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        
        let valueMap = {'全部':'all','雁北A': 'NA', '雁北B': 'NB', '雁北C': 'NC', '雁北D1': 'ND1', '雁北D2': 'ND2', '雁北E': 'NE', '雁南S2': 'S2', '雁南S3': 'S3', '雁南S4': 'S4', '雁南S5': 'S5', '雁南S6': 'S6'}
        let value = valueMap[this.data.region[e.detail.value]]
        // console.log('选中值为', value)
        this.setData({
            tap: value
        })
        this.setData({
          index: e.detail.value,
          
        })
        this.onLoad({
            index:this.data.index,
            tap:this.data.tap
        })
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
        if(options.tap!=undefined){
        this.setData({
            index:options.index,
            tap:options.tap
        })}
        console.log(this.data.tap);
        wx.cloud.callFunction({name:'postmanGetOrder',data:{
            status:'pending',skip:this.data.scrollIndex,building:this.data.tap
        }}).then(res=>{
            console.log(res);
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