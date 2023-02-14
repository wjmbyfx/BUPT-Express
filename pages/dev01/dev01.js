// pages/dev01/dev01.js
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
        console.log(options);
        // wx.cloud.database().collection('user').get({
        //     success(res){
        //         console.log(res);
        //     },
        //     fail(err){
        //         console.log(err);
        //     }
        // })

        // wx.cloud.database().collection('user').get().then(res=>{
        //     console.log(res);
        //     this.setData({user:res})
        // }).catch(err=>{
        //     console.log(err);
        // })

        // wx.cloud.database().collection('user').where({username:'admin'}).get().then(data=>{
        //     this.setData({list:data})
        // }).catch(err=>{
        //     console.log(err);
        // })
        // wx.cloud.database().collection('user')
        // .get()
        // .then(data=>{
        //     this.setData({list:data})
        // })
        // .catch(err=>{
        //     console.log(err);
        // }) 
        // wx.cloud.database().collection('user')
        // .doc('0122a58763ea060f000112ca44ecdfa6')
        // .get()
        // .then(data=>{
        //     this.setData({list:data})
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        // wx.cloud.database().collection('user')
        // .add({data:{
        //     username:'miul',
        //     password:'miul',
        //     status:1
        // }})
        // .then(res=>{
        //     console.log(res);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })

        // wx.cloud.database().collection('user')
        // .add({data:{username:'jack',password:'jack',status:1}})
        // .then(res=>{
        //     console.log(res);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        // wx.cloud.database().collection('user')
        // .where({data:{username:'miul'}})
        // .remove()
        // .then(res=>{
        //     console.log(res);
        // })
        // .catch(err=>{
        //     console.error(err);
        // })
    },
    handleTap(e){
        console.log(e);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(e) {
        console.log(e);
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