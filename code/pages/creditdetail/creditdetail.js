// pages/creditdetail/creditdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPostman:false,
        openid:''
    },
    handleSubmit(e){
        console.log(e);
        const credit=e.userCredit
        if (credit<='0'||credit>'100') {
            wx.showToast({
              title: '请填写合法数据!',
              duration: 1000,
              icon: 'error'
            })
        }else
        {
            wx.cloud.callFunction({
            
                name:'adminUpdateUser',data:{
                    openid:this.data.openid,credit:credit
                }
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        const currentopenid=options.openid
        // const currentopenid="oa3g04-e6ryuS9o0VHCsH8EcuePc"
        // this.setData({
        //     openid:currentopenid
        // })
        
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