// pages/home/maintain/view/view.js
let swiperAutoHeight = require("../../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../../service/cars.js"),
  app = getApp(),
  WxParse = require('../../../wxParse/wxParse.js'),
  util = require("../../../../utils/util.js")
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
    new Cars(res => {
      console.log(res)
      var carcontent = res.data.carcontent;
      this.setData({
        banner: res.data.banner,
        name: res.data.cartype,
        price: res.data.carprice,
        tenant: res.data.goodname,
        brandlogo: res.data.brandlogo,
        engine: res.data.engine,
        totalfuel: res.data.totalfuel,
        drivingmode: res.data.drivingmode,
        bodywork: res.data.bodywork,
        gearbox: res.data.gearbox,
        warranty: res.data.warranty,
        carcontent: res.data.carcontent,
        isCollection: res.data.isCollection,
        providerid: res.data.providerid
      })
      WxParse.wxParse('carcontent', 'html', carcontent, that, 0);
    }).newView({
      id: options.id,
      userId: 1
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