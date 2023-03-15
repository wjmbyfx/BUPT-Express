// components/detail/detail.js

const {formatTime}=require('../../utils/util')
const {getLocation}=require('../../utils/getLocation')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        role:{
            type:'String',
            value:''
        },
        _id:''
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
        handleImageTap(){
            wx.previewImage({
              urls: [this.data.currentOrder.src],
              
            })
        },

        

        reload(){
            const _id=this.data._id;
        wx.cloud.callFunction({name:'getSpecificOrder',data:{
            _id:_id
        }}).then(res=>{
            let currentOrder=res.result.data[0]
            currentOrder.time=formatTime(new Date(currentOrder.time));
            currentOrder.expectedtime=formatTime(new Date(currentOrder.expectedtime))

            if(currentOrder.type=='normal'){
                currentOrder.location=getLocation(currentOrder.location.building)+'楼 '+currentOrder.location.floor+'层'
            }

            wx.cloud.callFunction({name:'getUser',data:{openid:currentOrder.openid}}).then(res=>{
                currentOrder.userContact=res.result.data[0].contact;
            }).then(result=>{
                this.setData({currentOrder:res.result.data[0]})
            })
            if(currentOrder.postman!=''){
                wx.cloud.callFunction({name:'getPostman',data:{openid:currentOrder.postman}}).then(res=>{
                    currentOrder.postmanContact=res.result.data[0].contact;
                }).then(result=>{
                    this.setData({currentOrder:currentOrder})
                })
            }
            
            this.setData({currentOrder:currentOrder})
        })
        }
    },

    ready(){
        this.reload();
    }
})
