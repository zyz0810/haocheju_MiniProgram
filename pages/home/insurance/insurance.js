// pages/memberTenant/insurance/claims/claims.js
var app = getApp()
var Member = require("../../../service/member.js")
var util = require("../../../utils/util")
var countdown = util.countdown//验证码计时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: true,
    areaTxt: '皖',
    license:'',
    phone:'',
    code:'',
    tips: '发送验证码',
    count: 60,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  areaShow: function () {
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
  areaChoose: function (e) {
    console.log(e)
    this.setData({
      areaTxt: e.currentTarget.dataset.txt,
      area: true,
      mask: true
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  license: function (e) {
    this.setData({
      license: e.detail.value
    })
  },
  //获取验证码
  getcap:function(){
    var that = this
    if(that.data.phone.length == 0){
      util.errShow('请填写手机号');
      return;
    }else if (!(/^1\d{10}$/.test(that.data.phone))) {
      util.errShow('手机号格式错误');
      return;
    }else{
      
      new Member(res => {
        console.log(res)
        countdown(that);
      }).getCode({
        phonenum: that.data.phone
      })



    } 
  },
  submit:function(){
    var that = this

    if (that.data.license.length==0){
      wx.showToast({
        title: '请输入车牌号',
        image: '/resources/images/x.png'
      })
    }else{
      new Member(res => {
        console.log(res)

        new Member(res => {
          console.log(res)
          wx.showToast({
            title: '预约成功'
          })
        }).insuranceAdd({
          carno: that.data.license,
          mobile: that.data.phone
        })

      }).getcodeCheck({
        phonenum: that.data.phone,
        code: that.data.code
      })

    }
   

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
})