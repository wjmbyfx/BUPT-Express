// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if(event.type='policy'){
        return {
            event,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
            date:'2023/2/16',
            text:'cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/隐私协议.png'
    
        }
    }
    else{
        return {
            event,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
            text:'cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/用户协议.png	'
        }
    }
    
}