// pages/home/maintain/maintain.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../service/cars.js"),
  Ruzhu = require("../../../service/ruzhu.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    commendList: [],
    ad: ''
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
    //获取首页内容
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Ruzhu(res => {
            console.log(res)
            that.setData({
              ad: res.data.images,
              banner: res.data.return_banner,
              commendList: res.data.list.data,
              commendPage: res.data.list.pageTotal,
              currentPage: res.data.list.currentPage
            })
          }).list({
            page: 1,
            pageSize: 10,
            type: 2
          })
        }
      }
    })

  },


  goView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: 'view/view?id=' + id,
    })
  },

  ruzhu: function() {
    util.navigateTo({
      url: 'setIn/setIn',
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
    new Cars(res => {
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        ad: res.data.images,
        banner: res.data.return_banner,
        commendList: res.data.list.data,
        commendPage: res.data.list.pageTotal,
        currentPage: res.data.list.currentPage
      })
    }).newList({
      page: 1,
      pageSize: 10,
      type: 2
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var commendPage = this.data.commendPage;
    var currentPage = this.data.currentPage;
    var commendList = this.data.commendList;
    console.log(currentPage)
    new Ruzhu(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.list.pageTotal < res.data.list.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        commendList = commendList.concat(res.data.list.data)
        this.setData({
          commendPage: commendPage,
          currentPage: res.data.list.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10,
      type: 2
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '车相关为网友提供代驾租车等信息查询和发布服务,是寻找和发布代驾租车信息的最佳平台。',
      path: '/pages/home/hire/hire',
      imageUrl: 'https://www.chexiangguan.com/weixin/images/placeholder/logo2.jpg',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
}))