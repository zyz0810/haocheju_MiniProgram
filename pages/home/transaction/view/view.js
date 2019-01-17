// pages/home/maintain/view/view.js
let swiperAutoHeight = require("../../../../template/swiperIndex/swiper.js"),
  Cars = require("../../../../service/cars.js"),
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
      carId:carId
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
    var userId = wx.getStorageSync('userId')
    new Cars(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.carname + res.data.cartype,
      })
      var carcontent = res.data.carcontent;
      this.setData({
        banner: res.data.banner,
        name: res.data.carname + res.data.cartype,
        price: res.data.carprice,
        tenant: res.data.goodname,
        brandlogo: res.data.brandlogo,
        engine: res.data.engine,
        totalfuel: res.data.totalfuel,
        drivingmode: res.data.drivingmode,
        bodywork: res.data.bodywork,
        gearbox: res.data.gearbox,
        warranty: res.data.warranty,
        carcontent: res.data.carcontent,
        isCollection: res.data.isCollection,
        providerid: res.data.providerid,
        cid: res.data.cid
      })
      WxParse.wxParse('carcontent', 'html', carcontent, that, 0);
    }).newView({
      id: that.data.carId,
      userId: userId
    })
  },
  collect:function(e){
    console.log(1212)
    
    var userId = wx.getStorageSync('userId')
    var that = this
    console.log(that.data.carId)
    let collectId = e.currentTarget.dataset.id
    if (collectId == 0){
      new Cars(function (res) {
       that.setData({
         isCollection:'1',
         cid: res.data.cid
       })
        // toast.show('收藏成功');
      }).favorite({ userId: userId, productId: that.data.carId, type: '1' })
    }else{
      new Cars(function (data) {
        that.setData({
          isCollection: '0',
          cid: ''
        })
        // toast.show('收藏成功');
      }).delFavorite({ cid: that.data.cid })
    }
  },
  goTenant: function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/tenant/tenant?id=' + id,
    })
  },
  goBuy: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/appointment/appointment?typeNew=false&typeOld=true&id=' + id,
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: that.data.name,
      path: '/pages/home/transaction/view/view?id=' + that.data.carId,
      desc: that.data.engine + that.data.drivingmode + that.data.gearbox + that.data.bodywork,
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