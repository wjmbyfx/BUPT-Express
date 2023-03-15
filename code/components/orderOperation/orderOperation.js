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

    },

    /**
     * 组件的方法列表
     */
    methods: {
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
                            this.triggerEvent('getBack',{},{})
                        },1000)
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
                            this.triggerEvent("getBack",{},{})
                        },1000)
                    })
                }
            })
        }
    }
})
