// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const type=event.type
    const _=cloud.database().command
    let toReturn=''
    if(type=='all'){
        toReturn=await cloud.database().collection('postman').get().then(res=>{
            return res
        })
    }
    else{
        toReturn=await cloud.database().collection('postman').where({credit:_.lt(60)}).get().then(res=>{
            return res;
        })
    }
    
    return toReturn
}