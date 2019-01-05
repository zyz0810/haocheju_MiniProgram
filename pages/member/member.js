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
      url: 'car/car',
    })
  },
  goInsurance: function () {
    util.navigateTo({
      url: 'insurance/insurance',
    })
  },
  goPersonnel:function(){
    wx.showToast({
      icon:'none',
      title: '此功能暂未开放',
    })
  },
  goFavorite:function(){
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放',
    })
  },
  



}))
