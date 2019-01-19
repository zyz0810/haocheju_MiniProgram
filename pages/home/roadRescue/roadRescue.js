// pages/home/roadRescue/roadRescue.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Personnel = require("../../../service/personal.js"),
  app = getApp(),
  util = require("../../../utils/util.js")

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
    var userId = wx.getStorageSync('userId')
    new Personnel(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        road: res.data.return_job.data,
        roadPage: res.data.return_job.pageTotal,
        currentPage: res.data.return_job.currentPage
      })
    }).road({ page: 1, pageSize: 10 })
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
    var userId = wx.getStorageSync('userId')
    new Personnel(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        road: res.data.return_job.data,
        roadPage: res.data.return_job.pageTotal,
        currentPage: res.data.return_job.currentPage
      })
    }).road({ page: 1, pageSize: 10 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var roadPage = this.data.roadPage;
    var currentPage = this.data.currentPage;
    var road = this.data.road;


    console.log(currentPage)

    new Personnel(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_job.pageTotal < res.data.return_job.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        road = road.concat(res.data.return_job.data)
        this.setData({
          road: road,
          currentPage: res.data.return_job.currentPage
        })
      }

    }).road({
      page: ++currentPage,
      pageSize: 10
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))