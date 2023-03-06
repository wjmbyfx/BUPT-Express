// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const secretkey=event.newkey
    cloud.database().collection('token').where({sig:'1'}).update({data:{
        token:secretkey
    }})
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}