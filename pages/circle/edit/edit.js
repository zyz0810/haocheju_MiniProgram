// pages/circle/edit/edit.js
let app = getApp(),
  util = require("../../../utils/util.js"),
  Contact = require("../../../service/contact.js"),
  Member = require("../../../service/member.js")
let config = require('../../../utils/config.js')
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


  // uploadimg: function () {//这里触发图片上传的方法
  //   var pics = this.data.pics;
  //   util.uploadimg({
  //     url: BASE_URL + 'api/users/uploads',//这里是你图片上传的接口
  //     path: pics//这里是选取的图片的地址数组
  //   });
  // },

  publish: function() {

    var that = this
    var userId = wx.getStorageSync('userId')

  

    new Contact(function(res) {
      wx.showToast({
        title: '发布成功',
        success:function(){
          setTimeout(function () {
            wx.navigateBack({})
          }, 3000)
        }
      })

    }).uploadImgxcx({
      images:that.data.images,
      content: that.data.content,
      userId: userId
    })

  },









  chooseImg: function() {
    var that = this
    var userId = wx.getStorageSync('userId');　　　　　　
    var pics = this.data.pics
    var imgs = []

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      // count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;　　　　　　　　　
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });

        uploadimg({
          url: BASE_URL + 'api/users/uploads', //这里是你图片上传的接口
          path: pics //这里是选取的图片的地址数组
        });



        //多张图片上传
        function uploadimg(data) {
          var ht = this
          var i = data.i ? data.i : 0, //当前上传的哪张图片
            success = data.success ? data.success : 0, //上传成功的个数
            fail = data.fail ? data.fail : 0; //上传失败的个数
          wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'file', //这里根据自己的实际情况改
            formData: null, //这里是上传图片时一起上传的数据
            success: (resp) => {
              success++; //图片上传成功，图片上传成功的变量+1
              console.log(resp)

              var str = resp.data

              str = str.replace(" ", "");
              str = str.replace(/\ufeff/g, ""); //字符串转化JSON对象
              var jj = JSON.parse(str);


              imgs.push(jj.data.images)
              console.log(imgs)
              console.log(23323)

              console.log(jj)
              that.setData({
                images: imgs
              })


              console.log(i);
              //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
            },
            fail: (res) => {
              fail++; //图片上传失败，图片上传失败的变量+1
              console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
              console.log(i);
              i++; //这个图片执行完上传后，开始上传下一张
              if (i == data.path.length) { //当图片传完时，停止调用          
                console.log('执行完毕');
                console.log('成功：' + success + " 失败：" + fail);
              } else { //若图片还没有传完，则继续调用函数
                console.log(i);
                data.i = i;
                data.success = success;
                data.fail = fail;
                uploadimg(data);
              }

            }
          });
        }








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