// pages/home/home.js

let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  First = require("../../service/first.js"),
  app = getApp(),
  util = require("../../utils/util.js")

Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

  },
  // onReady() {
  //   this.setData({
  //     winHeight: wx.getSystemInfoSync().windowHeight
  //   })

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  onShow(){
    //获取首页内容
    new First(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        menu: res.data.return_meun,
        ad: res.data.return_place,
        news: res.data.return_new
      })
    }).do()
  },
  
  goMenu:function(e){
    console.log(e)
    let urlCurrent = e.currentTarget.dataset.url
    util.navigateTo({
      url: urlCurrent,
    })
  },
  goMaintain:function(){
    util.navigateTo({
      url: '/pages/home/maintain/maintain',
    })
  },
  goAccessories:function(){
    util.navigateTo({
      url: '/pages/home/accessories/accessories',
    })
  }, 
  goHire: function() {
    util.navigateTo({
      url: 'hire/hire',
    })
  },
  goTrial:function(){
    util.navigateTo({
      url: 'trial/trial',
    })
  },
  goRoadRescue:function(){
    util.navigateTo({
      url: 'roadRescue/roadRescue',
    })
  },
  goSchool: function () {
    util.navigateTo({
      url: 'school/school',
    })
  },
  goPersonnelCar:function(){
    util.navigateTo({
      url: 'personnelCar/personnelCar',
    })
  },
  goSteamProtection: function () {
    util.navigateTo({
      url: 'steamProtection/steamProtection',
    })
  },
  goInsurance:function(){
    util.navigateTo({
      url: 'insurance/insurance',
    })
  },
  goTransaction: function () {
    util.navigateTo({
      url: 'transaction/transaction',
    })
  },
  goBeauty: function () {
    util.navigateTo({
      url: 'beauty/beauty',
    })
  },
  //跳转资讯列表页
  goNewsList(e){
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: './../news/news',
    })
  },
  //跳转资讯详情页
  goNewsView(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: './../news/view/view?id=' + id,
    })
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '车相关',
      path: '/pages/home/home',
      desc:'宁愿跑起来被拌倒无数次，也不要规规矩矩走一辈子。不在直线超你，也不在弯道超你，只想自由自在轰鸣在路上。车子与您相关，车相关为你服务',
      imageUrl: 'https://www.chexiangguan.com/weixin/images/placeholder/logo2.jpg',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
 
}))