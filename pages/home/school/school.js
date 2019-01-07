// pages/home/school/school.js

let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Drivers = require("../../../service/drivers.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
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

    new Drivers(res => {
      console.log(res)
      this.setData({
        list: res.data.return_job.data,
        schoolPage: res.data.return_job.pageTotal,
        currentPage: res.data.return_job.currentPage,
      })
    }).list({
      page: '1', pageSize: 10
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
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var schoolPage = this.data.schoolPage;
    var currentPage = this.data.currentPage;
    var list = this.data.list;


    console.log(currentPage)

    new Drivers(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_job.totalPages < res.data.return_job.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        list = list.concat(res.data.return_job.data)
        this.setData({
          list: list,
          currentPage: res.data.return_job.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10
    })
  },
  goView:function(e){
    let id = e.currentTarget.dataset.id
    console.log('id:' + id)
    util.navigateTo({
      url: 'view/view?id=' + id,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})