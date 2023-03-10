// pages/edit/edit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentUser:null,
        currentOrder:null,
        currentOrder:null,
        _id:null,
        type:null,
        location:null,
        expectedtime:null,
        isDefault:null,
        displayDate:null,
        displayTime:null,
        description:null,
        note:null,
        src:''
    },

    handleRemove(){
        this.setData({src:''})
    },

    handleUpload(){
        wx.chooseMedia({
          count:1,
          mediaType:'image',

        }).then(res=>{
            //console.log(res);
            const tempFilePath=res.tempFiles[0].tempFilePath
            const timeStamp=Date.now()
            let that = this
            wx.cloud.uploadFile({cloudPath:this.data.openid+' '+timeStamp,filePath:tempFilePath,
                success(res){
                    
                    
                    that.setData({src:res.fileID})
                }})
        })
    },

    handleCancle(){
        wx.navigateBack({
          delta:1
        })
    },

    bindDateChange(e){
        // //console.log(e);
        const newDate=e.detail.value
        this.setData({displayDate:newDate})
    },

    bindTimeChange(e){
        // //console.log(e);
        const newTime=e.detail.value
        this.setData({displayTime:newTime})
    },

    handleSubmit(e){
        //console.log(e);
        const newType=e.detail.value.type
        let newLocation=e.detail.value.location
        const newNote=e.detail.value.description+' '+e.detail.value.note
        const newDate=this.data.displayDate;
        const newTime=this.data.displayTime;
        const newTimeObj=new Date(newDate+' '+newTime)
        let newTimeStamp=newTimeObj.getTime()
        //console.log(newTimeStamp);
        if(newType=='normal'){
            wx.cloud.callFunction({name:'getUser'})
            .then(res=>{
                const userInfo=res.result.data[0]
                newLocation=userInfo.location
            }).then(res=>{
                wx.cloud.callFunction({name:'updateOrder',data:{
                    _id:this.data._id,
                    type:newType,
                    location:newLocation,
                    expectedtime:newTimeStamp,
                    note:newNote,
                    src:this.data.src

                }}).then(res=>{
                    wx.showToast({
                      title: '修改成功',
                      icon:'success',
                      duration:1000
                    })
                    setTimeout(()=>{
                        
                        wx.navigateBack({
                          delta:1
                        })
                    },1000)
                })
            })
        }
        else{
            wx.cloud.callFunction({name:'updateOrder',data:{
                _id:this.data._id,
                type:newType,
                location:newLocation,
                expectedtime:newTimeStamp,
                note:newNote,
                src:this.data.src

            }}).then(res=>{
                wx.showToast({
                  title: '修改成功',
                  icon:'success',
                  duration:1000
                })
                setTimeout(()=>{
                    wx.navigateBack({
                        delta:1
                    })
                },1000)
            })
        }
        
        
    },
                      


    onOptionChange(event) {
        const type=event.detail.value
        //console.log(event);
        //console.log(type);
        if(type=='normal'){
            this.setData({
                isDefault:true
            })
        }
        else{
            this.setData({
                isDefault:false
            })
        }
        
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({name:'getUser'}).then(res=>{
            this.setData({currentUser:res.result.data[0]})
        })
        .then(()=>{
            wx.cloud.callFunction({name:'getSpecificOrder',data:{
                _id:options._id
            }})
            .then(res=>{
                this.setData({currentOrder:res.result.data[0]})
                
                const currentOrder=res.result.data[0]
                const src=currentOrder.src
                this.setData({src:src})
                const _id=currentOrder._id
                const type=currentOrder.type
                let location=currentOrder.location
                const expectedtime=currentOrder.expectedtime

                const objExpectedTime=new Date(expectedtime)
                const year = objExpectedTime.getFullYear()
                const month = objExpectedTime.getMonth() + 1
                const day = objExpectedTime.getDate()
                const hour = objExpectedTime.getHours()
                let minute = objExpectedTime.getMinutes()
                const second = objExpectedTime.getSeconds()

                if(minute<10){
                    minute+='0'
                }

                const displayDate=year+'/'+month+'/'+day
                const displayTime=hour+':'+minute

                const disnote=currentOrder.note

                const description=disnote.split(' ')[0]
                const note=disnote.split(' ')[1]

                let isDefault=null
                if(type=='normal'){
                    isDefault=true
                    location=""
                }
                else{
                    isDefault=false
                } 

                this.setData({
                    currentOrder:res.result.data[0],
                    _id:currentOrder._id,
                    type:currentOrder.type,
                    location:location,
                    expectedtime:currentOrder.expectedtime,
                    isDefault:isDefault,
                    displayDate:displayDate,
                    displayTime:displayTime,
                    description:description,
                    note:note
                })
            })
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