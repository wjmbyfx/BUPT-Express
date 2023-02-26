// pages/hall/hall.js
const {formatTime}=require('../../utils/util.js')
const {getStatus}=require('../../utils/status.js')
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
        currentSubmitTime:null, //最新订单提交时间
        currentExpectedTime:null //最新订单预期时间
    },

    getSelectedOrder(e){
        // console.log(e.currentTarget.dataset._id);
        const selectedOrder=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+selectedOrder
        })
    },

    getCurrentOrder(e){
        // console.log(e);
        const current_id=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+current_id
        })
    }, //处理请求当前订单

    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad(options) {
        wx.cloud.callFunction({
            name:'getOrder'
        })
        .then(res=>{
            console.log(res);
            if(res.result.data.length!=0){

            
            this.setData({orderList:res.result.data})
            this.setData({currentOrder:res.result.data[0]})
            const currentStatus=res.result.data[0].status;
            this.setData({currentStatus:currentStatus}) //设置当前订单的状态

            const currentOrder=res.result.data[0];
            
            const location=currentOrder.location;
            if(currentOrder.type=='normal'){
                this.setData({currentLocation:location.building+'楼 '+location.floor+'层'})
            }
            else{
                this.setData({currentLocation:location})
            } //设置地址

            {

            
            let currentSubmitTime=new Date(currentOrder.time)
            
            this.setData({currentSubmitTime:formatTime(currentSubmitTime)}) //设置提交时间
            let currentExpectedTime=new Date(currentOrder.expectedtime)
            // console.log(currentOrder.expectedtime);
            this.setData({currentExpectedTime:  formatTime(currentExpectedTime)})
            } //设置提交和送达时间
        }
        let orderList=res.result.data;
        // console.log(orderList);
        if(orderList.length>3){
            orderList=orderList.slice(0,3)
        }
        if(orderList.length!=0){
            orderList.forEach((v,i)=>{
                {
                    v.displayStatus=v.status
                    
                } //设置字面状态
                {
                    let submitTime=new Date(v.time);
                    v.submitTime=formatTime(submitTime)

                } //设置提交时间
            })
            this.setData({orderList:orderList})
        } //如果有历史订单,则设置展示状态及提交时间


        }) //设置当前订单
          

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