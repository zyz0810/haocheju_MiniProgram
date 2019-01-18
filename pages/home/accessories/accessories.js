// pages/home/maintain/maintain.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Product = require("../../../service/product.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取首页内容
    new Product(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        hotList: res.data.return_hot.data,
        commendList: res.data.return_shop.data,
        commendPage: res.data.return_shop.pageTotal,
        currentPage: res.data.return_shop.currentPage
      })
    }).list({ page: 1, pageSize: 10, type: 2 })
  },
  goView: function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({

      url: '/pages/home/product/view?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //获取首页内容
    new Product(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        hotList: res.data.return_hot.data,
        commendList: res.data.return_shop.data,
        commendPage: res.data.return_shop.pageTotal,
        currentPage: res.data.return_shop.currentPage
      })
    }).list({ page: 1, pageSize: 10, type: 2 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPage = this.data.commendPage;
    var currentPage = this.data.currentPage;
    var commendList = this.data.commendList;


    console.log(currentPage)

    new Product(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_shop.totalPages < res.data.return_shop.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        commendList = commendList.concat(res.data.return_shop.data)
        this.setData({
          commendList: commendList,
          currentPage: res.data.return_shop.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10,
      type: 2
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))