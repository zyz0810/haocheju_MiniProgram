// pages/carpool/view/view.js
let app = getApp(),
  util = require("../../../../utils/util.js"),
  Cars = require("../../../../service/cars.js")
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
    var carPoolId = options.id
    var carPoolType = options.type
    this.setData({
      carPoolId: carPoolId,
      carPoolType: carPoolType
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
    var that = this
    if (that.data.carPoolType == '1'){
      new Cars(function (res) {
        that.setData({
          headerimg: res.data.headerimg ? res.data.headerimg : '/resources/images/logo.png',
          name: res.data.name,
          wz_addtime: res.data.wz_addtime,
          start: res.data.start,
          start_address: res.data.start_address,
          end: res.data.end,
          end_address: res.data.end_address,
          seat: res.data.seat,
          brand: res.data.brand,
          series: res.data.series,
          startdate: res.data.startdate,
          starttime: res.data.starttime,
          mobile: res.data.mobile,
          remark: res.data.remarks,
          ready: res.data.ready,
          carpoolId:res.data.id
        })

      }).carpoolDetail({ id: that.data.carPoolId });
    }else{
      new Cars(function (res) {
        that.setData({
          headerimg: res.data.headerimg ? res.data.headerimg : '/resources/images/logo.png',
          name: res.data.name,
          wz_addtime: res.data.wz_addtime,
          start: res.data.start,
          start_address: res.data.start_address,
          end: res.data.end,
          end_address: res.data.end_address,
          seat: res.data.seat,
          mobile: res.data.mobile,
          startdate: res.data.startdate,
          starttime: res.data.starttime,
          remark: res.data.remarks,
          ready: res.data.ready,
          carpoolId: res.data.id
        })

      }).carpoolDetail({ id: that.data.carPoolId });
    }
    
  },
  editCarpool: function (e) {
    let id = e.currentTarget.dataset.id
    var that = this
    new Cars(function () {
    that.setData({
      ready:'2'
    })
    wx.showToast({
      title: '状态为已出发',
    })

    }).editCarpool({ id: id })

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