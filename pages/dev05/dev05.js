// pages/dev05/dev05.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    handleUpdate(e){
        console.log(e);
        const name=e.detail.value.name
        const price=e.detail.value.price
        let result;
        wx.cloud.callFunction({name:'update',data:{name:name,price:price}}).then(res=>{
            if(res==1){
                wx.showToast({
                    title: 'success',
                    duration:2000
                  })
            }
            else{
                wx.showToast({
                    icon:'error',
                    title: 'fail',
                    duration:2000
                  })
            }
            
            wx.cloud.callFunction({name:'getData'}).
            then(newres=>{
                // console.log(newres);
                this.setData({list:newres.result.data})
            })
        }).catch(err=>{console.error(err);})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'getData'}).then(res=>{
            this.setData({list:res.result.data})
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