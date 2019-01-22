// pages/member/carpool/carpool.js
let app = getApp()
let Member = require('../../../service/member.js')
let Cars = require('../../../service/cars.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_current: 1,
    newCar: false,
    oldCar: true
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
    var that = this
    var userId = wx.getStorageSync('userId')
    new Cars(function (res) {
      that.setData({
        newList: res.data.return_new.data,
        newPage: res.data.return_new.pageTotal,
        newcurrentPage: res.data.return_new.currentPage,
      })



      
      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        if (list[i].ready=='1'){
          list[i].setOut = false
        }else{
          list[i].setOut = true 
        }
        
      }
      that.setData({
        newList: list
      })


    }).carPool({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 1
    })
    new Cars(function (res) {
      that.setData({
        oldList: res.data.return_new.data,
        oldPage: res.data.return_new.pageTotal,
        oldcurrentPage: res.data.return_new.currentPage,
      })


      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        if (list[i].ready == '1') {
          list[i].setOut = false
        } else {
          list[i].setOut = true
        }

      }
      that.setData({
        oldList: list
      })

    }).carPool({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 2
    })
  },
  tabClick: function (e) {
    var that = this;
    that.setData({
      tab_current: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 1) {
      that.setData({
        newCar: false,
        oldCar: true
      })
    } else {
      that.setData({
        newCar: true,
        oldCar: false
      })
    }
  },
  goView: function (e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    console.log('id:' + id)
    util.navigateTo({
      url: 'view/view?id=' + id + '&type=' + type,
    })
  },


  editCarpool:function(e){
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    var that = this
    new Cars(function(){
      if (that.data.tab_current == 1){
        var list = that.data.newList
        list[index].setOut = true
        list[index].ready = '2'
        that.setData({
          newList:list
        })

       
      }else{
        var list = that.data.oldList
        list[index].setOut = true
        list[index].ready = '2'
        that.setData({
          oldList: list
        })
      }
      wx.showToast({
        title: '状态为已出发',
      })


    }).editCarpool({id:id})

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
    var that = this
    var userId = wx.getStorageSync('userId')
    new Cars(function (res) {
      that.setData({
        newList: res.data.return_new.data,
        newPage: res.data.return_new.pageTotal,
        newcurrentPage: res.data.return_new.currentPage,
      })
      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        if (list[i].ready == '1') {
          list[i].setOut = false
        } else {
          list[i].setOut = true
        }

      }
      that.setData({
        newList: list
      })
    }).carPool({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 1
    })
    new Cars(function (res) {
      that.setData({
        oldList: res.data.return_new.data,
        oldPage: res.data.return_new.pageTotal,
        oldcurrentPage: res.data.return_new.currentPage,
      })
      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        if (list[i].ready == '1') {
          list[i].setOut = false
        } else {
          list[i].setOut = true
        }

      }
      that.setData({
        oldList: list
      })
    }).carPool({
      pageSize: 10,
      page: 1,
      userId: userId,
      type: 2
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var userId = wx.getStorageSync('userId')
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;

    if (that.data.tab_current == 1) {
      var newPage = that.data.newPage;
      var newcurrentPage = that.data.newcurrentPage;
      var newList = that.data.newList;


      // console.log(currentPage)

      new Cars(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_new.pageTotal < res.data.return_new.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {

          var list = res.data.return_new.data
          for (let i = 0; i < list.length; i++) {
            if (list[i].ready == '1') {
              list[i].setOut = false
            } else {
              list[i].setOut = true
            }

          }
          // this.setData({
          //   newList: list
          // })

          newList = newList.concat(rlist)
          this.setData({
            newList: newList,
            newcurrentPage: res.data.return_new.currentPage
          })
        }

      }).carPool({
        page: ++newcurrentPage,
        pageSize: 10,
        userId: userId,
        type: 1
      })
    } else {
      var oldPage = that.data.oldPage;
      var oldcurrentPage = that.data.oldcurrentPage;
      var oldList = that.data.oldList;


      // console.log(currentPage)

      new Cars(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_new.pageTotal < res.data.return_new.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          var list = res.data.return_new.data
          for (let i = 0; i < list.length; i++) {
            if (list[i].ready == '1') {
              list[i].setOut = false
            } else {
              list[i].setOut = true
            }

          }
          oldList = oldList.concat(list)
          this.setData({
            oldList: oldList,
            oldcurrentPage: res.data.return_new.currentPage
          })
        }

      }).carPool({
        page: ++oldcurrentPage,
        pageSize: 10,
        userId: userId,
        type: 2
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})