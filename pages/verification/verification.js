// pages/verification/verification.js
let base64 = require("../../utils/base64.js"),
  hex2b64 = base64.hex2b64,
  b64tohex = base64.b64tohex
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    fail:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = options.data
    let info2 = hex2b64(info)
  },
  goReturn:function(){
    
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