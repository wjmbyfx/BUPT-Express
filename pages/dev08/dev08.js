// pages/dev08/dev08.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    handleLogin(){
        let that=this
        wx.login({
          success:res=>{
              console.log(res);
          }
        })
    },

    handleTap(){
        let that=this
        wx.chooseMedia()
        .then(res=>{
            console.log(res);
            const tempFilesList=res.tempFiles;
            tempFilesList.forEach((v,i) => {
                const tempFilePath=v.tempFilePath
                wx.cloud.uploadFile({
                    cloudPath:i+"class",
                    filePath:tempFilePath,
                    success(){
                        wx.showToast({
                          title: 'success',
                          duration: 2000,
                  
                        })
                    }
                })
            });
        })
        .catch(err=>{console.error(err);})
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