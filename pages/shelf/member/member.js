// pages/shelf/member.js.
let app = getApp();
let actionsheet = require("../../../template/actionsheet/payactionsheet.js");
let util = require('../../../utils/util.js');
let receiver = require('../../../service/receiver.js');
let order = require('../../../service/order.js');
let tenant = require('../../../service/tenant.js');
let product = require('../../../service/product.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.memberInfo
    })
  },

  backToindex: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  allOrder: function () {
    wx.navigateTo({
      url: '/pages/member/order/order'
    })
  },

  allCoupon: function () {
    wx.navigateTo({
      url: '/pages/member/coupon/list'
    })
  },

  feedback: function () {
    wx.navigateTo({
      url: '/pages/shelf/feedback/feedback'
    })
  },


  //联系我们
  callUs: function () {
    wx.makePhoneCall({
      phoneNumber: '0551-67698098'
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

  }
})