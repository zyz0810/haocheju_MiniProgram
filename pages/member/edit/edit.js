// pages/member/edit/edit.js
let app = getApp()
let Member = require('../../../service/member.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
let navCart = require("../../../template/cart/cart.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
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
    var userId = wx.getStorageSync('userId')
    new Member(res => {
      console.log(res)
      this.setData({
        avatar: res.data.avatar,
        nickname: res.data.nickname ? res.data.nickname : res.data.username,
        signature: res.data.signature,
        phone: res.data.phone,
        type: res.data.type,
        idtype: res.data.idtype,
        verify: res.data.verify,
        sex: res.data.sex
      })
    }).view({ userId: userId })
  },
  editName:function(e){
    console.log(e)
    this.setData({
      nickname:e.detail.value
    })
  },
  
  editPhone: function(e) {
    console.log(e)
    this.setData({
      nickname: e.detail.value
    })
  },
  editPhone: function (e) {
    console.log(e)
    !(/^1\d{10}$/.test(that.data.formContent.phone))
    this.setData({
      phone: e.detail.value
    })
  },
  editSignature: function (e) {
    console.log(e)
    this.setData({
      signature: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      sex: e.detail.value
    })
  },
  editBtn:function(e){
    var userId = wx.getStorageSync('userId');
    var that = this
    if (that.data.phone.length == 0){
      new Member(function () {
        // window.location.href = '../member/index.html';
        wx.showToast({
          title: '修改成功',
          // complete:function(){
          //   console.log(21221)
          //   wx.navigateTo({
          //     url: '/pages/member/member'
          //   })
          // },
          success: function () {
           
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/member/member',
                })
              }, 1000)
            
          }
        })
        
      }).edit({ userId: userId, phonenum: that.data.phone, nickname: that.data.nickname, sex: that.data.sex, signature: that.data.signature })
    }else{
      if (!(/^1\d{10}$/.test(that.data.phone))) {
        util.errShow('手机号格式错误');
      } else {
        new Member(function () {
          // window.location.href = '../member/index.html';
          wx.showToast({
            title: '修改成功',
          })
          // setTimeout({
            wx.navigateTo({
              url: '/pages/member/member'
            })
          // },3000)
        }).edit({ userId: userId, phonenum: that.data.phone, nickname: that.data.nickname, sex: that.data.sex, signature: that.data.signature })
      }
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