// pages/hire/car/car.js
let app = getApp(),
  util = require("../../../utils/util.js"),
  Cars = require("../../../service/cars.js"),
  Member = require("../../../service/member.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatDate(new Date()),
    time: '8:00',
    array: ['1', '2', '3', '4'],
    checked: false,
    name: '',
    phone: '',
    start: '',
    end: '',
    remark: '',
    seat: 1,
    startAddress: '',
    endAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    this.setData({
      seat: parseInt(e.detail.value) + 1
    })
  },
  checkboxChange: function(e) {
    var that = this;
    if (that.data.checked == false) {
      that.setData({
        checked: true
      })
    } else {
      that.setData({
        checked: false
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
  start: function(e) {
    this.setData({
      start: e.detail.value
    })
  },
  end: function(e) {
    this.setData({
      end: e.detail.value
    })
  },
  remark: function(e) {
    this.setData({
      remark: e.detail.value
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
    var userId = wx.getStorageSync('userId')
    new Member(function(res) {
      that.setData({
        name: res.data.username ? res.data.username : res.data.nickname,
        phone: res.data.phone
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
    })
  },
  bindStart: function() {
    var that = this
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
              startAddress: res.address
            })
          },
        })
        //   }
        // })
      }
    })
  },
  bindEnd: function () {
    var that = this
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
          success: function (res) {
            console.log('选点')
            console.log(res)

            that.setData({
              end: res.name,
              endAddress: res.address
            })
          },
        })
        //   }
        // })
      }
    })
  },
  submit: function() {
    var userId = wx.getStorageSync('userId')
    var that = this


    if (that.data.checked) {
      new Cars(function(data) {
        wx.showToast({
          title: '发布成功',
          success: function() {
            setTimeout(function () {
              wx.navigateBack({})
            }, 3000)
          }
        })

      }).pullpool({
        type: 2,
        name: that.data.name,
        phonenum: that.data.phone,
        start: that.data.start,
        end: that.data.end,
        startdate: that.data.date,
        starttime: that.data.time,
        seat: that.data.seat,
        brand: '',
        series: '',
        remarks: that.data.remark,
        userId: userId,
        start_address: that.data.startAddress,
        end_address: that.data.endAddress
      })
    } else {
      wx.showToast({
        title: '请先阅读并同意《免责声明》',
        image: '/resources/images/x.png'
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