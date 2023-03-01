

// pages/back/back.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    postmanGetDutyOrder(){
        wx.cloud.callFunction({name:'postmanGetDutyOrder'}).then(res=>{
            console.log(res);
        })
    },

    postmanGetOrder(){
        wx.cloud.callFunction({name:'postmanGetOrder',data:{
            status:'pending'
        }}).then(res=>{
            console.log(res);
        })
    },

    postmanSignUp(){
        wx.cloud.callFunction({name:'postmanSignUp',data:{
            secretkey:'MIUL',username:'e',contact:'18108846317'
        }}).then(res=>{
            console.log(res);
        })
    },

    sendMessage(){
        wx.cloud.callFunction({name:'sendOrderMessage',data:{
            openid:"oa3g046QCEe5OIh-1SwwWCRs1jiQ",
            _id:'_idtest',
            status:'待取件',
            note:'note test',
            contact:'18811580695',
            location:'locationtest'
        }})
    },

    updateOrderStatus(){
        wx.cloud.callFunction({name:'updateOrderStatus',data:{
            _id:"2cc84e2663f956d101e2209a33154a7c",newStatus:'cancled'

        }}).then(res=>{
            console.log(res);
        })
    },

    updateOrder(){
        wx.cloud.callFunction({name:'updateOrder',data:{
            _id:'2cc84e2663f956d101e2209a33154a7c',
            status:'delivering',
            expectedtime:1645596000000,
            location:'updatetest',
            note:'updatetest',
            time:1677285073561,
            type:'customize'
        }})
    },

    getUser(){
        wx.cloud.callFunction({name:'getUser'}).then(res=>{
            console.log(res);
        })
    },

    addOrder(){
        wx.cloud.callFunction({name:'addOrder',data:{
            status:'cancled',
            type:'normal',
            location:{
                building:'S3',
                floor:3
            },
            expectedtime:Date.now(),
            note:'',
            time:Date.now()
        }})
    },

    getDate(){
        let d=new Date();
        
        console.log(d.getTime());
    },

    getContact(){
        wx.cloud.callFunction({name:'getContact'}).then(res=>{
            console.log(res);
        })
    },

    updateContact(){
        wx.cloud.callFunction({name:'updateContact',data:{contact:'110'}}).then(res=>{
            console.log(res);
        })
    },

    getLocation(){
        wx.cloud.callFunction({name:'getLocation'}).then(res=>{
            console.log(res);
        })
    },

    getPendingOrder(){
        wx.cloud.callFunction({name:'getOrder',data:{status:'pending'}})
        .then(res=>{
            console.log(res);
        })
    },

    getOrder(){
        wx.cloud.callFunction({name:'getOrder'})
        .then(res=>{
            console.log(res);
        })
    },

    getImage(){
        wx.cloud.callFunction({name:'getImage'}).then(res=>{
            console.log(res);
        })
    },
    
    signupc(){
        wx.cloud.callFunction({name:'signUp',data:{building:'A',floor:'3',contact:'1190'
        }}).then(res=>{
            console.log(res);
        })
    },

    isMember(){
        wx.cloud.callFunction({name:'isMember'}).then(res=>{
            console.log(res);
        })
    },
    
    getOpenID(){
        wx.cloud.callFunction({name:'getOpenID'})
        .then(res=>{
            console.log(res);
        })
    },

    sign(){
        wx.cloud.callFunction({name:"sign"}).then(res=>{
            console.log(res);
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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