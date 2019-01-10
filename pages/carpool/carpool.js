// pages/hire/hire.js
let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  app = getApp(),
  util = require("../../utils/util.js"),
  Cars = require("../../service/cars.js"),
  navCart = require("../../template/cart/cart.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    tab_current:1,
    carTips: '下拉刷新',
    peopleTips: '下拉刷新',
    sType: ['1', '2'],
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

  //联系我们
  callUs: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: '0551-67698098',
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow('0551-67698098', 5000)
        }

      }
    })
  },
  goView:function(e){
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    console.log('id:' + id)
    util.navigateTo({
      url: 'view/view?id=' + id + '&type=' + type,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取首页内容
    new Cars(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        oneList: res.data.return_new.data,
        onePage: res.data.return_new.pageTotal,
        currentOnePage: res.data.return_new.currentPage
      })
    }).carPool({ page: 1, pageSize: 10, type: '1' })
    new Cars(res => {
      console.log(res)
      this.setData({
        twoList: res.data.return_new.data,
        twoPage: res.data.return_new.pageTotal,
        currentTwoPage: res.data.return_new.currentPage
      })
    }).carPool({ page: 1, pageSize: 10, type: '2' })
  },
  findCar:function(){
    util.navigateTo({
      url: 'car/car',
    })
  },
  findPeople: function () {
    util.navigateTo({
      url: 'people/people',
    })
  },
  tabClick:function(e){
    var that = this;
    that.setData({
      tab_current: e.currentTarget.dataset.id,
      stype: e.currentTarget.dataset.name
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


    if (that.data.tab_current == 1){
      var onePage = this.data.onePage;
      var currentOnePage = this.data.currentOnePage;
      var oneList = this.data.oneList;

      new Cars(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_new.totalPages < res.data.return_new.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          oneList = oneList.concat(res.data.return_new.data)
          this.setData({
            oneList: oneList,
            currentOnePage: res.data.return_new.currentPage
          })
        }

      }).carPool({ page: ++currentOnePage, pageSize: 10, type: '1' })
    }else{
      var twoPage = this.data.twoPage;
      var currentTwoPage = this.data.currentTwoPage;
      var twoList = this.data.twoList;

      new Cars(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_new.totalPages < res.data.return_new.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          twoList = twoList.concat(res.data.return_new.data)
          this.setData({
            twoList: twoList,
            currentTwoPage: res.data.return_new.currentPage
          })
        }

      }).carPool({ page: ++currentTwoPage, pageSize: 10, type: '2' })
    }

    


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})