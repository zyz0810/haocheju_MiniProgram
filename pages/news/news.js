// pages/news/news.js
let Zixun = require("../../service/zixun.js"),
  app = getApp(),
  util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    newsPage: '',
    currentPage:''
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

  //跳转资讯详情页
  goNewsView(e) {
    let id = e.currentTarget.dataset.id
    console.log('id:'+id)
    util.navigateTo({
      url: './../news/view/view?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取内容
    new Zixun(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        news: res.data.return_new.data,
        newsPage: res.data.return_new.pageTotal,
        currentPage: res.data.return_new.currentPage
      })
    }).list({
      page: 1,
      pageSize: 10
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

    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPage = this.data.newsPage;
    var currentPage = this.data.currentPage;
    var news = this.data.news;


    console.log(currentPage)

    new Zixun(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_new.totalPages < res.data.return_new.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        news = news.concat(res.data.return_new.data)
        this.setData({
          news: news,
          currentPage: res.data.return_new.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})