// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    cloud.openapi.subscribeMessage.send({
        touser:event.openid,
        page:'/pages/hall/hall',
        data:{
            character_string1:{
                value:event._id,
            },
            thing2:{
                value:event.status
            },
            thing3:{
                value:event.note
            },
            phone_number5:{
                value:event.contact
            },
            thing10:{
                value:event.location
            }
        },
        templateId:'tYbs9s4DZfdcp880gkYTa-3-O0E2SD6x6_xW9mCAKR0',
        miniprogram_state:'developer' //记得改状态
    })
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}