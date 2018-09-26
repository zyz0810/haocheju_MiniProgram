// pages/home/home.js

let swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  Product = require("../../service/product.js"),
  Cart = require("../../service/cart.js"),
  Coupon = require("../../service/coupon.js"),
  Tenant = require("../../service/tenant.js"),
  Ad = require("../../service/ad.js"),
  app = getApp(),
  util = require("../../utils/util.js"),
  navCart = require("../../template/cart/cart.js")

Page(Object.assign({}, swiperAutoHeight, navCart, {

  /**
   * 页面的初始数据
   */
  data: {
    scrollTo: null, //页面跳转到
    hotsell: [], //热销商品
    newsell: [], //新品
    recommendsell: [], //推荐商品
    limitsell: [],
    sys: app.globalData.sys,
    paging: {
      recommend: {},
      hotsell: {},
      newsell: {}
    },
    scrollX: true,
    homeLoadReady: false,
    storyTitle: '',
    toUpShow: false,
    nav: [],
    hotLength: '',
    recommendLength: '',
    newLength: '',
    limitLength: ''
  },
  onReady() {
    this.setData({
      winHeight: wx.getSystemInfoSync().windowHeight
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    var extension = options.extension;
    if (extension) {
      wx.setStorageSync('extension', extension)
    }
    if (options.shelvesNo) {
      wx.setStorageSync('shelvesNo', options.shelvesNo)
    }
    if (app.globalData.LOGIN_STATUS) {
      this.getData()
    } else {
      app.loginOkCallbackList.push(() => {
        this.getData()
      })
    }
  },
  //跳转详情页
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: './productDetails/productDetails?id=' + id,
    })
    // wx.navigateToMiniProgram({
    //     appId: 'wx441dd0c007894173',
    //     path: 'pages/home/productDetails/productDetails?id=' + id + '&tenantId=' + app.globalData.tenantId,
    //     extraData: {},
    //     // envVersion: 'develop',
    //     success(res) {
    //         // 打开成功
    //         console.log(res)
    //     },
    //     fail: function (err) {
    //         console.log(err)
    //     }
    // })
  },


  //加入购物车
  addCart(e) {
    let id = e.currentTarget.dataset.id

    new Cart((res) => {

    }).add({
      id: id,
      quantity: 1
    })
  },
  //获取数据
  getData() {
    wx.showShareMenu()
    let that = this,
      promiseList = []
    //广告位(顶部)
    promiseList.push(new Promise((resolve, reject) => {
      new Ad(res => {
        resolve(res)
      }).doT(80, app.globalData.tenantId)
    }))

    //商家数据
    promiseList.push(new Promise((resolve, reject) => {
      new Tenant(res => {
        this.setData({
          tenantData: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.name
        })
        resolve(res)
      }).view({
        id: app.globalData.tenantId
      })
    }))

    Promise.all(promiseList).then(res => {
      this.setData({
        topImgs: {
          data: res[0].data.length === 0 ? [{
            image: res[1].data.thumbnail
          }] : res[0].data,
          key: 'image'
        }
      })
      setTimeout(() => {
        this.setData({
          homeLoadReady: true
        })
      }, 500)
    }, err => {
      this.setData({
        homeLoadReady: true
      })
    })

    //加载优惠券
    new Coupon(data => {
      var item = [];
      var couponList = data.data
      this.setData({
        couponList: couponList
      });
    }).listT({
      tenantId: app.globalData.tenantId
    });

    //获取热销商品
    new Product(res => {
      this.data.paging.hotsell = res.pageModel
      var len = res.data.length
      if (len == 0) {
        this.data.shows = false
        this.setData({
          hotLength: true
        })
      } else {
        this.data.shows = true
        this.setData({
          hotLength: false
        })
      }
      this.setData({
        hotsell: res.data,
        paging: this.data.paging,
        showHot: this.data.shows
      })
      if (res.pageModel.pageNumber < res.pageModel.totalPages) {
        this.setData({
          hotsellTips: '加载更多'
        })
      } else {
        this.setData({
          hotsellTips: ''
        })
      }
    }).listT({
      id: app.globalData.tenantId,
      pageSize: 10,
      tagIds: 1
    })


    //获取限时抢购商品
    new Product(res => {
      var len = res.data.length
      if (len == 0) {
        this.setData({
          limitLength: true
        })
      } else {
        this.setData({
          limitLength: false
        })
      }


      function time1() {
        var limitsell = res.data
        for (var i = 0; i < limitsell.length; i++) {
          // limitsell[i].beginDate = util.formatTimeTwo(limitsell[i].beginDate, 'Y/M/D h:m:s')
          // limitsell[i].endDate = util.formatTimeTwo(limitsell[i].endDate, 'Y/M/D h:m:s')

          // 活动是否已经开始
          var totalSecond = limitsell[i].beginDate / 1000 - Date.parse(new Date()) / 1000;
          // 活动是否已经结束
          var endSecond = limitsell[i].endDate / 1000 - Date.parse(new Date()) / 1000;

          // var interval = setInterval(function() {
          // 秒数
          var second = totalSecond;
          // 天数位
          var day = Math.floor(second / 3600 / 24);
          var dayStr = day.toString();
          if (dayStr.length == 1) dayStr = '0' + dayStr;

          // 小时位
          // var hr = Math.floor((second - day * 3600 * 24) / 3600);
          var hr = Math.floor(second / 3600);
          var hrStr = hr.toString();
          if (hrStr.length == 1) hrStr = '0' + hrStr;

          // 分钟位
          // var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
          var min = Math.floor((second - hr * 3600) / 60);
          var minStr = min.toString();
          if (minStr.length == 1) minStr = '0' + minStr;

          // 秒位
          // var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
          var sec = second - hr * 3600 - min * 60;
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = '0' + secStr;

          totalSecond--;

          if (totalSecond < 0) {
            limitsell[i].txt = '马上秒'
            limitsell[i].countDownDay = '00'
            limitsell[i].countDownHour = '00'
            limitsell[i].countDownMinute = '00'
            limitsell[i].countDownSecond = '00'
            that.setData({
              limitsell: limitsell
            });
          } else {
            limitsell[i].txt = '即将开秒'
            limitsell[i].countDownDay = dayStr
            limitsell[i].countDownHour = hrStr
            limitsell[i].countDownMinute = minStr
            limitsell[i].countDownSecond = secStr

            that.setData({
              limitsell: limitsell
            });
          }
          if (endSecond < 0) {
            clearInterval(time1);
            // wx.showToast({
            //   title: '活动已结束',
            // });
            limitsell[i].txt = '去看看'
            limitsell[i].countDownDay = '00'
            limitsell[i].countDownHour = '00'
            limitsell[i].countDownMinute = '00'
            limitsell[i].countDownSecond = '00'
            that.setData({
              limitsell: limitsell
            });
          }
          // }.bind(this), 1000);
        }

        that.setData({
          limitsell: limitsell,
        })
      }

      time1();
      var timer = setInterval(time1, 1000);

    }).listL({
      tenantId: app.globalData.tenantId
    })


    //频道分类
    new Tenant(data => {
      this.setData({
        nav: data.data
      })
    }).productCategoryTree({
      tenantId: app.globalData.tenantId
    })
    //更多推荐
    // new Product((data) => {
    //   this.setData({
    //     tenantRecomList: data.data,
    //     pageModel: data.pageModel
    //   })
    // }).recommend({
    //   id: this.data.id,
    //   pageNumber: 1,
    //   pageSize: 6
    // })


    //品牌故事
    // new Tenant(data => {
    //   this.setData({
    //     storyTitle: data.data.title,
    //     storyId: app.globalData.tenantId
    //   })
    // }).article({ id: app.globalData.tenantId })

    //获取新品商品
    new Product(res => {
      this.data.paging.newsell = res.pageModel
      var len = res.data.length
      if (len == 0) {
        this.data.shows = false
        this.setData({
          newLength: true
        })
      } else {
        this.data.shows = true
        this.setData({
          newLength: false
        })
      }
      this.setData({
        newsell: res.data,
        paging: this.data.paging,
        showRecommd: this.data.shows,
        pageModel: res.pageModel
      })
    }).listT({
      id: app.globalData.tenantId,
      pageSize: 10,
      pageNumber: 1,
      tagIds: 2
    })



    // new Product(res => {
    //   this.data.paging.newsell = res.pageModel
    //   var len = res.data.length
    //   if (len == 0) {
    //     this.data.shows = false
    //   } else {
    //     this.data.shows = true
    //   }
    //   this.setData({
    //     newsell: res.data,
    //     paging: this.data.paging,
    //     showNew: this.data.shows
    //   })
    //   if (res.pageModel.pageNumber < res.pageModel.totalPages) {
    //     this.setData({
    //       newsellTips: '加载更多'
    //     })
    //   } else {
    //     this.setData({
    //       newsellTips: ''
    //     })
    //   }
    // }).listT({
    //   id: app.globalData.tenantId,
    //   pageSize: 10,
    //   tagIds: 2
    // })







    //获取推荐商品
    new Product(res => {
      this.data.paging.recommend = res.pageModel
      var len = res.data.length
      if (len == 0) {
        this.setData({
          recommendLength: true
        })
      } else {
        this.setData({
          recommendLength: false
        })
      }
      this.setData({
        recommendsell: res.data,
        paging: this.data.paging,
        showRecommd: this.data.shows,
        pageModel: res.pageModel
      })
      if (res.pageModel.pageNumber < res.pageModel.totalPages) {
        this.setData({
          recommendsellTips: '加载更多'
        })
      } else {
        this.setData({
          recommendsellTips: ''
        })
      }
    }).listT({
      id: app.globalData.tenantId,
      pageSize: 10,
      tagIds: 5
    })

    //广告位(故事下)
    // new Ad(res => {
    //   this.setData({
    //     storyAdImgs: res.data
    //   })
    // }).doT(211, app.globalData.tenantId)

    //广告位(促销)
    new Ad(res => {
      var len = res.data.length
      if (len == 0) {
        this.data.shows = false
      } else {
        this.data.shows = true
      }
      this.setData({
        promotionAdImgs: {
          data: res.data,
          key: 'image',
          show: this.data.shows
        }
      })
    }).doT(214, app.globalData.tenantId)

    // 广告位(新品)
    new Ad(res => {
      var len = res.data.length
      if (len == 0) {
        this.data.shows = false
      } else {
        this.data.shows = true
      }
      this.setData({
        newproductAdImgs: {
          data: res.data,
          key: 'image',
          show: this.data.shows
        }
      })
    }).doT(213, app.globalData.tenantId)

    //广告位(推荐)
    new Ad(res => {
      var len = res.data.length
      if (len == 0) {
        this.data.shows = true
      } else {
        this.data.shows = false
      }
      this.setData({
        recommendAdImgs: {
          data: res.data,
          key: 'image',
          show: this.data.shows
        }
      })
    }).doT(215, app.globalData.tenantId)


    //进店成为会员
    new Tenant(res => {

    }).becomeVip({
      id: app.globalData.tenantId,
      extension: wx.getStorageSync('extension')
    })





  },


  specialtoupper: function (e) {
    this.setData({
      scrollX: false
    })
    var tagIds = e.currentTarget.dataset.tagids;
    if (tagIds == '1') {
      this.setData({
        hotsellTipsLoad: true
      })
      var pageModel = this.data.paging.hotsell;
      var hotsell = this.data.hotsell;
      new Product((res) => {
        hotsell = hotsell.concat(res.data)
        this.setData({
          scrollX: true,
          hotsell: hotsell,
          hotsellTipsLoad: false
        });
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            hotsellTips: '',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    } else if (tagIds == '2') {
      this.setData({
        newsellTipsLoad: true
      })
      var pageModel = this.data.paging.newsell;
      var newsell = this.data.newsell;
      new Product((res) => {
        newsell = newsell.concat(res.data)
        this.setData({
          newsell: newsell,
          newsellTipsLoad: false
        })
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            newsellTips: '',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    } else if (tagIds == '5') {
      this.setData({
        recommendsellTipsLoad: true
      })
      var pageModel = this.data.paging.recommend;
      var recommendsell = this.data.recommendsell;


      // console.log(pageModel.pageSize)
      new Product((res) => {
        this.setData({
          scrollX: true
        })
        wx.hideToast()
        recommendsell = recommendsell.concat(res.data)
        console.log(pageModel.pageNumber)
        console.log(recommendsell.length)

        this.setData({
          recommendsell: recommendsell,
          recommendsellTipsLoad: false
        })
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            recommendsellTips: '没有更多啦~',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    }

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  // toLower: function () {
  //   var that = this;
  //   wx.showNavigationBarLoading();
  //   var pageModel = this.data.pageModel;
  //   var recommendsell = this.data.recommendsell;
  //   new Product(function (data) {
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     if (data.pageModel.totalPages < data.pageModel.pageNumber) {
  //       that.setData({
  //         tips: '',
  //         showtips: false
  //       })
  //     } else {
  //       recommendsell = recommendsell.concat(data.data)
  //       that.setData({
  //         recommendsell: recommendsell,
  //         loading: false,
  //         tips: '努力加载中',
  //         showtips: false
  //       })
  //     }
  //   }).listT({
  //     id: app.globalData.tenantId,
  //     pageNumber: ++pageModel.pageNumber,
  //     pageSize: 10,
  //     tagIds: 5
  //   })
  // },


  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var newPageModel = this.data.paging.newsell;
    var newsell = this.data.newsell;
    new Product(function (data) {
      wx.hideNavigationBarLoading() //完成停止加载
      if (data.pageModel.totalPages < data.pageModel.pageNumber) {
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        newsell = newsell.concat(data.data)
        that.setData({
          newsell: newsell,
          loading: false,
          tips: '努力加载中',
          showtips: false
        })
      }
    }).listT({
      id: app.globalData.tenantId,
      pageNumber: ++newPageModel.pageNumber,
      pageSize: 10,
      tagIds: 2
    })
  },





  //加载更多商品
  loadingMore: function (e) {
    var tagIds = e.currentTarget.dataset.tagids;
    if (tagIds == '1') {
      this.setData({
        hotsellTipsLoad: true
      })
      var pageModel = this.data.paging.hotsell;
      var hotsell = this.data.hotsell;
      new Product((res) => {
        hotsell = hotsell.concat(res.data)
        this.setData({
          hotsell: hotsell,
          hotsellTipsLoad: false
        });
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            hotsellTips: '',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    } else if (tagIds == '2') {
      this.setData({
        newsellTipsLoad: true
      })
      var pageModel = this.data.paging.newsell;
      var newsell = this.data.newsell;
      new Product((res) => {
        newsell = newsell.concat(res.data)
        this.setData({
          newsell: newsell,
          newsellTipsLoad: false
        })
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            newsellTips: '',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    } else if (tagIds == '5') {
      this.setData({
        recommendsellTipsLoad: true
      })
      var pageModel = this.data.paging.recommend;
      var recommendsell = this.data.recommendsell;
      new Product((res) => {
        recommendsell = recommendsell.concat(res.data)
        this.setData({
          recommendsell: recommendsell,
          recommendsellTipsLoad: false
        })
        if (res.pageModel.totalPages < res.pageModel.pageNumber) {
          this.setData({
            recommendsellTips: '没有更多啦~',
          })
        }
      }).listT({
        id: app.globalData.tenantId,
        pageSize: 10,
        tagIds: tagIds,
        pageNumber: ++pageModel.pageNumber
      })
    }

  },

  technical() {
    wx.navigateTo({
      url: '/pages/technical/technical',
    })
  },



  onPageScroll: function (e) { // 获取滚动条当前位置
    if (e.scrollTop > 150) {
      this.setData({
        toUpShow: true
      })
    } else {
      this.setData({
        toUpShow: false
      })
    }
  },
  scrollto() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // scroll({ detail }) {
  //   if (detail) {
  //     this.setData({
  //       toUpShow: detail.scrollTop > 150
  //     })
  //   }
  // },
  // scrollto(e) {
  //   let to = e.currentTarget.dataset.to
  //   this.setData({
  //     scrollTo: to
  //   })
  // },
  /**
   * 品牌故事跳转
   */
  storyView: function (e) {
    var that = this;
    new Tenant(function (data) {
      util.navigateTo({
        url: './article/article?id=' + that.data.storyId
      })
    }).article({
      id: app.globalData.tenantId
    })
  },
  /**
   * 领取优惠券
   */

  receiveCoupon: function (e) {

    let id = e.currentTarget.dataset.id
    var that = this;
    new Coupon(function (data) {
      new Coupon(function (data) {
        var item = [];
        var couponList = data.data
        that.setData({
          couponList: couponList
        });
      }).listT({
        tenantId: app.globalData.tenantId
      });

      wx.showToast({
        title: '领取成功',
        icon: 'success',
        duration: 2000
      })
    }).pickup({
      id: id
    })
  },
  // 搜索商品
  searchProduct: function (e) {
    util.navigateTo({
      url: './productList/productList?keyWord=' + e.detail.value + '&page=index'
    })
  },
  toList() {
    util.navigateTo({
      url: './productList/productList?keyWord=&page=index'
    })
  },
  adTap(e) {
    let linkid = e.currentTarget.dataset.linkid
    if (!linkid) return
    util.navigateTo({
      url: './productDetails/productDetails?id=' + linkid,
    })
    // wx.navigateToMiniProgram({
    //     appId: 'wx441dd0c007894173',
    //     path: 'pages/home/productDetails/productDetails?id=' + linkid + '&tenantId=' + app.globalData.tenantId,
    //     extraData: {},
    //     // envVersion: 'develop',
    //     success(res) {
    //         // 打开成功
    //         console.log(res)
    //     },
    //     fail: function (err) {
    //         console.log(err)
    //     }
    // })
  },

  //首页扫一扫进商品详情
  wxscan: function () {
    wx.scanCode({
      success: (res) => {
        util.navigateTo({
          url: '/pages/home/productDetails/productDetails?id=' + res.result,
        })
        // wx.navigateToMiniProgram({
        //     appId: 'wx441dd0c007894173',
        //     path: 'pages/home/productDetails/productDetails?id=' + res.result + '&tenantId=' + app.globalData.tenantId,
        //     extraData: {},
        //     // envVersion: 'develop',
        //     success(res) {
        //         // 打开成功
        //         console.log(res)
        //     },
        //     fail: function (err) {
        //         console.log(err)
        //     }
        // })
      }
    })
  },
  //分享
  onShareAppMessage: function (res) {
    // console.log(app.globalData.memberInfo.id)
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: that.data.tenantData.name,
      path: 'pages/home/home?extension=' + app.globalData.memberInfo.id + '&shelvesNo=' + wx.getStorageSync('shelvesNo'),
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
  },
  //跳转
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    util.navigateTo({
      url: '../home/productList/productList?page=cate&cateid=' + id,
    })
  },
  __pt_toDetail(e) {
    wx.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + e.currentTarget.dataset.id,
    })
  }
}))