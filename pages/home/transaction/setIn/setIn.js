// pages/member/dealer/dealer.js
let app = getApp()
let Member = require('../../../../service/member.js')
let Ruzhu = require('../../../../service/ruzhu.js')
let util = require('../../../../utils/util.js')
let config = require('../../../../utils/config.js')
let BASE_URL = config.BASE_URL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    phone: '',
    images: '',
    name: '',
    address: '',
    start: '',
    lant:'',
    long:'',
    time:''
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

  bindStart: function() {
    var that = this
    wx.getSetting({
      success(res) {

        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '提示',
            content: '未授予地址权限，是否前往设置',
            success: function(res) {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })

        } else {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              const speed = res.speed
              const accuracy = res.accuracy
              console.log(latitude, longitude)
              // wx.openLocation({
              //   latitude,
              //   longitude,
              //   scale: 18,
              //   success: function(res) {

              console.log('打开地图')

              wx.chooseLocation({
                success: function(res) {
                  console.log('选点')
                  console.log(res)

                  that.setData({
                    start: res.name,
                    address: res.address,
                    long: res.longitude,
                    lant: res.latitude
                  })
                },
              })
              //   }
              // })
            }
          })
        }

      }
    })
  },
  chooseImg: function() {
    var that = this,
      pics = this.data.pics;

    wx.chooseImage({
      // count: 1 - pics.length, // 最多可以选择的图片张数，默认9
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
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
    var type = e.target.dataset.type;

    wx.previewImage({
      current: current,
      urls: this.data.pics
    })


  },
  deleteImg: function(e) {
    var that = this
    var index = e.currentTarget.dataset.id;
    console.log(index)
    var type = e.target.dataset.type;

    console.log(e)
    console.log(type)


    var pics = pics
    that.data.pics.splice(index, 1)
    this.setData({
      pics: that.data.pics,
      images: ''
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

  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  
  time: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  submit: function() {
    var that = this
    var userId = wx.getStorageSync('userId')
    if (that.data.name == '') {
      wx.showToast({
        title: '请输入商家名称',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        image: '/resources/images/x.png'
      })
      return
    } else if (!(/^1\d{10}$/.test(that.data.phone))) {
      wx.showToast({
        title: '请输入正确手机号',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.address == '') {
      wx.showToast({
        title: '请输入地址',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.time == '') {
      wx.showToast({
        title: '请输入营业时间',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.images == '') {
      wx.showToast({
        title: '请上传logo图片',
        image: '/resources/images/x.png'
      })
      return
    }

    new Ruzhu(function(res) {
      wx.showToast({
        title: '提交成功',
        success: function() {
          wx.navigateBack({})
        }
      })
    }).add({
      // userId: userId,
      name: that.data.name,
      logo: that.data.images,
      address: that.data.address,
      phone: that.data.phone,
      opentime: that.data.time,
      long: that.data.long,
      lant: that.data.lant,
      type: 1
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

})