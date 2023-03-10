// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const time=Date.now()
    const wxContext = cloud.getWXContext()
    const content=event.content
    cloud.database().collection('suggest').add({data:{
        content:content,
        openid:wxContext.OPENID,
        oid:event._id,
        time:time
    }})
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}