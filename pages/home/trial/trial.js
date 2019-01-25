// pages/home/trial/trial.js
let swiperAutoHeight = require("../../../template/swiperIndex/swiper.js"),
  Drivers = require("../../../service/drivers.js"),
  app = getApp(),
  util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 0,
    area: true,
    areaTxt: '皖',
    trialArea: true,
    trialAreaTxt: '皖',
    rulesLicense: '',
    rulesVin: '',
    rulesEngine: '',
    reault: true,
    mask: true,
    trialName:'',
    trialPhone:'',
    trialLicense:'',
    trialLocation:'',
    trialAge:''
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        }
      }
    })
  },

  tab_switch: function(e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    that.setData({
      tab_current: id
    })
  },

  areaShow: function() {
    var that = this;
    if (that.data.area == true) {
      that.setData({
        area: false,
        mask: false
      })
    } else {
      that.setData({
        area: true,
        mask: true
      })
    }
  },
  areaChoose: function(e) {
    console.log(e)
    this.setData({
      areaTxt: e.currentTarget.dataset.txt,
      area: true,
      mask: true
    })
  },

  trialAreaShow: function() {
    var that = this;
    if (that.data.trialArea == true) {
      that.setData({
        trialArea: false,
        mask: false
      })
    } else {
      that.setData({
        trialArea: true,
        mask: true
      })
    }
  },
  trialAreaChoose: function(e) {
    console.log(e)
    this.setData({
      mask: true,
      trialArea: true,
      trialAreaTxt: e.currentTarget.dataset.txt
    })
  },
  rulesLicense: function(e) {
    this.setData({
      rulesLicense: e.detail.value
    })
  },
  rulesVin: function(e) {
    this.setData({
      rulesVin: e.detail.value
    })
  },
  rulesEngine: function(e) {
    this.setData({
      rulesEngine: e.detail.value
    })
  },
  maskBtn: function() {
    this.setData({
      reault: true,
      area: true,
      trialArea: true,
      mask:true
    })
  },
  peccancy_btn: function() {
    var that = this
    if (that.data.rulesLicense == '') {
      util.errShow('请填写车牌号');
      return;
    }
    if (that.data.rulesVin == '') {
      util.errShow('请填写车架号');
      return;
    }
    if (that.data.rulesEngine == '') {
      util.errShow('请填写发动机号');
      return;
    }
    new Drivers(res => {
      console.log(res)
      that.setData({
        reault: false,
        mask: false,
        peccancyList: res.data
      })

    }).violation({
      carno: that.data.areaTxt + that.data.rulesLicense,
      rulesVin: that.data.rulesVin,
      engineno: that.data.rulesEngine
    })
  },
  trialName:function(e){
    this.setData({
      trialName: e.detail.value
    })
  },
  trialPhone: function (e) {
    this.setData({
      trialPhone: e.detail.value
    })
  },
  trialLicense: function (e) {
    this.setData({
      trialLicense: e.detail.value
    })
  },
  trialLocation: function (e) {
    this.setData({
      trialLocation: e.detail.value
    })
  },
  trialAge: function (e) {
    this.setData({
      trialAge: e.detail.value
    })
  },
  trialBtn:function(){
    var that = this
    if (that.data.trialName == '') {
      util.errShow('请填写姓名');
      return;
    }
    if (!(/^1\d{10}$/.test(that.data.trialPhone))) {
      util.errShow('手机号格式错误');
      return;
    } else if (that.data.trialPhone.length == 0) {
      util.errShow('请填写手机号');
      return;
    }
    if (that.data.trialLicense == '') {
      util.errShow('请填写车牌号');
      return;
    }
    if (that.data.trialLocation == '') {
      util.errShow('请填写车辆位置');
      return;
    }
    if (that.data.trialAge == '') {
      util.errShow('请填写车辆年限');
      return;
    }
    
    new Drivers(res => {
      console.log(res)
      wx.showToast({
        title: '提交成功',
      })
    }).examination({
      name: that.data.trialName,
      mobile: that.data.trialPhone,
      carno: that.data.trialAreaTxt + that.data.trialLicense,
      caraddress: that.data.trialLocation,
      caryear: that.data.trialAge
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
  onShareAppMessage: function() {

  }
})