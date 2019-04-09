// pages/home/maintain/view/view.js
let swiperAutoHeight = require("../../../../template/swiperIndex/swiper.js"),
  Ruzhu = require("../../../../service/ruzhu.js"),
  app = getApp(),
  WxParse = require('../../../wxParse/wxParse.js'),
  util = require("../../../../utils/util.js")
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
    let carId = options.id
    this.setData({
      carId: carId
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
          var userId = wx.getStorageSync('userId')
          new Ruzhu(res => {
            console.log(res)
            wx.setNavigationBarTitle({
              title: res.data.name,
            })
            var desc = res.data.desc;
            that.setData({
              banner: res.data.bannerlogo,
              logo: res.data.logo,
              name: res.data.name,
              opentime: res.data.opentime,
              address: res.data.address,
              lant: res.data.lant,
              long: res.data.long,
              phone: res.data.phone,
              desc: res.data.desc
            })
            WxParse.wxParse('desc', 'html', desc, that, 0);
          }).view({
            id: that.data.carId
          })

        }
      }
    })
  },

  goTenant: function(e) {
    console.log(e)
    let lant = Number(e.currentTarget.dataset.lant)
    let long = Number(e.currentTarget.dataset.long)
    wx.openLocation({
      latitude: lant,
      longitude: long,
      scale: 18
    })
  },
  call: function(e) {
    console.log(e)
    let phone = e.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: phone,
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow(phone, 5000)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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
      title: that.data.name,
      path: '/pages/home/transaction/view/view?id=' + that.data.carId,
      desc: that.data.engine + that.data.drivingmode + that.data.gearbox + that.data.bodywork,
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