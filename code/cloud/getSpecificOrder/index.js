// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {

    let toReturn=null
    const wxContext = cloud.getWXContext()
    const _id=event._id
    await cloud.database().collection('order').where({_id:_id}).get()
    .then(res=>{
        toReturn=res
    })
    return toReturn
}