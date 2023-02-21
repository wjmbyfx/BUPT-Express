// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const ill01='cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/i01.jpg'
    const ill02='cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/i02.jpg'
    const ill03='cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/i03.jpg'
    const ill04='cloud://buptexpress-5goetp5o571a721f.6275-buptexpress-5goetp5o571a721f-1316844506/i04.jpg'
    const list=[ill01,ill02,ill03,ill04]
    function getRandomInt(max){
        return Math.floor(Math.random()*max)
    }
    const num=getRandomInt(4);

    const wxContext = cloud.getWXContext()

    return list[num];
}