// components/orderOperation/orderOperation.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        _id:{
            type:'String',
            value:''
        },
        role:{
            type:'String',
            value:''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        status:'active'
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        suggest(){
            wx.navigateTo({
              url: '/pages/suggest/suggest?_id='+this.data._id,
            })
        },

        acceptOrder(){
            wx.showModal({
              title:'是否要过审?'
            }).then(res=>{
                if(res.confirm){
                    wx.cloud.callFunction({name:'adminUpdateOrderStatus',data:{
                        newStatus:'pending',_id:this.data._id
                        
                    }}).then(res=>{
                        wx.showToast({
                          title: '过审成功',
                          duration:1000
                        })
                        setTimeout(()=>{
                            this.triggerEvent('reload',{},{})
                        },1000)
                        this.setData({status:'deactive'})
                    })
                }
            })
        }, //订单过审

        rejectOrder(){
            wx.showModal({
              title:'是否要拒绝订单?'
            }).then(res=>{
                if(res.confirm){
                    wx.cloud.callFunction({name:'adminUpdateOrderStatus',data:{
                        newStatus:'rejected',_id:this.data._id
                    }}).then(res=>{
                        wx.showToast({
                          title: '拒绝成功',
                          duration:1000
                        })
                        setTimeout(()=>{
                            this.triggerEvent("reload",{},{})
                        },1000)
                        this.setData({status:'deactive'})
                    })
                }
            })
        } //拒绝订单
    }
})
