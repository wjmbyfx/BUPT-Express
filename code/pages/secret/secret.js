// pages/secret/secret.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        secret:''
    },
    handleSubmit(e){
        console.log(e);
        const newsecret=e.detail.value.newsecret
        if (newsecret=='') {
            wx.showToast({
              title: '请输入新授权码!',
              duration: 1000,
              icon:'error' ,
            })
            
        }else{
            wx.cloud.callFunction({name:'adminUpdateSecretkey',data:{
                newkey:newsecret
            }}).then(res=>{
                wx.showToast({
                  title: '更新成功!',
                  duration: 1000,
                  icon :'success'
                })
                setTimeout(()=>{
                    this.onLoad()
                },1000)
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({
            name:'adminGetSecretKey'
        }).then(res=>{
            this.setData({
            secret:res.result.data[0].token
            })
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
        this.onLoad()
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