// pages/discount/discount.js
let swiperAutoHeight = require("../../template/swiperWidth/swiper.js"),
  app = getApp(),
  util = require("../../utils/util.js"),
  Product = require("../../service/product.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

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

    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Product(res => {
            console.log(res)
            that.setData({
              banner: res.data.return_banner,
              brand: res.data.list,
              product: res.data.return_shop.data,
              productPage: res.data.return_shop.pageTotal,
              currentPage: res.data.return_shop.currentPage
            })
          }).list({
            flag: 1,
            page: 1,
            pageSize: 10,
          })
        }
      }
    })



  },
  goSearch: function(e) {
    console.log(e)
    let txt = e.currentTarget.dataset.txt;
    util.navigateTo({
      url: '../search/search?keyWord=' + txt,
    })
  },
  searchKey: function(e) {
    console.log(e)
    let key = e.detail.value
    this.setData({
      keyWord: key
    })
  },
  goSearchBtn: function(e) {
    console.log(e)
    let txt = this.data.keyWord;
    util.navigateTo({
      url: '../search/search?keyWord=' + txt,
    })
  },
  goView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/product/view?id=' + id,
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
    new Product(res => {
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        brand: res.data.list,
        product: res.data.return_shop.data,
        productPage: res.data.return_shop.pageTotal,
        currentPage: res.data.return_shop.currentPage
      })
    }).list({
      flag: 1,
      page: 1,
      pageSize: 10,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPage = this.data.productPage;
    var currentPage = this.data.currentPage;
    var product = this.data.product;


    console.log(currentPage)

    new Product(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_new.pageTotal < res.data.return_new.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        product = product.concat(res.data.return_new.data)
        this.setData({
          product: product,
          currentPage: res.data.return_new.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10,
      flag: 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '优惠多多',
      path: '/pages/discount/discount',
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