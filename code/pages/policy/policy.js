// pages/policy/policy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:null,
    },
    sign(){
        wx.cloud.callFunction({name:'sign'})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({src:null})
        setTimeout(()=>{
            wx.showToast({
              title: 'loading',
              duration: 2000,
              icon: 'loading',
            //   image: 'image',
              mask: true,
              
            },1500)
        })
        console.log(options);
        const type=options.type;
        wx.cloud.callFunction({name:'getPolicy',data:{'type':type}})
        .then(res=>{
            console.log(res);
            
            this.setData({src:res.result.text})
        })
        .catch(err=>{
            console.error(err);
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