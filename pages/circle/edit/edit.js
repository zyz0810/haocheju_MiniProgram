// pages/circle/edit/edit.js
let app = getApp(),
  util = require("../../../utils/util.js"),
  Contact = require("../../../service/contact.js"),
  Member = require("../../../service/member.js")
let config = require('../../../utils/config.js')
let navCart = require("../../../template/cart/cart.js")
let BASE_URL = config.BASE_URL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    content: ''
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
    var userId = wx.getStorageSync('userId')
    new Member(function(res) {
      if (res.data.verify != '1') {
        wx.showModal({
          title: '',
          content: '请先绑定手机号码',
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
    })
  },
  sendTxt: function(e) {
    console.log(e)
    var cont = e.detail.value
    this.setData({
      content: cont
    })
  },
  cancel: function() {
    wx.navigateBack({})
  },
  publish: function() {

    var that = this
    var userId = wx.getStorageSync('userId')

    // new Contact(function(res){

    // }).uploadImg()


    // wx.chooseImage({
    //   count: 9, // 最多可以选择的图片张数，默认9
    //   // count: 1, // 最多可以选择的图片张数，默认9
    //   sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
    //   success: function (res) {
    //     var imgsrc = res.tempFilePaths;
    //     pics = pics.concat(imgsrc);
    //     that.setData({
    //       pics: pics
    //     });

    if (that.data.pics.length == 0){
       var str = ''
    }

    wx.uploadFile({
      url: BASE_URL + 'Api/Circle/pullcircle',
      // filePath:'',
      filePath: that.data.pics[0],
      // filePath:'http://tmp/wx968b7c21f293681f.o6zAJs1eLRDrAxyOccJqWAYfaj5I.HimpcHSx08Bibf55eed6c281893ebc829f83e1fe4623.jpg',
      name: 'file',
      formData: {
        // 'content': that.data.content,
        'userId': userId
      },
      success(res) {



        console.log(res)
        console.log('打印')
        // var str = res.data

        // str = str.replace(" ", "");
        // str = str.replace(/\ufeff/g, ""); //字符串转化JSON对象
        // var jj = JSON.parse(str);

        // console.log(jj)

      }

    })



    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })









    // wx.showToast({
    //   title: '发表成功',
    //   duration: 2000,
    //   success: function() {
    //     console.log(1)
    //     setTimeout(function() {
    //       // wx.navigateBack({})
    //     }, 2000)

    //   }
    // })


  },
  chooseImg: function() {
    var that = this
    var userId = wx.getStorageSync('userId');　　　　　　
    var pics = this.data.pics

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