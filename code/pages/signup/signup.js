// pages/signup/signup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:null,
        
        isMember:null


    },
    handleSubmit(e){
        // console.log(e);
        const building=e.detail.value.building
        const floor=e.detail.value.floor
        const contact=e.detail.value.contact
        const username=e.detail.value.username
        // console.log(building);
        // console.log(floor)
        if(building==''||floor==''||username=='') {wx.showToast({
          title: '请填写信息！',
          duration: 1000,
          icon:'error',
        })}
        
          else{
              wx.cloud.callFunction({name:'isMember'})
              .then(res=>{
                //   console.log(res.result);
                
               
                    wx.cloud.callFunction({name:'signUp',data:{
                        building:building,
                        floor:floor,
                        contact:contact,
                        isMember:res.result,
                        username:username
                    }})
                  

                  if(res.result){
                      wx.showToast({
                        title: '更新成功',
                        duration:1000,
                        success:()=>{
                            setTimeout(()=>{wx.navigateBack({
                                delta:1
                              })},1000)
                           
                        }
                      })
                  }
                  else{
                    wx.showToast({
                        title: '注册成功',
                        duration:1000,
                        success:()=>{
                            setTimeout(()=>{wx.navigateBack({
                                delta:1
                              })},1000)
                           
                        }
                      })
                  }
              })
              
              
              
              

          }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'getImage'})
        .then(res=>{
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