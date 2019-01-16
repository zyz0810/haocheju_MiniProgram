// pages/member/order/use/use.js
var app = getApp()
var Order = require('../../../../service/order')
var util = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trade_no:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var trade_no = options.id
    this.setData({
      trade_no: trade_no
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goReturn:function(){
    wx.redirectTo({
      url: '/pages/member/order/order?id=4',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    new Order(function(res){
        that.setData({
          trade_num: res.data.order.trade_no,
          img: res.data.img,
          shopgoods: res.data.goods.shopgoods,
          cost: res.data.order.cost,
          nickname: res.data.info.nickname,
          addtime: res.data.order.addtime
        })
    }).detail({ trade_no: that.data.trade_no });
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