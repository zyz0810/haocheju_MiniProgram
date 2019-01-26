// pages/home/maintain/view/view.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Product = require("../../../service/product.js"),
  Order = require("../../../service/order.js"),
  app = getApp(),
  WxParse = require('../../wxParse/wxParse.js'),
  util = require("../../../utils/util.js")
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
    this.setData({
      productId: options.id
    })
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
            wx.setNavigationBarTitle({
              title: res.data.shopgoods
            })
            var detail = res.data.detail
            that.setData({
              banner: res.data.images,
              shopgoods: res.data.shopgoods,
              price: res.data.price,
              oldPrice: res.data.cost,
              detail: res.data.detail
            })
            WxParse.wxParse('detail', 'html', detail, that, 0);
          }).view({
            id: that.data.productId
          })
        }
      }
    })
    
  },
  goBuy: function(e) {
    var userId = wx.getStorageSync('userId')
    let id = e.currentTarget.dataset.id

    let that = this


    new Order(res => {
      console.log(res)
      util.navigateTo({
        url: '/pages/pay/pay?trade_no=' + res.data.trade_no,
      })


    }).add({
      gid: that.data.productId,
      uid: userId,
      money: that.data.oldPrice,
      cost: that.data.price,
      discount: '0'
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
  //联系我们
  callUs: function() {
    wx.makePhoneCall({
      phoneNumber: '0556-7820666',
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow('0556-7820666', 5000)
        }

      }
    })
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
        title: that.data.shopgoods,
        path: '/pages/home/product/view?id=' + that.data.productId,
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