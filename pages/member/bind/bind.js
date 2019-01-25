//获取应用实例
var app = getApp()
var Member = require("../../../service/member.js")
var util = require("../../../utils/util")
var countdown = util.countdown//验证码计时
Page({
  data: {
    tips: '验证码',
    count: 60,
    formContent: {
      phone: '',
      code: '',
    },
  },
  onLoad: function (info) {
    var that = this;
    var where = info.where;
    that.setData({
      where: where
    })

  },

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


  //输入框变化
  bindChange: function (e) {
    var form = this.data.formContent;
    form[e.currentTarget.id] = e.detail.value.trim();
    this.setData({
      formContent: form
    })
  },

  //发送验证码
  getcode: function () {
    var that = this;

    if (!(/^1\d{10}$/.test(that.data.formContent.phone))) {
      util.errShow('手机号格式错误');
    } else {
      new Member(function () {
        countdown(that);
      }).sendMsgToBindPhone({
        mobile: that.data.formContent.phone
      })
    }

  },


  submit: function () {//提交
    var form = this.data.formContent
    var that = this
    if (!(/^1[345789]\d{9}$/.test(form.phone))) {
      util.errShow('手机号格式错误')
    } else if (form.code == '') {
      util.errShow('请输入验证码')
    } else {
      new Member(function (res) {
        wx.showToast({
          title: '绑定手机号成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            if(that.data.where=='paying'){
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/member/password/password',
                })
              }, 1000)
            }else{
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          }
        })
      }).bindPhone({
        captcha: form.code,
        mobile: form.phone
      })
    }
  }
})

