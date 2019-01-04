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
    //获取首页内容
    new Cars(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        carpoolList: res.data.return_new.data,
        newsPage: res.data.return_new.pageTotal,
        currentPage: res.data.return_new.currentPage
      })
    }).carPool({page:1,pageSize:10,type:'2'})
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    pageing(that, '1', e.currentTarget.dataset.id, e.currentTarget.dataset.name)
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
    // pageing(this.data.tab_current)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})


function pageing(that, currentPage, type, sType){
  var that = this;
  wx.showNavigationBarLoading();
  // var pageModel = this.data.pageModel;
  // var newPage = this.data.newsPage;
  var currentPage = currentPage;
  var carpoolList = that.data[sType];
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
      carpoolList = carpoolList.concat(res.data.return_new.data)
      this.setData({
        carpoolList: carpoolList,
        currentPage: res.data.return_new.currentPage
      })
    }




  }).carPool({ page: ++newPage, pageSize: 10, type: type })
}


function paging(that, sType, direction) {
  var tips = that.data[sType + 'Tips']
  var info = that.data[sType]
  if (direction == 'up') {
    info = []
  }
  if (direction !== 'up' && that.pageModel[sType].pageNumber + 1 > that.pageModel[sType].totalPages) {
    return
  }
  that.setData({
    [sType + 'Tips']: '加载中...'
  })
  new Cars(function (data) {
    that.pageModel[sType].totalPages = data.pageModel.totalPages
    if (data.pageModel.totalPages == 0) {
      that.setData({
        [sType + 'Tips']: '暂无列表！',
        [sType]: []
      })
 
      return
    }
    info = info.concat(data.data)
    if (data.pageModel.totalPages <= data.pageModel.pageNumber) {
      that.setData({
        [sType + 'Tips']: '',
        [sType]: info
      })
    
    } else {
      that.setData({
        [sType + 'Tips']: "上拉加载",
        [sType]: info
      })
    }
  }).carPool({
    type: sType,
    pageNumber: direction == 'up' ? that.pageModel[sType].pageNumber = 1 : ++that.pageModel[sType].pageNumber,
    pageSize: 10,
  })
}