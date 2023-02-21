// pages/signup/signup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:null,
        building:null


    },
    handleSubmit(e){
        console.log(e);
        const building=e.detail.value.building
        const floor=e.detail.value.floor
        const contact=e.detail.value.contact
        console.log(building);
        console.log(floor)
        if(building==''||floor=='') {wx.showToast({
          title: '请填写信息！',
          duration: 1000,
          icon:'error',
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })}
        
          else{
              if(contact!='') {
                wx.cloud.callFunction({name:'signUp',data:{building:building,floor:floor,contact:contact}})
              }else {
                {
                    wx.cloud.callFunction({name:'signUp',data:{building:building,floor:floor,contact:''}})
                  }
              }
              wx.showToast({
                title: '注册成功!',
                icon: 'success',
                duration: 1000,
                mask :'false',
                complete:()=>{
                    setTimeout(()=>{
                        wx.redirectTo({
                            url: '../hall/hall'
                          })
                    },1000)
                    
                }
              })
              

          }
    },


    Inlocation(){
        
    },
    Infloor(){
        
    },
    


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'getImage'})
        .then(res=>{console.log(res);
        const src=res.result
        this.setData({src:src})
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