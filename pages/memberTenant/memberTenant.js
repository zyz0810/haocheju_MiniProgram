// pages/memberTenant/memberTenant.js
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
    let app = getApp()
    let Member = require('../../service/member.js')
    let coupon = require('../../service/coupon.js')
    let util = require('../../utils/util.js')
    let message = require('../../service/message.js')
    let config = require('../../utils/config.js')
    let navCart = require("../../template/cart/cart.js")
    Page(Object.assign({}, navCart, {
      data: {
        memberInfo: {}
      },
      onLoad: function (options) {

      },
      onShow: function () {

      },
      //我的钱包
      purse: function () {
        util.navigateTo({
          url: 'purse/purse',
        })
      },
    }))

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})