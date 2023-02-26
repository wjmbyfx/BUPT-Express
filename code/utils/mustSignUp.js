function mustSignUp(){
    wx.cloud.callFunction({name:'isMember'}).then(res=>{
        // console.log(res);
        if(!res.result){
            wx.showToast({
              title: '请完善信息',
              icon:'error',
              duration:1000
            })
            
            setTimeout(()=>{
                wx.navigateTo({
                  url: '/pages/signup/signup',
                })
            },1000)
            
        }
    })
}
module.exports={mustSignUp}
