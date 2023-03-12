// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()


        const username=event.username
        const time=Date.now()
        const openid=wxContext.OPENID
        const status=event.status
        const type=event.type
        const expectedtime=event.expectedtime
        const note=event.note
        const location=event.location
        const src=event.src
           //获取所需变量
           
    let toReturn=null
    await cloud.database().collection('order')
    .add({data:{
        openid:openid,
        status:status,
        type:type,
        location:location,
        expectedtime:expectedtime,
        note:note,
        time:time,
        src:src,
        postman:'',
        username:username
    }}).then(res=>{
        toReturn=res
    })
    return toReturn
}