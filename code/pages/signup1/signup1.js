// pages/signup1/signup1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPostman:false
    },
handleSubmit(e){
    const username=e.detail.value.username
    const contact=e.detail.value.contact
    const secretkey=e.detail.value.secretkey
    if (username==''||contact==''||secretkey=='') {
        wx.showToast({
          title: '请填写信息',
          duration: 1000,
          icon: 'error',
        })
        
    }
    else{
        let type=''
        if (this.data.isPostman) {
             type='update'
        }
        else{
             type='add'
        }
        wx.cloud.callFunction({name:'postmanSignUp',data:{
            username:username,
            contact:contact,
            secretkey:secretkey,
            type:type
        }}).then(res=>{
            ////console.log(res);
            if (res.result.msg=='fail') {
                wx.showToast({
                  title: '授权码有误!',
                  duration: 1000,
                  icon : "error"
                })
            }
            else{
                if (this.data.isPostman) {
                    wx.showToast({
                        title: '更新成功!',
                        icon : 'succcess',
                        duration: 1000
                      })
                      setTimeout(()=>{
                          wx.reLaunch({
                            url: '/pages/hall1/hall1',
                          })
                      },1000)
                }
                else{
                    wx.showToast({
                        title: '注册成功!',
                        icon : 'succcess',
                        duration: 1000
                      })
                      setTimeout(()=>{
                          wx.reLaunch({
                            url: '/pages/hall1/hall1',
                          })
                      },1000)
                }
                
            }
        })
    }
},
faq(){
    wx.navigateTo({
      url: '/pages/FAQ/FAQ?page='+'postman',
    })
    
},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'isPostman'}).then(res=>{
            ////console.log('ispostman',res);
            if(res.result.data.length==1){
                this.setData({isPostman:true})
            }
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