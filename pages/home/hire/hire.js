// pages/home/hire/hire.js

let app = getApp(),
  util = require("../../../utils/util.js"),
  Cars = require("../../../service/cars.js"),
  Rent = require("../../../service/rent.js"),
  Member = require("../../../service/member.js")
var countdown = util.countdown //验证码计时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 0,
    addressShow: true,
    mode: 0,
    mode1: 0,
    start: '',
    end: '',
    startAddress: '',
    endAddress: '',
    drivingPhone: '',
    drivingCode: '',
    tips: '发送验证码',
    count: 60,
    drivingtips: '发送验证码',
    drivingcount: 60,
    addressChoosed: '请选择门店',
    carModeChoosed: '请选择车型',
    addressChoosedtwo: '',
    addressIdChoosed: '',
    carShow: true,
    carChoosedfour: '',
    phone: '',
    code: '',
    name: '',
    carIdChoosed: ''
  },
  chooseShop: function() {
    this.setData({
      addressShow: false
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    function p(s) {
      return s < 10 ? '0' + s : s;
    }
    var drivingYear = new Date().getFullYear(),
      drivingMonth = new Date().getMonth() + 1,
      drivingDay = new Date().getDate(),
      drivingHour = new Date().getHours(),
      drivingMinutes = new Date().getMinutes(),
      days = GetDateDiff(drivingYear + '-' + p(drivingMonth) + '-' + p(drivingDay), drivingYear + '-' + p(drivingMonth) + '-' + p(drivingDay + 1), 'day')
    this.setData({
      drivingYear: p(drivingYear),
      drivingMonth: p(drivingMonth),
      drivingDay: p(drivingDay),
      drivingDate: drivingYear + '-' + p(drivingMonth) + '-' + p(drivingDay),
      drivingTime: ' ' + p(drivingHour) + ':' + p(drivingMinutes),
      pickUpDate: drivingYear + '-' + p(drivingMonth) + '-' + p(drivingDay),
      pickUpTime: ' ' + p(drivingHour) + ':' + p(drivingMinutes),
      returnDate: drivingYear + '-' + p(drivingMonth) + '-' + p(drivingDay + 1),
      returnTime: ' ' + p(drivingHour) + ':' + p(drivingMinutes),
      days: days
    })


    function GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); //开始时间
      var eTime = new Date(endTime); //结束时间
      //作为除数的数字
      var timeType = 1;
      switch (diffType) {
        case "second":
          timeType = 1000;
          break;
        case "minute":
          timeType = 1000 * 60;
          break;
        case "hour":
          timeType = 1000 * 3600;
          break;
        case "day":
          timeType = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      var days = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
      if (days < 0) {
        toast.show('xiaoyu ')
      }
      return days;
    }
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
                    startAddress: res.address
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
  bindEnd: function() {
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
                    end: res.name,
                    endAddress: res.address
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
  drivingPhone: function(e) {
    this.setData({
      drivingPhone: e.detail.value
    })
  },
  drivingCode: function(e) {
    this.setData({
      drivingCode: e.detail.value
    })
  },

  //获取验证码
  getcap: function() {
    var that = this
    if (that.data.drivingPhone.length == 0) {
      util.errShow('请填写手机号');
      return;
    } else if (!(/^1\d{10}$/.test(that.data.drivingPhone))) {
      util.errShow('手机号格式错误');
      return;
    } else {
      new Member(res => {
        console.log(res)
        countdown(that);
      }).getCode({
        phonenum: that.data.drivingPhone
      })
    }
  },

  drivingSubmit: function() {
    var userId = wx.getStorageSync('userId')
    var that = this



    if (that.data.start == '') {
      wx.showToast({
        title: '请填写出发地',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.end == '') {
      wx.showToast({
        title: '请填写目的地',
        image: '/resources/images/x.png'
      })
      return;
    }

    if (that.data.drivingPhone == '') {
      wx.showToast({
        title: '请填写手机号',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.drivingCode == '') {
      wx.showToast({
        title: '请填写验证码',
        image: '/resources/images/x.png'
      })
      return;
    }


    new Member(res => {
      console.log(res)

      new Rent(function() {
        wx.showToast({
          title: '预约成功'
        })
      }).driver({
        mobile: that.data.drivingPhone,
        start: that.data.start,
        end: that.data.end,
        datetime: that.data.drivingDate + that.data.datetime,
        start_address: that.data.startAddress,
        end_address: that.data.endAddress
      })


    }).getcodeCheck({
      phonenum: that.data.drivingPhone,
      code: that.data.drivingCode
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
    new Rent(function(res) {
      that.setData({
        addressList: res.data.data,
        addressPage: res.data.pageTotal,
        currentAddressPage: res.data.currentPage
      })
    }).tenant({
      pageSize: 10,
      page: 1
    })
  },
  tab_switch: function(e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    that.setData({
      tab_current: id
    })
  },

  // modeClick: function(e) {
  //   var that = this
  //   console.log(e)
  //   var id = e.currentTarget.dataset.id
  //   that.setData({
  //     mode: id
  //   })
  //   if (id == 1) {
  //     that.setData({
  //       addressShow: false
  //     })
  //   } else {
  //     that.setData({
  //       addressShow: true
  //     })
  //   }
  // },
  // modeClick1: function(e) {
  //   var that = this
  //   console.log(e)
  //   var id = e.currentTarget.dataset.id
  //   that.setData({
  //     mode1: id
  //   })
  //   if (id == 1) {
  //     that.setData({
  //       addressShow: false
  //     })
  //   } else {
  //     that.setData({
  //       addressShow: true
  //     })
  //   }
  // },
  addressChoose: function(e) {
    console.log(e)
    var that = this
    console.log('addressChoose')
    this.setData({
      addressShow: true,
      addressChoosed: '',
      addressChoosedone: that.data.addressList[e.currentTarget.dataset.index].providername,
      addressChoosedtwo: that.data.addressList[e.currentTarget.dataset.index].address,
      addressIdChoosed: e.currentTarget.dataset.id
    })

    new Rent(function(res) {
      if (res.data.total == '0') {
        that.setData({
          carModeChoosed: '此门店暂无车辆',
          carModeLength: 0
        })
      } else {
        that.setData({
          carList: res.data.data,
          carModeChoosed: '请选择车型',
          carModeLength: res.data.total,
          carPage: res.data.pageTotal,
          currentCarPage: res.data.currentPage
        })
      }

    }).car({
      pageSize: 10,
      page: 1,
      providerid: e.currentTarget.dataset.id
    })

  },
  chooseCarMode: function() {
    console.log(1212)
    console.log(this.data.providerid)
    if (this.data.addressIdChoosed == '') {
      wx.showToast({
        title: '请选择门店',
        image: '/resources/images/x.png'
      })
      return
    }
    if (this.data.carModeLength == '0') {
      wx.showToast({
        title: '此门店暂无车辆',
        image: '/resources/images/x.png'
      })
      return
    }
    this.setData({
      carShow: false,
    })
  },

  carChoose: function(e) {
    var that = this
    console.log('addressChoose' + e.currentTarget.dataset.index)
    this.setData({
      carShow: true,
      carChoosed: '',
      carChoosedone: that.data.carList[e.currentTarget.dataset.index].images,
      carChoosedtwo: that.data.carList[e.currentTarget.dataset.index].brand,
      carChoosedthree: that.data.carList[e.currentTarget.dataset.index].type,
      carChoosedfour: that.data.carList[e.currentTarget.dataset.index].price,
      carIdChoosed: e.currentTarget.dataset.id,
      carNameChoosed: e.currentTarget.dataset.txt
    })
  },

  // 代驾日期选择器
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drivingDate: e.detail.value
    })
  },
  //代驾时间选择器
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drivingTime: e.detail.value
    })
  },
  //取车日期选择器
  pickUpDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)


    function p(s) {
      return s < 10 ? '0' + s : s;
    }
    var that = this

    function GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); //开始时间
      var eTime = new Date(endTime); //结束时间
      //作为除数的数字
      var timeType = 1;
      switch (diffType) {
        case "second":
          timeType = 1000;
          break;
        case "minute":
          timeType = 1000 * 60;
          break;
        case "hour":
          timeType = 1000 * 3600;
          break;
        case "day":
          timeType = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      var days = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
      if (days < 0) {
        // toast.show('xiaoyu ')
      }
      return days;
    }


    this.setData({
      pickUpDate: e.detail.value,
      days: GetDateDiff(e.detail.value, that.data.returnDate, 'day')
    })
  },
  //取车时间选择器
  pickUpTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickUpTime: e.detail.value
    })
  },

  //还车日期选择器
  returnDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)


    function p(s) {
      return s < 10 ? '0' + s : s;
    }
    var that = this
    // days = GetDateDiff(that.data.pickUpDate, that.data.returnDate, 'day')
    // console.log('days' + days)
    function GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); //开始时间
      var eTime = new Date(endTime); //结束时间
      //作为除数的数字
      var timeType = 1;
      switch (diffType) {
        case "second":
          timeType = 1000;
          break;
        case "minute":
          timeType = 1000 * 60;
          break;
        case "hour":
          timeType = 1000 * 3600;
          break;
        case "day":
          timeType = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      var days = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
      if (days < 0) {
        // toast.show('xiaoyu ')
      }
      return days;
    }

    console.log(e.detail.value)
    console.log(that.data.returnDate)

    this.setData({
      returnDate: e.detail.value,
      days: GetDateDiff(that.data.pickUpDate, e.detail.value, 'day')
    })
  },
  //还车时间选择器
  returnTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returnTime: e.detail.value
    })
  },
  goCar: function() {
    var that = this
    if (that.data.addressIdChoosed == '') {
      wx.showToast({
        title: '请选择门店',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.carIdChoosed == '') {
      wx.showToast({
        title: '请选择车型',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.name == '') {
      wx.showToast({
        title: '请填写姓名',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.phone == '') {
      wx.showToast({
        title: '请填写手机号',
        image: '/resources/images/x.png'
      })
      return;
    }
    if (that.data.code == '') {
      wx.showToast({
        title: '请填写验证码',
        image: '/resources/images/x.png'
      })
      return;
    }

    new Rent(function() {

      wx.showToast({
        title: '租车成功',
      })
    }).orderrent({
      name: that.data.name,
      mobile: that.data.phone,
      ordercar: that.data.carNameChoosed,
      day: that.data.days,
      price: that.data.carChoosedfour,
      start: that.data.pickUpDate,
      end: that.data.returnDate,
      carid: that.data.carIdChoosed
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
  getcode: function() {
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
    var that = this
    if (that.data.addressShow == false) {
      wx.showNavigationBarLoading();
      // var pageModel = this.data.pageModel;
      var addressPage = that.data.addressPage;
      var currentAddressPage = that.data.currentAddressPage;
      var addressList = that.data.addressList;

      // console.log(++currentAddressPage)

      new Rent(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.pageTotal < res.data.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          addressList = addressList.concat(res.data.data)
          that.setData({
            addressList: addressList,
            currentAddressPage: res.data.currentPage
          })
        }

      }).tenant({
        page: ++currentAddressPage,
        pageSize: 10
      })


    }


    if (that.data.carShow == false) {
      wx.showNavigationBarLoading();
      // var pageModel = this.data.pageModel;
      var carPage = that.data.carPage;
      var currentCarPage = that.data.currentCarPage;
      var carList = that.data.carList;

      console.log(currentCarPage)

      new Rent(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.pageTotal < res.data.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          carList = carList.concat(res.data.data)
          that.setData({
            carList: carList,
            currentCarPage: res.data.currentPage
          })
        }

      }).car({
        page: ++currentCarPage,
        pageSize: 10,
        providerid: that.data.addressIdChoosed
      })



      // new Rent(function (res) {
      //   if (res.data.total == '0') {
      //     that.setData({
      //       carModeChoosed: '此门店暂无车辆',
      //       carModeLength: 0
      //     })
      //   } else {
      //     that.setData({
      //       carList: res.data.data,
      //       carModeChoosed: '请选择车型',
      //       carModeLength: res.data.total
      //     })
      //   }

      // }).car({
      //   pageSize: 10,
      //   page: 1,
      //   providerid: e.currentTarget.dataset.id
      // })



    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '车相关拼车',
      path: '/pages/home/hire/hire',
      desc: '车相关为网友提供代驾租车等信息查询和发布服务,是寻找和发布代驾租车信息的最佳平台。',
      imageUrl: 'https://www.chexiangguan.com/weixin/images/placeholder/logo2.jpg',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})