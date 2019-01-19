// pages/tenant/tenant.js
let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  Tenant = require("../../service/tenant.js"),
  app = getApp(),
  util = require("../../utils/util.js")

Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    news: false,
    used: true,
    newsPage: '',
    newsCurrentPage: '',
    usedPage: '',
    usedCurrentPage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let tenantId = options.id
    this.setData({
      tenantId: tenantId
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
    //获取首页内容
    var that = this
    new Tenant(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.goods.providername
      })
      this.setData({
        banner: res.data.goods.images,
        address: res.data.goods.address,
        phone: res.data.goods.phone,
        providername: res.data.goods.providername,
        newList: res.data.return_newcar.data,
        newsPage: res.data.return_newcar.pageTotal,
        newsCurrentPage: res.data.return_newcar.currentPage,
      })
    }).newCar({
      providerid: that.data.tenantId,
      page: 1,
      pageSize: 10
    })



    new Tenant(res => {
      console.log(res)
      this.setData({
        usedList: res.data.return_oldcar.data,
        usedPage: res.data.return_oldcar.pageTotal,
        usedCurrentPage: res.data.return_oldcar.currentPage,
      })
    }).usedCar({
      providerid: that.data.tenantId,
      page: 1,
      pageSize: 10
    })

  },
  tabClick: function(e) {
    let currentTab = e.currentTarget.dataset.id
    var that = this
    if (currentTab == 0) {
      that.setData({
        news: false,
        used: true
      })
    } else {
      that.setData({
        news: true,
        used: false
      })
    }
    this.setData({
      currentTab: currentTab
    })
  },
  goNewView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/transaction/view/view?id=' + id,
    })
  },
  goUsedView: function(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/home/usedCar/view/view?id=' + id,
    })
  },
  callUs: function(e) {
    console.log(e)
    let phone = e.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: phone,
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow('0551-67698098', 5000)
        }

      }
    })
  },
  appointment:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '/pages/appointment/appointment?id=' + id,
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
    new Tenant(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.goods.providername
      })
      this.setData({
        banner: res.data.goods.images,
        address: res.data.goods.address,
        phone: res.data.goods.phone,
        providername: res.data.goods.providername,
        newList: res.data.return_newcar.data,
        newsPage: res.data.return_newcar.pageTotal,
        newsCurrentPage: res.data.return_newcar.currentPage,
      })
    }).newCar({
      providerid: that.data.tenantId,
      page: 1,
      pageSize: 10
    })



    new Tenant(res => {
      console.log(res)
      this.setData({
        usedList: res.data.return_oldcar.data,
        usedPage: res.data.return_oldcar.pageTotal,
        usedCurrentPage: res.data.return_oldcar.currentPage,
      })
    }).usedCar({
      providerid: that.data.tenantId,
      page: 1,
      pageSize: 10
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    var that = this;
    wx.showNavigationBarLoading();

    if (that.data.currentTab == 0) {
      // var pageModel = this.data.pageModel;
      var newPage = that.data.newsPage;
      var newsCurrentPage = that.data.newsCurrentPage;
      var newList = that.data.newList;

      console.log(newsCurrentPage)

      new Tenant(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_newcar.pageTotal < res.data.return_newcar.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          newList = newList.concat(res.data.return_newcar.data)
          this.setData({
            newList: newList,
            newsCurrentPage: res.data.return_newcar.currentPage
          })
        }

      }).newCar({
        providerid: that.data.tenantId,
        page: ++newsCurrentPage,
        pageSize: 10
      })

    } else {
      // var pageModel = this.data.pageModel;
      var newPage = that.data.newsPage;
      var usedCurrentPage = that.data.usedCurrentPage;
      var usedList = that.data.usedList;

      console.log(usedCurrentPage)

      new Tenant(res => {
        console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.return_oldcar.pageTotal < res.data.return_oldcar.currentPage) {
          wx.hideNavigationBarLoading()
          that.setData({
            tips: '',
            showtips: false
          })
        } else {
          usedList = usedList.concat(res.data.return_oldcar.data)
          this.setData({
            usedList: usedList,
            usedCurrentPage: res.data.return_oldcar.currentPage
          })
        }

      }).usedCar({
        providerid: that.data.tenantId,
        page: ++usedCurrentPage,
        pageSize: 10
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))