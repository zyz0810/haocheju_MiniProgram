// pages/news/view/view.js
let Zixun = require("../../../service/zixun.js"),
  app = getApp(),
  WxParse = require('../../wxParse/wxParse.js'),
  util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    author: '',
    addtime: '',
    hitcount: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newsId = options.id
    this.setData({
      newsId: newsId
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
          //获取内容
          new Zixun(res => {
            console.log(res)
            var content = res.data.content;
            wx.setNavigationBarTitle({
              title: res.data.title
            })
            that.setData({
              title: res.data.title,
              author: res.data.author,
              addtime: res.data.addtime,
              hitcount: res.data.hitcount,
              content: res.data.content
            })
            WxParse.wxParse('content', 'html', content, that, 0);
          }).view({
            id: that.data.newsId
          })
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
      title: '车相关资讯频道提供最新最全的汽车资讯,汽车行情,汽车科技新闻,汽车文化,用车知识,热点活动与车展赛事等汽车信息',
      path: '/pages/news/news',
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