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
  onLoad: function (options) {
    let carId = options.id
    this.setData({
      carId: carId
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
    var userId = wx.getStorageSync('userId')
    new Cars(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.cartype,
      })
      var carintroduce = res.data.carintroduce;
      var servicefeedesc = res.data.servicefeedesc;
      this.setData({
        banner: res.data.banner,
        attribution: res.data.attribution,
        cardate: res.data.cardate,
        carintroduce: res.data.carintroduce,
        carname: res.data.carname,
        cartype: res.data.cartype,
        cid: res.data.cid,
        color: res.data.color,
        countpic: res.data.countpic,
        displacement: res.data.displacement,
        gearbox: res.data.gearbox,
        goodname: res.data.goodname,
        isCollection: res.data.isCollection,
        licenceproperty: res.data.licenceproperty,
        mileage: res.data.mileage,
        productiondate: res.data.productiondate,
        saleprice: res.data.saleprice,
        servicefeedesc: res.data.servicefeedesc,
        totalprice: res.data.totalprice,
        useproperty: res.data.useproperty,
        providerid: res.data.providerid
      })
      WxParse.wxParse('carintroduce', 'html', carintroduce, that, 0);
      WxParse.wxParse('servicefeedesc', 'html', servicefeedesc, that, 0);
    }).usedView({
      id: that.data.carId,
      userId: userId
    })
  },
  collect: function (e) {
    console.log(1212)

    var userId = wx.getStorageSync('userId')
    var that = this
    console.log(that.data.carId)
    let collectId = e.currentTarget.dataset.id
    if (collectId == 0) {
      new Cars(function (res) {
        that.setData({
          isCollection: '1',
          cid: res.data.cid
        })
        // toast.show('收藏成功');
      }).favorite({ userId: userId, productId: that.data.carId, type: '2' })
    } else {
      new Cars(function (data) {
        that.setData({
          isCollection: '0',
          cid: ''
        })
        // toast.show('收藏成功');
      }).delFavorite({ cid: that.data.cid })
    }
  },

  goPicture:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: 'pic/pic?id='+id,
    })
  },
  goTenant:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/tenant/tenant?id=' + id,
    })
  },
  goBuy: function (e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/appointment/appointment?typeNew=true&typeOld=false&id=' + id,
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