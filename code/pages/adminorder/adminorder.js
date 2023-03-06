// pages/adminorder/adminorder.js
const {formatTime}=require('../../utils/util.js')
const {getLocation}=require('../../utils/getLocation.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { name: '全部',  active: false, index: 0 },
            { name: '待确认',  active: false, index: 1 },
            { name: '派送中',  active: false, index: 2 },
            { name: '已完成',  active: false, index: 3 }
          ],
        all:[],
        pending:[],
        delivering:[],
        success:[],
        displayOrder:[]
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
      getSelectedOrder(e){
        // console.log(e.currentTarget.dataset._id);
        const selectedOrder=e.currentTarget.dataset._id
        wx.navigateTo({
          url: '/pages/detail/detail?_id='+selectedOrder
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'adminGetOrder',data:{
            status:'all'
        }
    }
    ).then(res=>{
        
        // console.log(res.result.data);
        res.result.data.forEach((v,i)=>{
            v.expectedtime=formatTime(new Date(v.expectedtime))
            if(v.type=='normal'){
                v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
            }
        })
        
        this.setData({all:res.result.data})
        if(options.status=='all'){

            this.setData({displayOrder:this.data.all,tabs:[{ name: '全部',  active: true, index: 0 },
            { name: '待确认',  active: false, index: 1 },
            { name: '派送中',  active: false, index: 2 },
            { name: '已完成',  active: false, index: 3 }]})
        }
        // this.setData({displayOrder:res.result.data})
    })
    
    wx.cloud.callFunction({name:'adminGetOrder',data:{
        status:'pending'
    }
    }
    ).then(res=>{
        res.result.data.forEach((v,i)=>{
            v.expectedtime=formatTime(new Date(v.expectedtime))
            if(v.type=='normal'){
                v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
            }
        })
        this.setData({pending:res.result.data})
        if(options.status=='pending'){

            this.setData({displayOrder:this.data.pending,tabs:[{ name: '全部',  active: false, index: 0 },
            { name: '待确认',  active: true, index: 1 },
            { name: '派送中',  active: false, index: 2 },
            { name: '已完成',  active: false, index: 3 }]})
        }
    })

    wx.cloud.callFunction({name:'adminGetOrder',data:{
        status:'delivering'
    }
    }
    ).then(res=>{
        res.result.data.forEach((v,i)=>{
            v.expectedtime=formatTime(new Date(v.expectedtime))
            if(v.type=='normal'){
                v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
            }
        })
        this.setData({delivering:res.result.data})
        if(options.status=='delivering'){

            this.setData({displayOrder:this.data.delivering,tabs:[{ name: '全部',  active: false, index: 0 },
            { name: '待确认',  active: false, index: 1 },
            { name: '派送中',  active: true, index: 2 },
            { name: '已完成',  active: false, index: 3 }]})
        }
    })

    wx.cloud.callFunction({name:'adminGetOrder',data:{
        status:'success'
    }
    }
    ).then(res=>{
        res.result.data.forEach((v,i)=>{
            v.expectedtime=formatTime(new Date(v.expectedtime))
            if(v.type=='normal'){
                v.location=getLocation(v.location.building)+'楼 '+v.location.floor+'层'
            }
        })
        this.setData({success:res.result.data})
        
    })
    if(options==undefined)
        // console.log(options.status);
        
    {
        this.setData({displayOrder:this.data.all,tabs:[{ name: '全部',  active: true, index: 0 },
        { name: '待确认',  active: false, index: 1 },
        { name: '派送中',  active: false, index: 2 },
        { name: '已完成',  active: false, index: 3 }]})
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