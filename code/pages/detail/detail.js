// pages/detail/detail.js
const {formatTime}=require('../../utils/util.js')
const {getLocation}=require('../../utils/getLocation')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        expectedtime:null,
        location:null,
        note:null,
        status:null,
        time:null,
        type:null,
        _id:null

        
    },

    edit(e){
        console.log(e);
        const _id=e.currentTarget.dataset._id
        wx.reLaunch({
          url: '/pages/edit/edit?_id='+_id
        })

    },
    suggest(){
        wx.navigateTo({
          url: '/pages/suggest/suggest?_id='+this.data._id
        })
    },

    cancle(){
        if(this.data.status=='cancled'){
            wx.showToast({
              title: '无法重复取消',
              icon:'error',
              duration:1000
            })
        }
        else if(this.data.status=='success'){
            wx.showToast({
              title: '订单已完成',
              icon:'error',
              duration:1000
            })
        }
        else{
            wx.showModal({
                title: '提示',
                content: '确认要取消订单吗?',
              }).then(res=>{
                  if(res.confirm){
                    wx.cloud.callFunction({name:'updateOrderStatus',data:{
                        _id:this.data._id,
                        newStatus:'cancled'
                    }}).then(res=>{
                        console.log(res);
                    }).then(res=>{
                        wx.showToast({
                          title: '取消成功',
                          icon:'success',
                          duration:1000
                        })
                        setTimeout(()=>{
                            wx.reLaunch({
                              url: '/pages/hall/hall'
                            })
                        },1000)
                    })
                  }
              })
            
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

                    console.log(res);
                    const currentOrder=res.result.data[0] //所请求的订单对象
                    let expectedtime=new Date(currentOrder.expectedtime) //期望送达时间
                    let location=currentOrder.location //地址,可能为字符串或对象
                    const note=currentOrder.note //备注和描述
                    const status=currentOrder.status //订单状态 调用外部方法获取中文值
                    let time=new Date(currentOrder.time) //提交时间
                    const type=currentOrder.type //location种类
                    const _id=currentOrder._id
                        
                     //设置当前订单的状态

                    time=formatTime(time)
                    expectedtime=formatTime(expectedtime)
                    if (type=='normal') {
                        location=getLocation(location.building)+'楼 '+ location.floor+'层'
                    }
                    this.setData({expectedtime:expectedtime,
                        location:location,
                        transLocation:getLocation(location),
                        note:note,
                        status:status,
                        time:time,
                        type:type,
                        _id:_id
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