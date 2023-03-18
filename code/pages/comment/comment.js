// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identity: 'user',
        score: 5,
        postmanOpenid: '',
        
    },
    ok(e) {

        this.setData({
            score: 3,
            _num:2
        })
    },
    bad(e) {
        this.setData({
            score: 1,
            _num:1
        })
    },
    good(e) {
        console.log(e);
        this.setData({
            score: 5,
            _num:3
        })
    },
    onSend(e) {
        wx.cloud.callFunction({name:'userCommentPostman',data:{
            score:this.data.score,
            openid:this.data.postmanOpenid,
            content:e.detail.value.content
        }}).then(res=>{
            wx.showToast({
              title: '成功',
              icon: "success",
              duration :1000
            })
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //console.log(options);
        this.setData({
            identity: options.identity,
            postmanOpenid: options.postmanopenid
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