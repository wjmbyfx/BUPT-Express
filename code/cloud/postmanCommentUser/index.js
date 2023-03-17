// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const score=event.score
    const count=event.count
    const targetOpenid=event.openid
    const content=event.content
    const time=Date.now()
    const oid=event.oid
    cloud.database().collection('comment').add({data:{
        targetOpenid:targetOpenid,openid:wxContext.OPENID,score:score,content:content,time:time,oid:oid,me:'postman'
    }})
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}