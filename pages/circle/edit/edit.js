// pages/circle/edit/edit.js
let app = getApp(),
  util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: []
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

  },
  cancel:function(){
    wx.switchTab({
      url: '/pages/circle/circle',
    })
  },
  publish: function() {
    wx.showToast({
      title: '发表成功',
      duration: 2000,
      success: function() {
        console.log(1)
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/circle/circle',
          })
        }, 2000)

      }
    })


  },
  chooseImg: function() {
    var that = this,
      　　　　　　pics = this.data.pics;

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;　　　　　　　　　
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  deleteImg: function(e) {
    var that = this
    var index = e.currentTarget.dataset.id;
    console.log(index)
    var pics = pics
    that.data.pics.splice(index, 1)
    this.setData({
      pics: that.data.pics
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