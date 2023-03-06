// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    const openid=wxContext.OPENID
    const src=event.src
    const location=event.location
    const expectedtime=event.expectedtime
    const note=event.note;
    const type=event.type
    const _id=event._id
    const _=cloud.database().command
    await cloud.database().collection('order')
    .where({_id:_id}).update({data:{
        location:_.remove(),
        src:src,
        expectedtime:expectedtime,
        note:note,
        type:type
    }}).then(res=>{
        cloud.database().collection('order')
    .where({_id:_id}).update({data:{
        location:location
    }})
    })
    
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}