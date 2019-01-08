// pages/home/personnelCar/view/view.js
let Personnel = require("../../../../service/personal.js"),
  app = getApp(),
  WxParse = require('../../../wxParse/wxParse.js'),
  util = require("../../../../utils/util.js")
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
    let jobId = options.jobId
    this.setData({
      jobId: jobId
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
    //获取内容
    var that = this
    new Personnel(res => {
      console.log(res)
      var content = res.data.content
      wx.setNavigationBarTitle({
        title: res.data.job
      })
      this.setData({
        jobName: res.data.job,
        money: res.data.money,
        address: res.data.address,
        experience: res.data.experience,
        education: res.data.education,
        position: res.data.position,
        mobile: res.data.mobile,
        name: res.data.name,
        content: res.data.content
      })
      WxParse.wxParse('content', 'html', content, that, 0);
    }).view({
      id: that.data.jobId
    })
  },
  callUs: function (e) {
    console.log(e)
    let phone = e.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: phone,
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow('0551-67698098', 5000)
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