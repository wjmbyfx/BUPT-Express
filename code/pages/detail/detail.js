// pages/detail/detail.js
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
        if(!options._id){
            wx.showToast({
              title: '参数为空',
              duration:1000
            })
            setTimeout(()=>{
                wx.navigateBack({
                  delta: 0,
                })
            },1000)
        } //判断是否提供了_id参数
        else{

            const current_id=options._id; //所需订单的_id
            wx.cloud.callFunction({name:'getSpecificOrder',data:{
                _id:current_id
            }})
            .then(res=>{
                console.log(res);
                const currentOrder=res.result.data[0] //所请求的订单对象
                const expectedtime=currentOrder.expectedtime //期望送达时间
                const location=currentOrder.location //地址,可能为字符串或对象
                const note=currentOrder.note //备注和描述
                const status=currentOrder.status //订单状态
                const time=currentOrder.time //提交时间
                const type=currentOrder.type //location种类
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