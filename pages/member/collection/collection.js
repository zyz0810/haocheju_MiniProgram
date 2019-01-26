// pages/member/car/car.js
let app = getApp()
let Member = require('../../../service/member.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 0,
    newCar:false,
    oldCar:true
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
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          var userId = wx.getStorageSync('userId')
          new Member(function (res) {
            that.setData({
              newList: res.data.data,
              newPage: res.data.pageTotal,
              newcurrentPage: res.data.currentPage,
            })
          }).collection({
            pageSize: 10,
            page: 1,
            userId: userId,
            type: 1
          })
          new Member(function (res) {
            that.setData({
              oldList: res.data.data,
              oldPage: res.data.pageTotal,
              oldcurrentPage: res.data.currentPage,
            })
          }).collection({
            pageSize: 10,
            page: 1,
            userId: userId,
            type: 2
          })
        }
      }
    })
    
  },
  tabClick: function(e) {
    var that = this;
    that.setData({
      tab_current: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 0){
      that.setData({
        newCar: false,
        oldCar: true
      })
    }else{
      that.setData({
        newCar: true,
        oldCar: false
      })
    }
  },
  goNewView: function (e) {
    var id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/transaction/view/view?id=' + id,
    })
  },
  goOldView:function(e){
    var id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/usedCar/view/view?id=' + id,
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
    var that = this
    var userId = wx.getStorageSync('userId')
    new Member(function (res) {
      wx.stopPullDownRefresh()
      that.setData({
        newList: res.data.data,
        newPage: res.data.pageTotal,
        newcurrentPage: res.data.currentPage,
      })
    }).collection({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 1
    })
    new Member(function (res) {
      wx.stopPullDownRefresh()
      that.setData({
        oldList: res.data.data,
        oldPage: res.data.pageTotal,
        oldcurrentPage: res.data.currentPage,
      })
    }).collection({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 2
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var userId = wx.getStorageSync('userId')
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;

    if (that.data.tab_current == 0){
      var newPage = this.data.newPage;
      var newcurrentPage = this.data.newcurrentPage;
      var newList = this.data.newList;


      // console.log(currentPage)

      new Member(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.pageTotal < res.data.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          newList = newList.concat(res.data.data)
          this.setData({
            newList: newList,
            newcurrentPage: res.data.currentPage
          })
        }

      }).collection({
        page: ++newcurrentPage,
        pageSize: 10,
        userId: userId,
        type: 1
      })
    }else{
      var oldPage = this.data.oldPage;
      var oldcurrentPage = this.data.oldcurrentPage;
      var oldList = this.data.oldList;


      // console.log(currentPage)

      new Member(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.pageTotal < res.data.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          oldList = oldList.concat(res.data.data)
          this.setData({
            oldList: oldList,
            oldcurrentPage: res.data.currentPage
          })
        }

      }).collection({
        page: ++oldcurrentPage,
        pageSize: 10,
        userId: userId,
        type: 2
      })
    }
    

  },

})