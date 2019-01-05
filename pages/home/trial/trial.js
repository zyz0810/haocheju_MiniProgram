// pages/home/trial/trial.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Drivers = require("../../../service/drivers.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 0,
    area: true,
    areaTxt: '皖',
    trialArea: true,
    trialAreaTxt: '皖',
    rulesLicense: '',
    rulesVin: '',
    rulesEngine: '',
    reault: true,
    mask: true
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

  tab_switch: function(e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    that.setData({
      tab_current: id
    })
  },

  areaShow: function() {
    var that = this;
    if (that.data.area == true) {
      that.setData({
        area: false,
        mask: false
      })
    } else {
      that.setData({
        area: true,
        mask: true
      })
    }
  },
  areaChoose: function(e) {
    console.log(e)
    this.setData({
      areaTxt: e.currentTarget.dataset.txt,
      area: true,
      mask: true
    })
  },

  trialAreaShow: function() {
    var that = this;
    if (that.data.trialArea == true) {
      that.setData({
        trialArea: false,
        mask: false
      })
    } else {
      that.setData({
        trialArea: true,
        mask: true
      })
    }
  },
  trialAreaChoose: function(e) {
    console.log(e)
    this.setData({
      mask: true,
      trialArea: true,
      trialAreaTxt: e.currentTarget.dataset.txt
    })
  },
  rulesLicense: function(e) {
    this.setData({
      rulesLicense: e.detail.value
    })
  },
  rulesVin: function(e) {
    this.setData({
      rulesVin: e.detail.value
    })
  },
  rulesEngine: function(e) {
    this.setData({
      rulesEngine: e.detail.value
    })
  },
  maskBtn: function() {
    this.setData({
      reault: true,
      area: true,
      trialArea: true,
    })
  },
  peccancy_btn: function() {
    var that = this
    new Drivers(res => {
      console.log(res)
      that.setData({
        reault: false,
        mask: false,
        peccancyList: res.data
      })

    }).violation({
      carno: that.data.areaTxt + that.data.rulesLicense,
      rulesVin: that.data.rulesVin,
      engineno: that.data.rulesEngine
    })
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