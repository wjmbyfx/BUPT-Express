// pages/dev02/dev02.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    handleTap(e){
        console.log(e.currentTarget.dataset.name);
        wx.navigateTo({
          url: '/pages/dev01/dev01?username='+e.currentTarget.dataset.name
          
        })
    },

    handlesubmit(e){
        console.log(getCurrentPages());
        
        const db=wx.cloud.database().collection('user');
        db.where({username:e.detail.value.username})
        .get().then(qres=>{
            if(qres.data.length!=0){
                wx.showToast({
                  title: 'username occupied',
                  icon:'error',
                  duration:2000
                })
            }
            else{
                wx.cloud.database().collection('user')
                .add({data:{username:e.detail.value.username,password:e.detail.value.password,status:1}})
                .then(res=>{{
                    wx.cloud.database().collection('user')
                    .where({status:1})
                    .get()
                    .then(newres=>{
                        this.setData({list:newres})
                    })
                    .catch(newerr=>{
                        console.error(newerr);
                    })
        }})
        .catch(err=>{
            console.error(err);
        })
            }
        })
        
        
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.database().collection('user')
        .where({status:1})
        .get()
        .then(res=>{
            this.setData({list:res})
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