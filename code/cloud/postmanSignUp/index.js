// 云函数入口文件
const cloud = require('wx-server-sdk')
const secretKey='MIUL' //注册密钥
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid=wxContext.OPENID
    const username=event.username
    const contact=event.contact
    const key=event.secretkey
    let toReturn=''
    if(key==secretKey){
        toReturn='success'
        cloud.database().collection('postman').add({data:{
            openid:openid,
            username:username,
            status:1,
            credit:100,
            contact:contact
        }})
    }
    else{
        toReturn='fail'
    }

    return {msg:toReturn,secretkey:key}
}