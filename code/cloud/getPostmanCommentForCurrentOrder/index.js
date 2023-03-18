// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const _id=event._id;
    const me='postman'
    let toReturn=await cloud.database().collection('comment').where({oid:_id,me:me}).orderBy('time','desc').get().then(res=>{
        return res;
    })
    return toReturn;
}