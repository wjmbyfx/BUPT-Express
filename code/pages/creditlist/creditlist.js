// pages/creditlist/creditlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
            tabs: [
                { name: '用户',  active: false, index: 0 },
                { name: '异常用户',  active: false, index: 1 },
                { name: '派送员',  active: false, index: 2 },
                { name: '异常派送员',  active: false, index: 3 }
              ],
            all:[],
            pending:[],
            delivering:[],
            success:[],
            displayCustomer:[]
    },
    getSelectedCustomer(e){
        const selectedCustomer=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/creditdetail/creditdetail?_id='+selectedCustomer
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        if(options==undefined)
    {
        this.setData({displayOrder:this.data.all,tabs:[{ name: '用户',  active: true, index: 0 },
        { name: '异常用户',  active: false, index: 1 },
        { name: '派送员',  active: false, index: 2 },
        { name: '异常派送员',  active: false, index: 3 }]})
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