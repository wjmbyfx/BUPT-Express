// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid=wxContext.OPENID
    let toReturn=cloud.database().collection('admin').where({openid:openid}).get().then(res=>{
        if(res.data.length!=0){
            return true
            
        }
        else{
            return false
        }
    })
    return toReturn
}