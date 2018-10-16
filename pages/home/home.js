// pages/home/home.js

let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  Product = require("../../service/product.js"),
  Cart = require("../../service/cart.js"),
  Coupon = require("../../service/coupon.js"),
  Tenant = require("../../service/tenant.js"),
  Ad = require("../../service/ad.js"),
  app = getApp(),
  util = require("../../utils/util.js"),
  navCart = require("../../template/cart/cart.js")

Page(Object.assign({}, swiperAutoHeight, navCart, {

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  // onReady() {
  //   this.setData({
  //     winHeight: wx.getSystemInfoSync().windowHeight
  //   })

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  //跳转资讯列表页
  goNewsList(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: './../news/news',
    })
  },
  //跳转资讯详情页
  goNewsView(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: './../news/view/view?id=' + id,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  // onReachBottom: function() {
  //   var that = this;
  //   wx.showNavigationBarLoading();
  //   // var pageModel = this.data.pageModel;
  //   var newPageModel = this.data.paging.newsell;
  //   var newsell = this.data.newsell;
  //   new Product(function(data) {
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     if (data.pageModel.totalPages < data.pageModel.pageNumber) {
  //       that.setData({
  //         tips: '',
  //         showtips: false
  //       })
  //     } else {
  //       newsell = newsell.concat(data.data)
  //       that.setData({
  //         newsell: newsell,
  //         loading: false,
  //         tips: '努力加载中',
  //         showtips: false
  //       })
  //     }
  //   }).listT({
  //     id: app.globalData.tenantId,
  //     pageNumber: ++newPageModel.pageNumber,
  //     pageSize: 10,
  //     tagIds: 2
  //   })
  // },





  __pt_toDetail(e) {
    wx.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + e.currentTarget.dataset.id,
    })
  }
}))