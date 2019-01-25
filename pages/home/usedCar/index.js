// pages/usedCar/index.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../service/cars.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  searchKey: function (e) {
    console.log(e)
    let key = e.detail.value
    this.setData({
      keyWord: key
    })
  },
  goSearchBtn: function (e) {
    console.log(e)
    let txt = this.data.keyWord;
    util.navigateTo({
      url: '../../search/search?keyWord=' + txt,
    })
  },
  goBuy: function () {
    util.navigateTo({
      url: 'buy/buy',
    })
  },
  goView: function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: 'view/view?id=' + id,
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
    //获取首页内容
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Cars(res => {
            console.log(res)
            that.setData({
              banner: res.data.return_banner,
              hotList: res.data.return_hot.data,
              commendList: res.data.return_oldcar.data,
            })
          }).usedCommend()
        }
      }
    })
    
  },
  goView:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/usedCar/view/view?id=' + id,
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
    new Cars(res => {
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        hotList: res.data.return_hot.data,
        commendList: res.data.return_oldcar.data,
      })
    }).usedCommend()
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
      title: '二手车区',
      path: '/pages/home/usedCar/index',
      desc: '你只看到我的背影，却无法感受我的激情，你有你的A8，我们有属于我们自己的机车，你嘲笑我，不知四轮的安逸，我可怜你，不懂速度的真谛。',
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