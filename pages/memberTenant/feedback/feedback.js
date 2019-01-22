// pages/member/feedback/feedback.js
let app = getApp()
let Member = require('../../../service/member.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
let BASE_URL = config.BASE_URL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    phone:'',
    images:'',
    content:''
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

  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  chooseImg: function () {
    var that = this,
      pics = this.data.pics;

    wx.chooseImage({
      // count: 1 - pics.length, // 最多可以选择的图片张数，默认9
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });

   
        wx.uploadFile({
          url: BASE_URL + 'api/users/uploads', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          success(res) {
            var str = res.data

            str = str.replace(" ", "");
            str = str.replace(/\ufeff/g, ""); //字符串转化JSON对象
            var jj = JSON.parse(str);

            console.log(jj)
            that.setData({
              images: jj.data.images
            })
          }
        })



      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  deleteImg: function (e) {
    var that = this
    var index = e.currentTarget.dataset.id;
    console.log(index)
    var pics = pics
    that.data.pics.splice(index, 1)
    this.setData({
      pics: that.data.pics
    })

  },
  submit:function(){
    var that= this
    var userId = wx.getStorageSync('userId')
    new Member(function(res){
        wx.showToast({
          title: '提交成功',
        })
    }).feedback({ userId: userId, phone: that.data.phone, images: that.data.images, content: that.data.content })
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