// pages/member/mobile/mobile.js
var app = getApp()
var Member = require("../../../service/member.js")
var Cars = require("../../../service/cars.js")
var util = require("../../../utils/util")
var countdown = util.countdown //验证码计时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    tips: '发送验证码',
    count: 60,
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

  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  getcap: function () {
    var that = this
    if (that.data.phone.length == 0) {
      util.errShow('请填写手机号');
      return;
    } else if (!(/^1\d{10}$/.test(that.data.phone))) {
      util.errShow('手机号格式错误');
      return;
    } else {
      new Member(res => {
        console.log(res)
        countdown(that);
      }).getCode({
        phonenum: that.data.phone
      })
    }
  },
  submit: function () {
    var that = this
    var userId = wx.getStorageSync('userId')

   if (that.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        image: '/resources/images/x.png'
      })
    } else if (!(/^1\d{10}$/.test(that.data.phone))) {
      wx.showToast({
        title: '请输入正确手机号',
        image: '/resources/images/x.png'
      })
    } else if (that.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/resources/images/x.png'
      })
    } else {
      new Member(res => {
        console.log(res)
        wx.navigateBack({})
      }).bindMobile({
        phonenum: that.data.phone,
        code: that.data.code,
        userId: userId
      })

    }
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