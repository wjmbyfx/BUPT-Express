// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const _id=event._id
    let toReturn=await cloud.database().collection('suggest').where({_id:_id}).get().then(res=>{
        return res
    })
    return toReturn
}