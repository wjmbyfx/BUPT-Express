// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    const openid=wxContext.OPENID
    
    const location=event.location
    const expectedtime=event.expectedtime
    const time=event.time
    const note=event.note;
    
    const _id=event._id

    cloud.database().collection('order')
    .where({_id:_id}).update({data:{
        
        location:location,
        expectedtime:expectedtime,
        time:time,
        note:note
    }})
    
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}