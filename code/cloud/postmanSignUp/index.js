// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    let secretKey=await cloud.database().collection('token').get().then(res=>{
        return res.data[0].token;
    })
    const wxContext = cloud.getWXContext()
    const openid=wxContext.OPENID
    const username=event.username
    const contact=event.contact
    const key=event.secretkey
    const type=event.type
    let toReturn=''
    if(key==secretKey){
        toReturn='success'
        if(type=='add'){
            cloud.database().collection('postman').add({data:{
                openid:openid,
                username:username,
                status:1,
                credit:100,
                contact:contact,
                score:5,
                count:0
            }})
        }
        if(type=='updated'){
            cloud.database().collection('postman').update({data:{
                openid:openid,
                username:username,
                contact:contact
            }})
        }
        
    }
    else{
        toReturn='fail'
    }

    return {msg:toReturn,secretkey:key}
}