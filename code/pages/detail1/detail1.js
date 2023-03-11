// pages/detail1/detail1.js
const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expectedtime:'',
        location:'',
        note:'',
        status:'',
        time:'',
        type:'',
        _id:'',
    },

    handlePreview(){    
        wx.previewImage({
          urls: [this.data.currentOrder.src],
        })
    },
    
    arrive(){
        if(this.data.currentOrder.status=='cancled'){
            wx.showToast({
              title: '订单已取消',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentOrder.status=='success'){
            wx.showToast({
              title: '订单已完成',
              icon:'error',
              duration:1000
            })
        }
        
        else if(this.data.currentOrder.status=='warning'){
            wx.showToast({
              title: '订单出错了',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentOrder.status=='delivering'){wx.showModal({
          title:'确认已到达吗?',
          content:'将发送提示消息给用户'
          
        }).then(res=>{
            this.setData({buttonchange:false})
            if(res.confirm){
                wx.cloud.callFunction({name:'postmanSendSuccessSMS',data:{
                    mobile:this.data.contact,
                    nationcode:'86'
                }})
                wx.cloud.callFunction({name:'sendOrderMessage',data:{
                    _id:this.data._id,
                    status:'已到达',
                    note:'您的订单已送达,请及时处理!',
                    contact:this.data.postman.contact,
                    location:this.data.location,
                    openid:this.data.currentOrder.openid
                }}).then(res=>{
                    wx.showToast({
                      title: '成功!',
                      icon:'success',
                      duration:1000
                    })
                    
                    setTimeout(()=>{
                        this.onLoad({_id:this.data._id})
                    },1000)
                })
            }
        })
    }
    else {
        wx.showToast({
          title: '订单状态有误',
          icon:'error',
          duration:1000
        })
    }
    },

    suggest(){
        wx.navigateTo({
          url: '/pages/suggest/suggest?_id='+this.data._id,

        })
    },

    cancle(){
        if(this.data.currentOrder.status=='cancled'){
            wx.showToast({
              title: '订单已取消',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentOrder.status=='success'){
            wx.showToast({
              title: '订单已完成',
              icon:'error',
              duration:1000
            })
        }
        
        else if(this.data.currentOrder.status=='warning'){
            wx.showToast({
              title: '订单出错了',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentOrder.status=='delivering'){

        
        wx.showModal({
          title:'确认要取消接单吗?',
          content:'如果取消次数过多,可能会扣除信誉积分!'

        }).then(res=>{
            if(res.confirm){
                wx.cloud.callFunction({name:'postmanCancleSendSMS',data:{
                    mobile:this.data.contact,nationcode:'86'
                }})
                wx.cloud.callFunction({name:'adminUpdatePostman',data:{
                    openid:this.data.openid,
                    credit:this.data.postman.credit-10
                }})
                wx.cloud.callFunction({name:'postmanCancleOrder',data:{
                    _id:this.data._id
                }}).then(res=>{
                    wx.showToast({
                      title: '取消成功!',
                      icon:'success',
                      duration:1000
                    })
                    setTimeout(()=>{
                        this.onLoad({_id:this.data._id})
                    },1000)
                })
            }
        })
    }
    else{
        wx.showToast({
          title: '订单状态有误',
          icon:'error',
          duration:1000
        })
    }
    },

    takeOrder(){
        wx.showModal({
          title:'确认接单吗?',
          content:'接取后随意取消接单可能扣除信誉积分'
        }).then(res=>{
            if(res.confirm){
                wx.cloud.callFunction({name:'postmanSendTakeSMS',data:{
                    mobile:this.data.contact,
                    nationcode:'86'
                }})
                wx.cloud.callFunction({name:'postmanTakeOrder',data:{_id:this.data._id}}).then(res=>{
                    wx.cloud.callFunction({name:'updateOrderStatus',data:{
                        _id:this.data._id,newStatus:'delivering'
                    }})
                    wx.showToast({
                      title: '接单成功',
                      duration:1000
                    })
                    setTimeout(()=>{
                        this.onLoad({_id:this.data._id})
                        
                    },1000)
                    
                    
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({buttonchange:true})
        if(options==undefined||options._id==undefined){
            wx.showToast({
              title: '当前无订单!',
              icon:'error',
              duration:1000
            })
            setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
            },1000)
        }
        else{
            const _id=options._id
            this.setData({_id:_id})
            wx.cloud.callFunction({name:'getSpecificOrder',data:{_id:_id}})
            .then(res=>{
                const currentOrder=res.result.data[0]
                this.setData({currentOrder:currentOrder})
                this.setData({status:currentOrder.status})
                const time=formatTime(new Date(currentOrder.time))
                this.setData({time:time})

                const expectedtime=formatTime(new Date(currentOrder.expectedtime))
                this.setData({expectedtime:expectedtime})

                wx.cloud.callFunction({name:'postmanGetUser',data:{openid:this.data.currentOrder.openid}}).then(res=>{
                    this.setData({contact:res.result.data[0].contact})
                })

                if(currentOrder.type=='normal'){
                    const location=getLocation(currentOrder.location.building)+'楼 '+currentOrder.location.floor+'层'
                    this.setData({location:location})
                }
                else{
                    const location=currentOrder.location
                    this.setData({location:location})
                }

                const note=currentOrder.note
                this.setData({note:note})

                if(currentOrder.postman&&currentOrder.postman!=''){
                    wx.cloud.callFunction({name:'getOpenID'})
                    .then(res=>{
                        this.setData({openid:res.result})
                        wx.cloud.callFunction({name:'getPostman',data:{
                            openid:this.data.currentOrder.postman
                        }}).then(res=>{
                            this.setData({postman:res.result.data[0]})
                        })
                        if(res.result==currentOrder.postman){
                            this.setData({isPostman:true})
                        }
                        else{
                            this.setData({isPostman:false})
                        }
                    })
                    
                }
                else{
                    wx.cloud.callFunction({name:'getOpenID'})
                    .then(res=>{
                        
                        this.setData({openid:res.result})
                        wx.cloud.callFunction({name:'getPostman',data:{
                            openid:this.data.currentOrder.postman
                        }}).then(res=>{
                            this.setData({postman:res.result.data[0]})
                        })
                    })
                    this.setData({isPostman:false})
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
        this.onLoad({_id:this.data._id})
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.onLoad({_id:this.data._id})
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