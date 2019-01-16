// pages/member/authentication/authentication.js
let app = getApp()
let Member = require('../../../service/member.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    idCard:''
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  name: function(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  idCard: function(e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  submit: function() {
    var that = this
    var userId = wx.getStorageSync('userId')
    if (that.data.name == ''){
      wx.showToast({
        title: '请填写姓名',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.idCard == '') {
      wx.showToast({
        title: '请填写身份证号码',
        image: '/resources/images/x.png'
      })
      return
    }
    new Member(function(res) {
      wx.showToast({
        title: '实名认证',
        success: function () {
          setTimeout(function(){
            wx.navigateBack({})
          },3000)
        }
      })
    }).autonym({ username: that.data.name, idcard: that.data.idCard, userId: userId })
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