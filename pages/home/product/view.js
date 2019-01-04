// pages/home/maintain/view/view.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Product = require("../../../service/product.js"),
  app = getApp(),
  WxParse = require('../../wxParse/wxParse.js'),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    new Product(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.shopgoods
      })
      var detail = res.data.detail
        this.setData({
          banner: res.data.images,
          shopgoods: res.data.shopgoods,
          price: res.data.cost,
          oldPrice: res.data.price,
          detail: res.data.detail
        })
      WxParse.wxParse('detail', 'html', detail, that, 0);
    }).view({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  goBuy: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/pay/pay?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  //联系我们
  callUs: function () {
    wx.makePhoneCall({
      phoneNumber: '0556-7820666',
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow('0556-7820666', 5000)
        }

      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
  
}))