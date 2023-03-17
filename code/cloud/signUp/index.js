// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
        let type=null;
        if(!event.contact){
            event.contact=""
        }//如果未传入联系方式,则将联系方式设为空

        if(event.isMember==true){
            await cloud.database().collection('user')
            .where({openid:wxContext.OPENID})
            .update({data:{username:event.username,location:{building:event.building,floor:event.floor},contact:event.contact,openid:wxContext.OPENID,credit:100,status:1}})
            type='update'
        }
        if(event.isMember==false){
            await cloud.database().collection('user')
            .add({data:{username:event.username,location:{building:event.building,floor:event.floor},contact:event.contact,openid:wxContext.OPENID,credit:100,status:1,score:5,count:0}})
            type='signUp'
        }
        return {msg:'success',type:type}
}