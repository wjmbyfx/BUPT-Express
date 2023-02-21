// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let toReturn=null;
    if(event.status!=null){
        await cloud.database().collection('order').where({openid:wxContext.OPENID,status:event.status}).get()
        .then(res=>{
            toReturn=res
        })
    }
    else{

        await cloud.database().collection('order').where({openid:wxContext.OPENID}).get()
        .then(res=>{
            toReturn=res;
        })
    }
    return toReturn
}