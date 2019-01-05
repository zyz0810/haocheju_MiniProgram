// pages/member/scope/index.js
var app = getApp()
var member = require('../../service/member.js')
Page({

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
  bindgetuserinfo(e) {
    let that = this
    console.log(e)
    if (e.detail.errMsg.indexOf('fail') > -1) {
      wx.showToast({
        title: '请授权用户信息!',
        icon: 'none'
      })
    } else {

      console.log(e)
      new member(res => {

        wx.setStorageSync('userId', res.data.id)

      // that.globalData.memberInfo = res.data
      //       wx.setStorageSync('memberInfo', res.data)


        // const globalMemberInfo = getApp().globalData.memberInfo
        // globalMemberInfo.username = e.detail.userInfo.nickName
        // globalMemberInfo.userhead = e.detail.userInfo.avatarUrl
        wx.navigateBack({
        })
      }).update({
        openId: wx.getStorageSync('openid'),
        unionid: wx.getStorageSync('unionid'),
        avatar: e.detail.userInfo.avatarUrl,
        nickname: e.detail.userInfo.nickName,
        sex: e.detail.userInfo.gender == 1 ? '0':'1'
      })
    }
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

  }
})