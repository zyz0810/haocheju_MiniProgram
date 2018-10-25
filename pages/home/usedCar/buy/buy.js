// pages/usedCar/buy/buy.js
let app = getApp(),
  util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultOrder:false,
    brand:true,
    price:true,
    rank:true
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
  goView: function () {
    util.navigateTo({
      url: '../view/view',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  maskBtn:function(){
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: true
    })
  },
  defaultBtn:function(){
    var that = this;
    that.setData({
      defaultOrder:true,
      brand: true,
      price: true,
      rank: true
    })
  },
  brandBtn: function () {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: false,
      price: true,
      rank: true
    })
  },
  priceBtn: function () {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: false,
      rank: true
    })
  },
  rankBtn: function () {
    var that = this;
    that.setData({
      defaultOrder: true,
      brand: true,
      price: true,
      rank: false
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})