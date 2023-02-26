function getStatus(status){
    if(status){
        if(status=='delivering'){
            status='派送中'
        }
        else if(status=='pending'){
            status='待确认'
        }
        else if(status=='cancled'){
            status='已取消'
        }
        else if(status=='warning'){
            status='出错了'
        }
        else if(status=='success'){
            status='已完成'
        }
    }
    return status
}
module.exports={getStatus}
