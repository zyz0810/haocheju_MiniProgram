let app = getApp();
let util = require('../../utils/util.js');
let Order = require('../../service/order.js');
let Member = require('../../service/member.js');

Page(Object.assign({}, {

  /**
   * 页面的初始数据
   */
  data: {
    actionsheet:true
  },



  onLoad: function(options) {
    this.setData({
      trade_no: options.trade_no
    })
  },
  onShow: function (){

    var that = this

    new Order(res => {
      console.log(res)
      this.setData({
        goodsDesc: res.data.goods.desc,
        goodsLogo: res.data.goods.logo,
        shopgoods: res.data.goods.shopgoods,
        // oldPrice: res.data.price,
        nickname: res.data.info.nickname,
        phone: res.data.info.phone,
        addtime: res.data.order.addtime,
        cost: res.data.order.cost,
        discount: res.data.order.discount,
        money: res.data.order.money,
        trade_no: res.data.order.trade_no
      })
    }).detail({
      trade_no: that.data.trade_no
    })
  },



  //买家留言
  inputMemo: function(e) {
    this.setData({
      memo: e.detail.value
    })
  },

  //确认下单提交
  // formSubmit: function(e) {
  //   var formId = e.detail.formId;
  //   var that = this;
  //   that.ActionsheetShow(Object.assign({}, {
  //     closeJump: '/pages/member/order/order?id=1',
  //     successJump: '/pages/pay/success'
  //   }))
  // }
  orderBtn:function(e){
      this.setData({
        actionsheet:false
      })
  },
  formSubmit: function (e) {
    var that = this
    var userId = wx.getStorageSync('userId')
    new Member(res => {
      console.log(res)
      this.setData({
        openid: res.data.xcxopenid,
      })


      new Order(res=> {

        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) { 
            wx.showToast({
              title: '支付成功',
              success:function(){
                setTimeout(function(){
                  util.navigateTo({
                    url: '/pages/member/order/order?id=2',
                  })
                },2000)
              }
            })
          },
          fail(res) { 
            wx.showToast({
              title: '支付失败',
            })
          }
        })



      }).pay({
        trade_no: that.data.trade_no, goodname: that.data.shopgoods, amount: that.data.cost, openid: that.data.openid
      })

    }).view({ userId: userId })
  }
}))