// components/orderList/orderList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        orderList:{
            type:'Array',
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goVerify(e){
            this.triggerEvent('goVerify',{_id:e.currentTarget.dataset._id})
        }
    }
})
