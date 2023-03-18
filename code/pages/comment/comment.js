// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identity: 'user',
        score: 5,
        postmanOpenid: '',
        _id: '',
        grade: '',
        pgrade:'',
        rcontent: '',
        pcontent:'',
        isCommented: false,
        pisCommented: false

    },
    ok(e) {

        this.setData({
            score: 3,
            _num: 2
        })
    },
    bad(e) {
        this.setData({
            score: 1,
            _num: 1
        })
    },
    good(e) {
        this.setData({
            score: 5,
            _num: 3
        })
    },
    toDetail() {
        wx.navigateTo({
            url: '/pages/detail/detail?_id=' + this.data._id,
        })
    },
    onSend(e) {
        wx.cloud.callFunction({
            name: 'userCommentPostman',
            data: {
                score: this.data.score,
                oid: this.data._id,
                content: e.detail.value.content
            }
        }).then(res => {
            wx.showToast({
                title: '成功',
                icon: "success",
                duration: 1000
            })
            this.onLoad({identity:this.data.identity,
            postmanOpenid:this.data.postmanOpenid,_id:this.data._id})
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //console.log(options);
        this.setData({
            identity: options.identity,
            postmanOpenid: options.postmanopenid,
            _id: options._id
        })
        if (this.data.identity == 'user') {
            wx.cloud.callFunction({
                name: 'getUserCommentForCurrentOrder',
                data: {
                    _id: this.data._id
                }
            }).then(res => {
                console.log(res);
                
                if (res.result.data.length != 0) {
                    this.setData({
                        isCommented: true,
                        grade: res.result.data[0].score,
                    rcontent: res.result.data[0].content
                    })
                }

            })
            wx.cloud.callFunction({
                name: 'getPostmanCommentForCurrentOrder',
                data: {
                    _id: this.data._id
                }
            }).then(res => {
                //  console.log(res);
                if (res.result.data.length != 0) {
                    this.setData({
                        pisCommented: true,
                    pgrade: res.result.data[0].score,
                    rcontent: res.result.data[0].content
                })
            }

            })
        } else{
            wx.cloud.callFunction({
                name: 'getPostmanCommentForCurrentOrder',
                data: {
                    _id: this.data._id
                }
            }).then(res => {
                // console.log(res);
                
                if (res.result.data.length != 0) {
                    this.setData({
                        pisCommented: true,
                        pgrade: res.result.data[0].score,
                        pcontent: res.result.data[0].content
                    })
                }

            })
            wx.cloud.callFunction({
                name: 'getUserCommentForCurrentOrder',
                data: {
                    _id: this.data._id
                }
            }).then(res => {
                // console.log(res);
                
                if (res.result.data.length != 0) {
                    this.setData({
                        isCommented: true,
                        grade: res.result.data[0].score,
                        rcontent: res.result.data[0].content
                    })
                }

            })
        }






    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})