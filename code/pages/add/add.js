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
    onFormSubmit: function(event) {
        console.log('Form Submit:', event.detail.value);
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
      onInput: function(event) {
        console.log('Input:', event.detail.value);
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          time: e.detail.value
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
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
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

    },
    onFormSubmit(e){
        console.log(e);
        const date=e.detail.value.date;
        var time=e.detail.value.time;

        const trans=date+' '+time;
        time=new Date(trans);
        console.log(time);
        console.log(1);


        
    }
})