// pages/member/dealer/dealer.js
let app = getApp()
let Member = require('../../../service/member.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
let navCart = require("../../../template/cart/cart.js")
let BASE_URL = config.BASE_URL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    phone: '',
    images: '',
    content: '',
    shop: [],
    license: [],
    name: '',
    address: '',
    position: '',
    person: '',
    num: '',
    licenseImages:'',
    shopImages:''
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
  chooseShop: function() {
    var that = this,
      shop = this.data.shop;

    wx.chooseImage({
      // count: 1 - pics.length, // 最多可以选择的图片张数，默认9
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        shop = shop.concat(imgsrc);
        that.setData({
          shop: shop
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
              shopImages: jj.data.images
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
  chooseLicense: function() {
    var that = this,
      license = this.data.license;

    wx.chooseImage({
      // count: 1 - pics.length, // 最多可以选择的图片张数，默认9
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        license = license.concat(imgsrc);
        that.setData({
          license: license
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
              licenseImages: jj.data.images
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
    if (type == 'pics') {
      wx.previewImage({
        current: current,
        urls: this.data.pics
      })
    } else if (type == 'shop') {
      wx.previewImage({
        current: current,
        urls: this.data.pics
      })
    } else {
      wx.previewImage({
        current: current,
        urls: this.data.pics
      })
    }

  },
  deleteImg: function(e) {
    var that = this
    var index = e.currentTarget.dataset.id;
    console.log(index)
    var type = e.target.dataset.type;

    console.log(e)
console.log(type)

    if (type == 'pics') {
      var pics = pics
      that.data.pics.splice(index, 1)
      this.setData({
        pics: that.data.pics,
        images:''
      })
    } else if (type == 'shop') {
      console.log(that.data.shop)
      var shop = shop
      that.data.shop.splice(index, 1)
      this.setData({
        shop: that.data.shop,
        shopImages:''
      })
    } else {
      var license = license
      that.data.license.splice(index, 1)
      this.setData({
        license: that.data.license,
        licenseImages: ''
      })
    }


    

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
  person: function(e) {
    this.setData({
      person: e.detail.value
    })
  },
  position: function(e) {
    this.setData({
      position: e.detail.value
    })
  },
  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  num: function(e) {
    this.setData({
      num: e.detail.value
    })
  },
  submit: function() {
    var that = this
    var userId = wx.getStorageSync('userId')
    if (that.data.name == ''){
      wx.showToast({
        title: '请输入服务商名称',
        image: '/resources/images/x.png'
      })
      return
    } 
    if (that.data.person == '') {
      wx.showToast({
        title: '请输入经办人',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.position == '') {
      wx.showToast({
        title: '请输入职位',
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
    if (that.data.num == '') {
      wx.showToast({
        title: '请输入账号',
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
    if (that.data.licenseImages == '') {
      wx.showToast({
        title: '请上传门店图片',
        image: '/resources/images/x.png'
      })
      return
    }
    if (that.data.shopImages == '') {
      wx.showToast({
        title: '请上传营业执照',
        image: '/resources/images/x.png'
      })
      return
    }
    new Member(function(res) {
      wx.showToast({
        title: '提交成功',
      })
    }).dealer({
      userId: userId,
      providername: that.data.name,
      prividerperson: that.data.person,
      address: that.data.address,
      position: that.data.position,
      phone: that.data.phone,
      logo: that.data.images,
      images: that.data.shopImages,
      license: that.data.licenseImages,
      name: that.data.num
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