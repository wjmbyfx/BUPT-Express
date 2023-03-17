// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const status=event.status
    let toReturn=''
    const skip=event.skip*8
    let building=event.building;
    if(building=='all'){
        if(status=='all'){
            toReturn = await cloud.database().collection('order').orderBy('time','asc').limit(8).skip(skip).get()
        .then(res=>{
            return res
        })
        }
        else{
    
            toReturn = await cloud.database().collection('order').orderBy('time','asc').where({status:status}).limit(8).skip(skip).get()
            .then(res=>{
                return res
            })
        }
    }
    else{
        if(status=='all'){
            toReturn = await cloud.database().collection('order').orderBy('time','asc').where({location:{building:building}}).limit(8).skip(skip).get()
        .then(res=>{
            return res
        })
        }
        else{
    
            toReturn = await cloud.database().collection('order').orderBy('time','asc').where({status:status,location:{building:building}}).limit(8).skip(skip).get()
            .then(res=>{
                return res
            })
        }
    }
    return toReturn
}