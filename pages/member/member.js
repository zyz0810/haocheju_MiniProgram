let app = getApp()
let Member = require('../../service/member.js')
let util = require('../../utils/util.js')
let config = require('../../utils/config.js')
let navCart = require("../../template/cart/cart.js")
Page(Object.assign({}, navCart, {
  data: {
    memberInfo: {}
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var userId = wx.getStorageSync('userId')
    new Member(res => {
      console.log(res)
      this.setData({
        avatar: res.data.avatar,
        nickname: res.data.nickname ? res.data.nickname : res.data.username,
        signature: res.data.signature,
        phone: res.data.phone,
        type: res.data.type,
        idtype: res.data.idtype,
        verify: res.data.verify
      })
    }).view({ userId: userId })
  },
  goCarpool: function () {
    util.navigateTo({
      url: 'carpool/carpool',
    })
  },
  goCircle:function(){
    util.navigateTo({
      url: 'circle/circle',
    })
  },
  goOrder:function(e){
    var id = e.currentTarget.dataset.current
    util.navigateTo({
      url: 'order/order?id=' + id,
    })
  },
  goEdit: function () {
    util.navigateTo({
      url: 'edit/edit',
    })
  },
  goCar:function(){
    util.navigateTo({
      url: 'collection/collection',
    })
  },
  goInsurance: function () {
    util.navigateTo({
      url: '/pages/home/insurance/insurance',
    })
  },
  goAuthentication:function(){
    util.navigateTo({
      url: 'authentication/authentication',
    })
  },
  goFavorite:function(){
    util.navigateTo({
      url: 'collection/collection',
    })
  },
  goDealer: function () {
    util.navigateTo({
      url: 'dealer/dealer',
    })
  },
  goFeedback:function() {
    util.navigateTo({
      url: 'feedback/feedback',
    })
  }, 
  goPhone: function() {
    util.navigateTo({
      url: 'mobile/mobile',
    })
  },


}))
