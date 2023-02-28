// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { name: '全部',  active: true, index: 0 },
            { name: '待确认',  active: false, index: 1 },
            { name: '派送中',  active: false, index: 2 },
            { name: '已完成',  active: false, index: 3 }
          ],
        all:[],
          pending:[],
          delivering:[],
          success:[],
        
          displayOrder:[1,2,3]
          
        

    },
    tabClick(e) {
        const index = e.currentTarget.dataset.index;
        const tabs = this.data.tabs
        tabs.forEach((v,i)=>{
            if(i==index){
                console.log(index);
                v.active=true
            }
            else{
                v.active=false
            }
        })
        this.setData({ tabs:tabs });
        if (index==0) {
            this.setData({displayOrder:this.data.all})
        }
        else if (index==1) {
            this.setData({displayOrder:this.data.pending})
        }
        else if (index==2) {
            this.setData({displayOrder:this.data.delivering})
        }
        else if (index==3) {
            this.setData({displayOrder:this.data.success})
        }
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
            
            wx.cloud.callFunction({name:'getOrder'
    }
    ).then(res=>{
        console.log(res);
        this.setData({all:res.result.data})
        this.setData({displayOrder:res.result.data})
    })
    wx.cloud.callFunction({name:'getOrder',data:{
        status:'pending'
    }
    }
    ).then(res=>{
        this.setData({pending:res.result.data})
    })
    wx.cloud.callFunction({name:'getOrder',data:{
        status:'delivering'
    }
    }
    ).then(res=>{
        this.setData({delivering:res.result.data})
    })
    wx.cloud.callFunction({name:'getOrder',data:{
        status:'success'
    }
    }
    ).then(res=>{
        this.setData({success:res.result.data})
        
    })
    if(options!=undefined){
        this.setData({displayOrder:['options.status']})
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