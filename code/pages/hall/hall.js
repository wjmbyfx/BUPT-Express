// pages/hall/hall.js
const {formatTime}=require('../../utils/util.js')
// const {getStatus}=require('../../utils/status.js')
const {getLocation}=require('../../utils/getLocation.js')
//依赖包

Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:'',
        currentOrder:'', //最新订单的对象
        orderList:'',  //所有订单的对象
        isPostman:false
    },
    becomeDeliver(){
        wx.navigateTo({
          url: '/pages/signup1/signup1',
        })
    },
    goDeliver(){
        wx.navigateTo({
          url: '/pages/hall1/hall1',
        })
    },

    confirm(e){ 
        if(this.data.currentStatus=='cancled'){
            wx.showToast({
              title: '订单已取消',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentStatus=='success'){
            wx.showToast({
              title: '订单已完成',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.currentStatus=='warning'){
            wx.showToast({
              title: '订单出错了',
              icon:'error',
              duration:1000
            })
        }
        else{
            const _id=this.data.currentOrder._id
            //console.log(_id);
            wx.showModal({
              title:'确认要收货吗?'
              
            }).then(res=>{
                if(res.confirm){
                    wx.cloud.callFunction({name:'updateOrderStatus',data:{
                         _id:_id,
                        newStatus:'success'
                        }}).then(res=>{
                            wx.showToast({
                              title: '收货成功!',
                              icon:'success',
                              duration:1000
                            })
                            setTimeout(()=>{
                                this.onLoad()
                            },1000)
                        })
                        
                    
                }
            })
        }
    },

    all(){
        wx.navigateTo({
          url: '/pages/order/order?status=all',
        })
    },

    goAdd(){
        wx.switchTab({
          url: '/pages/add/add',
        })
    },

    goSignUp(){
        wx.navigateTo({
          url: '/pages/signup/signup',
        })
    },

    getSelectedOrder(e){
        const selectedOrder=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+selectedOrder
        })
    },

    getCurrentOrder(e){
        const current_id=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+current_id
        })
    }, //处理请求当前订单

    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad(options) {
        wx.cloud.callFunction({name:'isPostman'}).then(res=>{
            if(res.result.data.length==1){
                this.setData({isPostman:true})
            }
            
        })

        wx.cloud.callFunction({
            name:'getOrder'
        })
        .then(res=>{
            

            if(res.result.data.length!=0){
                let currentOrder=res.result.data[0]; //获取最新订单
                currentOrder.note=currentOrder.note.slice(0,8)+'...'
            
            {
                const location=currentOrder.location;
                if(currentOrder.type=='normal'){
                    currentOrder.location=getLocation(location.building)+'楼 '+location.floor+'层'
                }
            }

            {
                    let currentSubmitTime=new Date(currentOrder.time)
                    currentOrder.time=formatTime(currentSubmitTime)
                    
                    let currentExpectedTime=new Date(currentOrder.expectedtime)
                    currentOrder.expectedtime=formatTime(currentExpectedTime)
                    
            } //设置提交和送达时间
                



                this.setData({orderList:res.result.data})
                this.setData({currentOrder:currentOrder})
                
                
                
                if(this.data.currentOrder.status=='pending'||this.data.currentOrder.status=='delivering'){
                    this.setData({displayConfirm:true})
                } //判断是否展示确认收货按钮
            

            
            

            
            

        }

        let orderList=res.result.data; //获取全部订单
        orderList=orderList.slice(1) //去除最新的订单
        if(orderList.length>3){
            orderList=orderList.slice(0,3) //订单数超过3就截取最新的三个订单
        }
        if(orderList.length!=0){
            orderList.forEach((v,i)=>{
                {
                    v.displayStatus=v.status
                    
                } //设置字面状态
                {
                    let submitTime=new Date(v.time);
                    v.submitTime=formatTime(submitTime)

                } //设置提交时间
            })
            this.setData({orderList:orderList})
        } //如果有历史订单,则设置展示状态及提交时间


        }) //设置当前订单
          
        {
            wx.cloud.callFunction({name:'getImage'})
            .then(res=>{
            const src=res.result
            this.setData({src:src})
            })
        } //设置图片src
        
        wx.cloud.callFunction({name:'isMember'})
        .then(res=>{
            this.setData({isMember:res.result})
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
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.onLoad()
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
        this.onLoad()
        wx.stopPullDownRefresh()
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.onLoad()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})