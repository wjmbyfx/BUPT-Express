

async function getScore(openid){
    let toReturn= await wx.cloud.callFunction({name:'getAllComment',data:{
        openid:openid 
    }}).then(res=>{
        const commentList=res.result.data;
        let score=0;
        if(commentList.length==0){
            return Promise.resolve('评分人数不足')
        }
        commentList.forEach((v,i)=>{
            score+=v.score;
        })
        score/=commentList.length;
        return Promise.resolve(score)
    })
    return toReturn
}
module.exports={getScore}

