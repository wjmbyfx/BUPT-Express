const mustSignUp=require('../../utils/mustSignUp')

// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:'2022-02-23',
        time:'12:00',
        inputDisabled: null,
        location:null,
        src:''
    },

    handleRemove(){
        this.setData({src:''})
    },
    faq(){
        wx.navigateTo({
          url: '/pages/FAQ/FAQ',
        })
    },

    handleUpload(){
        wx.chooseMedia({
          count:1,
          mediaType:'image',

        }).then(res=>{
            console.log(res);
            const tempFilePath=res.tempFiles[0].tempFilePath
            const timeStamp=Date.now()
            let that = this
            wx.cloud.uploadFile({cloudPath:this.data.openid+' '+timeStamp,filePath:tempFilePath,
                success(res){
                    
                    
                    that.setData({src:res.fileID})
                }})
        })
    },

    bindDateChange(e){
        // console.log(e);
        this.setData({date:e.detail.value})
    },

    bindTimeChange(e){
        // console.log(e);
        this.setData({time:e.detail.value})
    },

    handleSubmit(e){
        console.log(e);
        const description=e.detail.value.description
        const location=e.detail.value.location
        const username=e.detail.value.username
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
            wx.requestSubscribeMessage({
              tmplIds: ['tYbs9s4DZfdcp880gkYTa-3-O0E2SD6x6_xW9mCAKR0'
              ],
            }).then(res=>{
                console.log(res);
                if(res['tYbs9s4DZfdcp880gkYTa-3-O0E2SD6x6_xW9mCAKR0']
                =='reject'){
                    wx.showToast({
                      title: '请允许订单消息推送',
                      duration:1000,
                      icon:'error'
                    })
                }
                else if(res['tYbs9s4DZfdcp880gkYTa-3-O0E2SD6x6_xW9mCAKR0']
                    =='accept'){
                        if (option=='option1') {
                            wx.cloud.callFunction({name:'getUser'})
                            .then(res=>{
                                console.log(res);
                                wx.cloud.callFunction({name:'addOrder',data:{
                                    type:'normal',
                                    expectedtime:time,
                                    note:note,
                                    location:res.result.data[0].location,
                                    status:'pending',
                                    src:this.data.src,
                                    
                                }}).then(res=>{
                                    wx.showToast({
                                      title: '发布成功',
                                      duration:1000,
                                      icon:'success'
                                    })
                                }).then(res=>{
                                    setTimeout(()=>{
                                        wx.reLaunch({
                                          url: '/pages/hall/hall'
                                        })
                                    },1000)
                                })
                            })
                        }
                        else{
                                wx.cloud.callFunction({name:'addOrder',data:{
                                    expectedtime:time,
                                    type:'customize',
                                    note:note,
                                    location:location,
                                    status:'pending',
                                    src:this.data.src,
                                    
                                }}).then(res=>{
                                    wx.showToast({
                                        title: '发布成功',
                                        duration:1000,
                                        icon:'success'
                                      }).then(res=>{
                                        setTimeout(()=>{
                                            wx.reLaunch({
                                              url: '/pages/hall/hall'
                                            })
                                        },1000)
                                    })
                                })
                }
                    }
                
            })
            
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
        
        wx.cloud.callFunction({name:'getUser'}).then(res=>{
            this.setData({openid:res.result.data[0].openid})
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
        // this.onLoad()
        const {mustSignUp}=require('../../utils/mustSignUp.js')
        mustSignUp()
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