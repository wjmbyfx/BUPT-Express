// pages/creditdetail/creditdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPostman:false,
        username:'',
        contact:'',
        userCredit:'',
        postmanCredit:'',
    },
    handleSubmit(e){
        const credit=parseInt(e.detail.value.credit)
        const pcredit=parseInt(e.detail.value.pcredit)
        console.log(credit);
        if (credit<=0||credit>100||pcredit<=0||pcredit>100) {
            wx.showToast({
              title: '请填写合法数据!',
              duration: 1000,
              icon: 'error'
            })
        }else
        {
            wx.cloud.callFunction({
            
                name:'adminUpdateUser',data:{
                    openid:this.data.openid,credit:credit
                }
            })
            if (this.data.isPostman==true) {
                wx.cloud.callFunction({
            
                    name:'adminUpdatePostman',data:{
                        openid:this.data.openid,credit:pcredit
                    }
                })
            }
            wx.showToast({
              title: '更新成功',
              duration:100,
              icon: "success"
            })
            this.onLoad({openid:this.data.openid})
        }

        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        const currentopenid=options.openid
        this.setData({
            openid:currentopenid
        })
        wx.cloud.callFunction({name:'adminGetSpecificUser',data:{
            openid:this.data.openid
        }}).then(res=>{
            // console.log(res);
            this.setData({
                username:res.result.data[0].username,
                userCredit:res.result.data[0].credit,
                contact:res.result.data[0].contact
            })
        })
        wx.cloud.callFunction({name:'adminGetSpecificPostman',data:{
            openid:this.data.openid
        }}).then(res=>{
            console.log(res);
            if (res.result.data.length!=0) {
                this.setData({
                    isPostman:true,
                    postmanCredit:res.result.data[0].credit
                })

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