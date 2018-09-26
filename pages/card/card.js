let app = getApp()
let util = require('../../utils/util.js')
let config = require('../../utils/config.js')
Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    var url = config.BASE_URL+'weixin/card/bag.html?tenantId='+app.globalData.tenantId
    this.setData({
      url: url
    })
  },

  onShow: function () {

  },


})