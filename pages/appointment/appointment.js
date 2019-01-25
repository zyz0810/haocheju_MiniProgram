// pages/appointment/appointment.js
var app = getApp()
var Member = require("../../service/member.js")
var Cars = require("../../service/cars.js")
var util = require("../../utils/util")
var countdown = util.countdown //验证码计时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeNew: true,
    typeOld: true,
    name: '',
    phone: '',
    code: '',
    tips: '发送验证码',
    count: 60,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let carId = options.id
    let typeNew = options.typeNew
    let typeOld = options.typeOld
    this.setData({
      carId: carId,
      typeNew: typeNew == 'false' ? false : true,
      typeOld: typeOld == 'false' ? false : true
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
        }else{
          var userId = wx.getStorageSync('userId')
          new Member(function (res) {
            that.setData({
              name: res.data.username ? res.data.username : res.data.nickname,
              phone: res.data.phone,
            })

            if (res.data.phone == '') {
              wx.showModal({
                title: '',
                content: '请先绑定手机',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    util.navigateTo({
                      url: '/pages/member/mobile/mobile',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateBack({})
                  }
                }
              })
            }

          }).view({
            userId: userId
          });
          if (that.data.typeNew == false) {
            new Cars(function (res) {
              that.setData({
                brandlogo: res.data.brandlogo,
                carname: res.data.carname,
                cartype: res.data.cartype,
                carconfig: res.data.carconfig,
                carprice: res.data.carprice
              })
            }).subscribeNew({
              productId: that.data.carId
            })
          } else {
            new Cars(function (res) {
              that.setData({
                brandlogo: res.data.brandlogo,
                carname: res.data.carname,
                cartype: res.data.cartype,
                carconfig: res.data.configure,
                carprice: res.data.saleprice
              })
            }).subscribeOld({
              productId: that.data.carId
            })
          }
        }
      }
    })
    
    

  },
  goNewView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/transaction/view/view?id=' + id,
    })
  },
  goUsedView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/usedCar/view/view?id=' + id,
    })
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  getcap: function() {
    var that = this
    if (that.data.phone.length == 0) {
      util.errShow('请填写手机号');
      return;
    } else if (!(/^1\d{10}$/.test(that.data.phone))) {
      util.errShow('手机号格式错误');
      return;
    } else {
      new Member(res => {
        console.log(res)
        countdown(that);
      }).getCode({
        phonenum: that.data.phone
      })
    }
  },
  submitNew: function() {
    var that = this

    if (that.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        image: '/resources/images/x.png'
      })
    } else if (that.data.phone == '') {

      wx.showToast({
        title: '请输入手机号',
        image: '/resources/images/x.png'
      })

    } else if (!(/^1\d{10}$/.test(that.data.phone))) {

      wx.showToast({
        title: '请输入正确手机号',
        image: '/resources/images/x.png'
      })

    } else if (that.data.code == '') {

      wx.showToast({
        title: '请输入验证码',
        image: '/resources/images/x.png'
      })

    } else {
      new Member(res => {
        console.log(res)

        new Cars(res => {
          console.log(res)
          wx.showToast({
            title: '预约成功'
          })
        }).subscribe({
          username: that.data.name,
          phonenum: that.data.phone,
          type: '1',
          productId: that.data.carId
        })

      }).getcodeCheck({
        phonenum: that.data.phone,
        code: that.data.code
      })

    }
  },

  submitUsed: function() {
    var that = this

    if (that.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        image: '/resources/images/x.png'
      })
    } else if (that.data.phone == '') {

      wx.showToast({
        title: '请输入手机号',
        image: '/resources/images/x.png'
      })

    } else if (!(/^1\d{10}$/.test(that.data.phone))) {

      wx.showToast({
        title: '请输入正确手机号',
        image: '/resources/images/x.png'
      })

    } else if (that.data.code == '') {

      wx.showToast({
        title: '请输入验证码',
        image: '/resources/images/x.png'
      })

    } else {
      new Member(res => {
        console.log(res)

        new Cars(res => {
          console.log(res)
          wx.showToast({
            title: '预约成功'
          })
        }).subscribe({
          username: that.data.name,
          phonenum: that.data.phone,
          type: '2',
          productId: that.data.carId
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