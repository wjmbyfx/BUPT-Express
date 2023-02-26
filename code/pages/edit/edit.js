// pages/edit/edit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputDisabled: null,
        expectedtime:null,
        location:null,
        note:null,
        status:null,
        type:null,
        _id:null,
        option:true,
        date:null,
        time:null,
        description:null
    },
    bindDateChange(e){
        // console.log(e);
        this.setData({date:e.detail.value})
    },

    bindTimeChange(e){
        // console.log(e);
        this.setData({edtime:e.detail.value})
    },

    handleSubmit(e){
        console.log(e);
        const description=e.detail.value.description
        let location
        if(this.data.option){
            location=this.data.location
        }
        else{
            location=e.detail.value.location
        }
        let note=e.detail.value.note
        note=description+" "+note
        const option=e.detail.value.option
        var time=e.detail.value.date+" "+e.detail.value.time;
        time=new Date(time)
        let edtime=time.valueOf();
        const _id=this.data._id
        
        if(description==''||(option=='option2'&&location=='')||option=='') {wx.showToast({
            title: '请填写信息！',
            duration: 1000,
            icon:'error',
          })}
        else{
            if (option=='option1') {
                console.log(edtime);
                wx.cloud.callFunction({name:'updateOrder',
                data:{
                    _id:this.data._id,
                    expectedtime:edtime,
                    location:location,
                    note:note,
                    type:'normal'
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
            
            else{
                    wx.cloud.callFunction({name:'updateOrder',data:{
                        expectedtime:edtime,
                        type:'customize',
                        note:note,
                        location:location,
                        status:'pending',
                        _id:_id

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

        
    },
                      


    onOptionChange: function(event) {
        console.log(event);
        if (event.detail.value === 'option1') {
          this.setData({
            option: true,
            location:""
          });
        } else {
            
          this.setData({
            option: false
            
          });
        }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(options!={}){

            const current_id=options._id; //所需订单的_id
            wx.cloud.callFunction({name:'getSpecificOrder',data:{
                _id:current_id
            }})
            .then(res=>{
                if(res.result){
                    
                    const currentOrder=res.result.data[0] //所请求的订单对象
                    let expectedtime=new Date(currentOrder.expectedtime) //期望送达时间
                    let location=currentOrder.location //地址,可能为字符串或对象
                    let note=currentOrder.note //备注和描述


                    let description=note.split(' ')[0]
                    note=note.split(' ')[1]
                    

                    const status=currentOrder.status //订单状态 调用外部方法获取中文值
                    let time=new Date(currentOrder.time) //提交时间
                    const type=currentOrder.type //location种类

                     //设置当前订单的状态

                    
                    const _id=currentOrder._id
                    let option = true
                    const year = expectedtime.getFullYear()
                    const month = expectedtime.getMonth() + 1
                    const day = expectedtime.getDate()
                    const hour = expectedtime.getHours()
                    const minute = expectedtime.getMinutes()
                    if (type=='customize') {
                        option=false;
                        this.setData({option:option})
                        
                        
                    }
                    

                    let edtime=hour+':'+minute
                    let date=year+'-'+month+'-'+day
                    console.log(edtime);
                    console.log(date);
                    if (type=='normal') {
                        location=location.building+'楼 '+ location.floor+'层'
                    }
                    this.setData({expectedtime:expectedtime,
                        location:location,
                        note:note,
                        status:status,
                        type:type,
                        _id:_id,
                        edtime:edtime,
                        date:date,
                        description:description


                    })
                }
            })
            
        }
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