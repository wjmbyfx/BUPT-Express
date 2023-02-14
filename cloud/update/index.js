// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const name=event.name;
    const price=event.price;

    const db=cloud.database();
    if((await db.collection('good').where({name:name}).get()).data.length==1){
        db.collection('good').where({name:name}).update({data:{price:price}})
        return 1;
    }
    else{
        return 0;
    }
    
    
}