// pages/home/hire/hire.js

let app = getApp(),
  util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    addressShow:true,
    mode:0,
    mode1: 0
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
      drivingTime: ' ' + p(drivingHour) + ':' + p(drivingMinutes) ,
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
  tab_switch: function(e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    that.setData({
      tab_current: id
    })
  },

  modeClick:function(e){
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    that.setData({
      mode:id
    })
    if(id == 1){
      that.setData({
        addressShow: false
      })
    }else{
      that.setData({
        addressShow: true
      })
    }
  },
  modeClick1: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    that.setData({
      mode1: id
    })
    if (id == 1) {
      that.setData({
        addressShow: false
      })
    } else {
      that.setData({
        addressShow: true
      })
    }
  },
  addressChoose:function(){
    console.log('addressChoose')
    this.setData({
      addressShow: true
    })
  },

  // 代驾日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drivingDate: e.detail.value
    })
  },
  //代驾时间选择器
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drivingTime: e.detail.value
    })
  },
//取车日期选择器
  pickUpDateChange:function(e){
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
  pickUpTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickUpTime: e.detail.value
    })
  },

  //还车日期选择器
  returnDateChange: function (e) {
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
  returnTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returnTime: e.detail.value
    })
  },
  goCar:function(){
    util.navigateTo({
      url: 'car/car',
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