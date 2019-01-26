// pages/search/search.js
let app = getApp(),
  util = require("../../utils/util.js"),
  Cars = require("../../service/cars.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      keyWord: options.keyWord ? options.keyWord : ""
    })
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
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Cars(res => {
            console.log(res)
            that.setData({
              product: res.data.return_newcar.data,
              productPage: res.data.return_newcar.pageTotal,
              currentPage: res.data.return_newcar.currentPage
            })
          }).usedList({
            pageSize: 10,
            page: 1,
            brandname: that.data.keyWord,
            price: 0,
            type: 0
          })
        }
      }
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
    var that = this
    new Cars(res => {
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        product: res.data.return_newcar.data,
        productPage: res.data.return_newcar.pageTotal,
        currentPage: res.data.return_newcar.currentPage
      })
    }).usedList({
      pageSize: 10,
      page: 1,
      brandname: that.data.keyWord,
      price: 0,
      type: 0
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPage = this.data.productPage;
    var currentPage = this.data.currentPage;
    var product = this.data.product;


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
        product = product.concat(res.data.return_newcar.data)
        this.setData({
          product: product,
          currentPage: res.data.return_newcar.currentPage
        })
      }

    }).usedList({
      pageSize: 10,
      page: 1,
      brandname: that.data.keyWord,
      price: 0,
      type: 0
    })
  },
  searchKey:function(e){
    console.log(e)
    let key = e.detail.value
    this.setData({
      keyWord:key
    })
  },
  goSearch: function (e) {
    var that = this
    new Product(res => {
      console.log(res)
      this.setData({
        product: res.data.return_shop.data,
        productPage: res.data.return_shop.pageTotal,
        currentPage: res.data.return_shop.currentPage
      })
    }).list({
      pageSize: 10,
      page: 1,
      brandname: that.data.keyWord,
      price: 0,
      type: 0
    })
  },
  goView:function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/product/view?id=' + id,
    })
  },
})