// pages/hall/hall.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:null,
        currentOrder:null, //最新订单的对象
        orderList:null,  //所有订单的对象
        currentStatus:null, //最新订单的状态
        currentLocation:null, //最新订单的地址
        currentSubmitTime:null //最新订单提交时间
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
            this.setData({orderList:res.result.data})
            this.setData({currentOrder:res.result.data[0]})
            const currentStatus=res.result.data[0].status;
            if(currentStatus){
                if(currentStatus=='delivering'){
                    this.setData({currentStatus:'派送中'})
                }
                else if(currentStatus=='pending'){
                    this.setData({currentStatus:'待确认'})
                }
                else if(currentStatus=='cancled'){
                    this.setData({currentStatus:'已取消'})
                }
                else if(currentStatus=='warning'){
                    this.setData({currentStatus:'出错了'})
                }
            } //设置当前订单的状态

            const currentOrder=res.result.data[0];
            const location=currentOrder.location;
            if(currentOrder.type=='normal'){
                this.setData({currentLocation:location.building+'楼 '+location.floor+'层'})
            }
            else{
                this.setData({currentLocation:location})
            } //设置地址

            let currentSubmitTime=new Date(currentOrder.time)
            const {formatTime}=require('../../utils/util.js')
            this.setData({currentSubmitTime:formatTime(currentSubmitTime)}) //设置时间
            
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