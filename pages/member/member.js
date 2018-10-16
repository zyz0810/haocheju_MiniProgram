let app = getApp()
let Member = require('../../service/member.js')
let coupon = require('../../service/coupon.js')
let util = require('../../utils/util.js')
let message = require('../../service/message.js')
let config = require('../../utils/config.js')
let navCart = require("../../template/cart/cart.js")
Page(Object.assign({}, navCart, {
  data: {
    memberInfo: {}
  },
  onLoad: function (options) {

  },
  onShow: function () {
    
  },
  //我的钱包
  purse: function () {
    util.navigateTo({
      url: 'purse/purse',
    })
  },
}))
