// pages/home/personnelCar/personnelCar.js
let swiperAutoHeight = require("../../../template/swiperWidth/swiper.js"),  
  Personnel = require("../../../service/personal.js"), 
  app = getApp(),
  util = require("../../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

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
    //获取内容
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        } else {
          new Personnel(res => {
            console.log(res)
            that.setData({
              banner: res.data.return_banner,
              job: res.data.return_job.data,
              jobPage: res.data.return_job.pageTotal,
              currentPage: res.data.return_job.currentPage
            })

            if (res.data.return_job.data.length == 0) {
              that.setData({
                tips: '暂无列表',
                showtips: false
              })
            }

          }).list({
            page: 1,
            pageSize: 10
          })
        }
      }
    })
    
  },
  goView:function(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: 'view/view?jobId=' + id,
    })
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
    //获取内容
    new Personnel(res => {
      wx.stopPullDownRefresh()
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        job: res.data.return_job.data,
        jobPage: res.data.return_job.pageTotal,
        currentPage: res.data.return_job.currentPage
      })

      if (res.data.return_job.data.length == 0) {
        this.setData({
          tips: '暂无列表',
          showtips: false
        })
      }

    }).list({
      page: 1,
      pageSize: 10
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPage = this.data.jobPage;
    var currentPage = this.data.currentPage;
    var news = this.data.news;


    console.log(currentPage)

    new Zixun(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_job.pageTotal < res.data.return_job.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        job = job.concat(res.data.return_job.data)
        this.setData({
          job: job,
          currentPage: res.data.return_job.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10
    })
  },

}))