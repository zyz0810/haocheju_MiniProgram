// pages/users/login.js
let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  Member = require("../../service/member.js"),
  app = getApp(),
  util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       // 发起网络请求
    //       // wx.request({
    //       //   url: 'http://che.0556360.com/api/wechat/getopenid',
    //       //   type:post,
    //       //   data: {
    //       //     code: res.code
    //       //   }
    //       // })


    //       new Member(res => {
    //         console.log(res)



    //       }).loginC({
    //         code: res.code
    //       })

    //       that.setData({
    //         code: res.code
    //       })

    //       console.log('code' + res.code)

    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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
})