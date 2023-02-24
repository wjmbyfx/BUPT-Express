

// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:'2022-02-23',
        time:'12:00',
        inputDisabled: null,
        location:null
    },

    handleSubmit(e){
        console.log(e);
        const description=e.detail.value.description
        const location=e.detail.value.location
        let note=e.detail.value.note
        note=description+" "+note
        const option=e.detail.value.option
        var time=e.detail.value.date+" "+e.detail.value.time;
        time=new Date(time)
        time=time.valueOf();
        if(description==''||(option=='option2'&&location=='')||option=='') {wx.showToast({
            title: '请填写信息！',
            duration: 1000,
            icon:'error',
          })}
        else{
            if (option=='option1') {
                wx.cloud.callFunction({name:'getUser'})
                .then(res=>{
                    console.log(res);
                    wx.cloud.callFunction({name:'addOrder',data:{
                        type:'normal',
                        expectedtime:time,
                        note:note,
                        location:res.result.data[0].location,
                        status:'pending'
                    }}).then(res=>{
                        wx.showToast({
                          title: '发布成功',
                          duration:1000,
                          icon:'success'
                        })
                    })
                })
            }
            else{
                    wx.cloud.callFunction({name:'addOrder',data:{
                        expectedtime:time,
                        type:'customize',
                        note:note,
                        location:location,
                        status:'pending'

                    }}).then(res=>{
                        wx.showToast({
                            title: '发布成功',
                            duration:1000,
                            icon:'success'
                          })
                    })
    }
    }
    },
                      


    onOptionChange: function(event) {
        console.log(event);
        if (event.detail.value === 'option1') {
          this.setData({
            inputDisabled: true,
            location:""
          });
        } else {
            
          this.setData({
            inputDisabled: false
            
          });
        }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(1);
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