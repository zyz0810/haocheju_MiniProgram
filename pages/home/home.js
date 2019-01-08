// pages/home/home.js

let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  First = require("../../service/first.js"),
  app = getApp(),
  util = require("../../utils/util.js")

Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

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

  onShow(){
    //获取首页内容
    new First(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        menu: res.data.return_meun,
        ad: res.data.return_place,
        news: res.data.return_new
      })
    }).do()
  },
  
  goMenu:function(e){
    console.log(e)
    let urlCurrent = e.currentTarget.dataset.url
    util.navigateTo({
      url: urlCurrent,
    })
  },
  goMaintain:function(){
    util.navigateTo({
      url: '/pages/home/maintain/maintain',
    })
  },
  goAccessories:function(){
    util.navigateTo({
      url: '/pages/home/accessories/accessories',
    })
  }, 
  goHire: function() {
    util.navigateTo({
      url: 'hire/hire',
    })
  },
  goTrial:function(){
    util.navigateTo({
      url: 'trial/trial',
    })
  },
  goRoadRescue:function(){
    util.navigateTo({
      url: 'roadRescue/roadRescue',
    })
  },
  goSchool: function () {
    util.navigateTo({
      url: 'school/school',
    })
  },
  goPersonnelCar:function(){
    util.navigateTo({
      url: 'personnelCar/personnelCar',
    })
  },
  goSteamProtection: function () {
    util.navigateTo({
      url: 'steamProtection/steamProtection',
    })
  },
  goInsurance:function(){
    util.navigateTo({
      url: 'insurance/insurance',
    })
  },
  goTransaction: function () {
    util.navigateTo({
      url: 'transaction/transaction',
    })
  },
  goBeauty: function () {
    util.navigateTo({
      url: 'beauty/beauty',
    })
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