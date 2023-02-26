// pages/suggest/suggest.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id:null
    },

    handleTap(){
        const _id=this.data._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+_id,
        })
    },

    handleSubmit(e){
        // console.log(e);
        const content=e.detail.value.content
        if(content!=''){

            wx.cloud.callFunction({name:'addsuggest',data:{
                content:content
            }}).then(res=>{
                wx.showToast({
                    title: '反馈提交成功',
                    icon:'success',
                    duration:1000
                })
                setTimeout(()=>{
                    wx.reLaunch({
                        url: '/pages/hall/hall',
                    })
                },1000)
            })
        }
        else{
            wx.showToast({
              title: '请填写反馈内容!',
              icon:'error'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options!={}){
            this.setData({_id:options._id})
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