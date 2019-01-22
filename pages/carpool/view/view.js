// pages/carpool/view/view.js
let app = getApp(),
  util = require("../../../utils/util.js"),
  Cars = require("../../../service/cars.js")
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
          wz_addtime: res.data.addtime,
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
          remark: res.data.remarks
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
          remark: res.data.remark
        })

      }).carpoolDetail({ id: that.data.carPoolId });
    }
    
  },
  //联系我们
  callUs: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow(e.currentTarget.dataset.id, 5000)
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '车相关拼车',
      path: '/pages/carpool/view/view',
      desc: '车相关人人参与 顺路捎,分享经济平台。',
      imageUrl: 'https://www.chexiangguan.com/weixin/images/placeholder/logo2.jpg',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})