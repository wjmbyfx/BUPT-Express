// pages/dev03/dev03.js
const db=wx.cloud.database().collection('good')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    sort(){
        db.orderBy('price','asc').get()
        .then(res=>{
            this.setData({list:res.data})
        })
        .catch(err=>{
            console.error(err);
        })
    },

    rsort(){
        db.orderBy('price','desc')
        .get()
        .then(res=>{
            this.setData({list:res.data})
        })
        .catch(err=>{console.error(err);})

    },

    handlethree(){
        db.limit(3)
        .skip(3)
        .get()
        .then(res=>{
            this.setData({list:res.data})
        })
    },

    getGT(){
        const _=wx.cloud.database().command;
        db.where({price:_.gt(3)})
        .get()
        .then(res=>{
            this.setData({list:res.data})
        })
    },

    handleSubmit(e){
        
        console.log(e);
        const name=e.detail.value.name;
        const price=e.detail.value.price;
        db.add({data:{name:name,price:parseInt(price)}})
        .then(res=>{
            console.log(res);
            db.get().then(res=>{
                this.setData({list:res.data})
            })
        })
        .catch(err=>{
            console.error(err);
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const db=wx.cloud.database().collection('good');
        db.get().then(res=>{
            this.setData({list:res.data})
            console.log(res);
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