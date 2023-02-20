// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
     cloud.database().collection('user')
     .add({data:{openid:wxContext.OPENID,location:{building:event.building,floor:event.floor},credit:100}});
    if(event.contact!=''){
         cloud.database().collection('user').
        where({openid:wxContext.OPENID})
        .update({data:{contact:event.contact}})
    }
    if(event.contact!=''){
        return{
            msg:'signup success with contact submit!'
        }
    }
    else{
        return {
        msg:'signup success without contact submit!'
    }
}
}