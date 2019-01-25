// pages/news/news.js
let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"), 
  Zixun = require("../../service/zixun.js"),
  app = getApp(),
  util = require("../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Zixun(res => {
            console.log(res)
            that.setData({
              banner: res.data.return_banner,
              news: res.data.return_new.data,
              newsPage: res.data.return_new.pageTotal,
              currentPage: res.data.return_new.currentPage
            })
          }).list({
            page: 1,
            pageSize: 10
          })
        }
      }
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
    new Zixun(res => {
      wx.stopPullDownRefresh()
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
      if (res.data.return_new.pageTotal < res.data.return_new.currentPage) {
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '车相关资讯',
      path: '/pages/news/news',
      desc: '车相关资讯频道提供最新最全的汽车资讯,汽车行情,汽车科技新闻,汽车文化,用车知识,热点活动与车展赛事等汽车信息',
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
}))