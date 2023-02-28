function mustSignUp(){
    wx.cloud.callFunction({name:'isMember'}).then(res=>{
        // console.log(res);
        if(!res.result){
            wx.showModal({
              title: '请完善信息',
            }).then(res=>{
                if(res.confirm){
                    wx.navigateTo({
                        url: '/pages/signup/signup',
                      })
                }
                else{
                    wx.switchTab({
                      url: '/pages/hall/hall',
                    })
                }
            })
            

            
        }
    })
}
module.exports={mustSignUp}
