// 云函数入口文件
const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
const appid = 1400801687 // 替换成您申请的云短信 AppID 以及 AppKey
const appkey = "8aa3f642bd171b40d8f7843ca2df3bff"
const templateId = 1727098 // 替换成您所申请模板 ID
const smsSign = "BUPT快递服务" // 替换成您所申请的签名

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {    
 /*单发短信示例为完整示例，更多功能请直接替换以下代码*/
 var qcloudsms = QcloudSms(appid, appkey);
 var ssender = qcloudsms.SmsSingleSender();
 var params = [];
 // 获取发送短信的手机号码
 var mobile = event.mobile
 // 获取手机号国家/地区码
 var nationcode = event.nationcode
 ssender.sendWithParam(nationcode, mobile, templateId, params, smsSign, "", "", (err, res, resData) => {
     /*设置请求回调处理, 这里只是演示，您需要自定义相应处理逻辑*/
     if (err) {
       console.log("err: ", err);
       reject({ err })
     } else {
       resolve({ res: res.req, resData })
     }
   }
 );

})