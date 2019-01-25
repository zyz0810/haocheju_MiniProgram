// pages/home/school/view/view.js
let swiperAutoHeight = require("../../../../template/swiperProduct/swiper.js"),
  Drivers = require("../../../../service/drivers.js"),
  app = getApp(),
  WxParse = require('../../../wxParse/wxParse.js'),
  util = require("../../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let schoolId = options.id
    this.setData({
      schoolId: schoolId
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Drivers(res => {
            console.log(res)
            wx.setNavigationBarTitle({
              title: res.data.name
            })
            var abstract = res.data.abstract
            that.setData({
              banner: res.data.banner,
              name: res.data.name,
              mobile: res.data.mobile,
              grade: res.data.grade,
              college: res.data.college,
              qualified: res.data.qualified,
              address: res.data.address,
              abstract: res.data.abstract,
              environment: res.data.environment
            })
            WxParse.wxParse('abstract', 'html', abstract, that, 0);
          }).view({ id: that.data.schoolId })
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
}))