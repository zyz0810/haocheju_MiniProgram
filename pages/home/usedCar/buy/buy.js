// pages/usedCar/buy/buy.js
let swiperAutoHeight = require("../../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../../service/cars.js"),
  app = getApp(),
  util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultOrder: false,
    brand: true,
    price: true,
    rank: true,
    topIndex: "0",
    activeIndex: '1-1',
    brandname: 0,
    pricename: 0,
    typename: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  goView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '../view/view?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Cars(function (res) {
            that.setData({
              brandlist: res.data.brandlist,
              pricelist: res.data.pricelist,
              typelist: res.data.typelist,
              list: res.data.return_newcar.data,
              page: res.data.return_newcar.pageTotal,
              currentPage: res.data.return_newcar.currentPage
            })
          }).usedList({
            pageSize: 10,
            page: 1,
            brandname: 0,
            price: 0,
            type: 0
          })
        }
      }
    })
    
  },
  listLoad(){
    var that = this
    new Cars(function (res) {
      that.setData({
        brandlist: res.data.brandlist,
        pricelist: res.data.pricelist,
        typelist: res.data.typelist,
        list: res.data.return_newcar.data,
        page: res.data.return_newcar.pageTotal,
        currentPage: res.data.return_newcar.currentPage
      })
    }).usedList({
      page: 1,
      pageSize: 10,
      brandname: that.data.brandname,
      price: that.data.pricename,
      type: that.data.typename
    })
  },
  maskBtn: function() {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true
    })
  },
  defaultBtn: function() {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true,
      topIndex: "0"
    })
  },
  brandBtn: function() {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: false,
      price: true,
      rank: true,
      topIndex: "1"
    })
  },
  priceBtn: function() {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: false,
      rank: true,
      topIndex: "2"
    })
  },
  rankBtn: function() {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: false,
      topIndex: "3"
    })
  },
  conditionBtn: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    this.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true,
      activeIndex: id
    })
  },
  brandTxt: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    this.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true,
      activeIndex: id,
      brandname: e.currentTarget.dataset.txt == '全部' ? '0' : e.currentTarget.dataset.txt,
      pricename: 0,
      typename: 0
    })
    this.listLoad();
  },
  priceTxt: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    this.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true,
      activeIndex: id,
      brandname: 0,
      pricename: e.currentTarget.dataset.txt == '全部' ? '0' : e.currentTarget.dataset.txt,
      typename: 0
    })
    this.listLoad();
  },
  typeTxt: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    this.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true,
      activeIndex: id,
      brandname: 0,
      pricename: 0,
      typename: e.currentTarget.dataset.txt == '全部' ? '0' : e.currentTarget.dataset.txt
    })
    this.listLoad();
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
    var that = this
    new Cars(function (res) {
      wx.stopPullDownRefresh()
      that.setData({
        brandlist: res.data.brandlist,
        pricelist: res.data.pricelist,
        typelist: res.data.typelist,
        list: res.data.return_newcar.data,
        page: res.data.return_newcar.pageTotal,
        currentPage: res.data.return_newcar.currentPage
      })
    }).usedList({
      pageSize: 10,
      page: 1,
      brandname: 0,
      price: 0,
      type: 0
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var page = this.data.page;
    var currentPage = this.data.currentPage;
    var list = this.data.list;


    console.log(currentPage)

    new Cars(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_newcar.pageTotal < res.data.return_newcar.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        list = list.concat(res.data.return_newcar.data)
        this.setData({
          list: list,
          currentPage: res.data.return_newcar.currentPage
        })
      }

    }).usedList({
      page: ++currentPage,
      pageSize: 10,
      brandname: that.data.brandname,
      price: that.data.pricename,
      type: that.data.typename
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})