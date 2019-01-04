// pages/home/maintain/maintain.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../service/cars.js"), 
  app = getApp(),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight,{

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取首页内容
    new Cars(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        hotList: res.data.return_oldcar.data,
        commendList: res.data.return_newcar.data,
      })
    }).newList()
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

  },
  goOldView: function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/usedCar/view/view?id=' + id,
    })
  },

  goView:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: 'view/view?id='+id,
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