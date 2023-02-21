// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const newContact=event.contact;
    cloud.database().collection('user').where({openid:wxContext.OPENID}).update({data:{contact:newContact}})
    return 'alter success'
}