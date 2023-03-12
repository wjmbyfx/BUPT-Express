// const mustSignUp=require('../../utils/mustSignUp')

// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:'',
        time:'',
        inputDisabled: false,
        location:'',
        src:'',
        buttonChange:true,
        currentUser:'',
        hour:'',
        minute: '',
        cdate:'',
        ctime:''
    },
    

    handleRemove(){
        this.setData({src:''})
    },
    faq(){
        wx.navigateTo({
          url: '/pages/FAQ/FAQ?page='+'customer',
        })
    },

    handleUpload(){
        wx.chooseMedia({
          count:1,
          mediaType:'image',

        }).then(res=>{
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
        this.setData({date:e.detail.value})
    },

    bindTimeChange(e){
        this.setData({time:e.detail.value})
    },

    handleSubmit(e){
        const description=e.detail.value.description
        const location=e.detail.value.location
        const username=e.detail.value.username
        let note=e.detail.value.note
        note=description+" "+note
        const option=e.detail.value.option
        var time=e.detail.value.date+" "+e.detail.value.time;
        time=new Date(time)
        time=time.valueOf();
        let str=e.detail.value.time
        let arr=str.split(':')
        let inhour=parseInt(arr[0])
        let inminute=parseInt(arr[1])
        let chour=parseInt(this.data.hour)
        let cminute=parseInt(this.data.minute)
        let arr1=e.detail.value.date.split('-')
        let arr2=this.data.cdate.split('-')
        // console.log(parseInt(arr1[0]),parseInt(arr2[0]),parseInt(arr1[1]),parseInt(arr2[1]),parseInt(arr1[2]),parseInt(arr2[2]));
        // console.log(parseInt(arr1[0])==parseInt(arr2[0])&&parseInt(arr1[1])==parseInt(arr2[1])&&parseInt(arr1[2])==parseInt(arr2[2]));
        //console.log(inhour,chour,inminute,cminute);
        if(description==''||(option=='option2'&&location=='')||option=='') {wx.showToast({
            title: '请填写信息！',
            duration: 1000,
            icon:'error',
          })}
          
          else if((parseInt(arr1[0])==parseInt(arr2[0])&&parseInt(arr1[1])==parseInt(arr2[1])&&parseInt(arr1[2])==parseInt(arr2[2]))&&(inhour<chour||(inhour==chour&&inminute<=cminute+20)||(inhour=chour+1&&60-cminute+inminute<=20))){
            wx.showToast({
              title: '请填写有效时间!',
              icon: "error",
              duration: 1000
            })
          }
        else{
            wx.requestSubscribeMessage({
              tmplIds: ['tYbs9s4DZfdcp880gkYTa-3-O0E2SD6x6_xW9mCAKR0'
              ],
            }).then(res=>{
                //console.log(res);
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
                                if(this.data.currentUser.credit<60){
                                    wx.showModal({
                                      title:'您的信誉积分过低',
                                      content:'您当前的信誉积分低于60分,可能由于多次不守信导致,如果您有任何疑问,可前往反馈界面进行反馈'
                                    }).then(res=>{
                                        if(res.confirm){
                                            wx.navigateTo({
                                              url: '/pages/suggest/suggest',
                                            })
                                        }
                                        else{
                                            wx.switchTab({
                                              url: '/pages/hall/hall',
                                            })
                                        }
                                    })
                                }
                                else{
                                    this.setData({buttonChange:false})
                                
                                wx.cloud.callFunction({name:'addOrder',data:{
                                    type:'normal',
                                    expectedtime:time,
                                    note:note,
                                    location:res.result.data[0].location,
                                    status:'pending',
                                    src:this.data.src,
                                    username:this.data.currentUser.username
                                    
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
                            }
                            })
                        }
                        else{   
                                this.setData({
                                    buttonChange:false
                                })
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
        var now = new Date();
        var year = now.getFullYear(); // 获取当前年份
        var month = now.getMonth() + 1; // 获取当前月份，注意月份是从0开始的，需要加1
        var day = now.getDate(); // 获取当前日期
        var hour = now.getHours(); // 获取当前小时
        var minute = now.getMinutes(); // 获取当前分钟
        
        this.setData({
            date:year + '-' + month + '-' + day,
            time:hour + ':' + minute,
            cdate:year + '-' + month + '-' + day,
            ctime:hour + ':' + minute,
            hour:hour,
            minute:minute
        })
        wx.cloud.callFunction({name:'getUser'}).then(res=>{
            this.setData({openid:res.result.data[0].openid})
            this.setData({currentUser:res.result.data[0]})
            if(this.data.currentUser.credit<60){
                wx.showModal({
                  title:'您的信誉积分过低',
                  content:'您当前的信誉积分低于60分,可能由于多次不守信导致,如果您有任何疑问,可前往反馈界面进行反馈'
                }).then(res=>{
                    if(res.confirm){
                        wx.navigateTo({
                          url: '/pages/suggest/suggest',
                        })
                    }
                    else{
                        wx.switchTab({
                          url: '/pages/hall/hall',
                        })
                    }
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
        if(this.data.currentUser.credit<60){
            wx.showModal({
              title:'您的信誉积分过低',
              content:'您当前的信誉积分低于60分,可能由于多次不守信导致,如果您有任何疑问,可前往反馈界面进行反馈'
            }).then(res=>{
                if(res.confirm){
                    wx.navigateTo({
                      url: '/pages/suggest/suggest',
                    })
                }
                else{
                    wx.switchTab({
                      url: '/pages/hall/hall',
                    })
                }
            })
        }
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