//获取应用实例
var app = getApp()
var Order = require('../../../service/order')
var util = require('../../../utils/util')
var actionsheet = require('../../../template/actionsheet/actionsheet')
var payTemp = require("../../../template/password/payPassword")
var popup = require("../../../template/popup/popup")
var Balance = require("../../../service/balance")
var getPwd = require("../../../utils/getPassword")
var util = require("../../../utils/util")
var jumpPay = require("../../../template/jumpPay/jumpPay")

Page(Object.assign({}, actionsheet, payTemp, popup, jumpPay, {
  data: {
    winHeight: 0, //设备高度度
    all: [], //全部
    unpaid: [], //待支付
    unreciver: [], //待签收
    unreview: [], //待评价
    unshipped: [], //待发货
    currentTab: 0, //显示全部
    allTips: '下拉刷新',
    unpaidTips: '下拉刷新',
    unreciverTips: '下拉刷新',
    unreviewTips: '下拉刷新',
    unshippedTips: '下拉刷新',
    sType: ['all', 'unpaid', 'unshipped', 'unreciver', 'unreview'],
    scroll: [0, 0, 0, 0, 0]
  },
  technical: function() {
    wx.navigateTo({
      url: '/pages/technical/technical',
    })
  },
  bindChange: function(e) { //滑动选项卡
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  swichNav: function(e) { //点击选项卡
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  touchstart: function(e) {
    this.data.startTouches = e.changedTouches[0]
  },
  touchmove: function(e) {
    this.data.moveTouches = e.changedTouches[0]
  },
  touchend: function(e) {
    let index = this.data.currentTab,
      sTypeList = this.data.sType,
      startTouch = this.data.startTouches,
      Y = e.changedTouches[0].pageY - startTouch.pageY,
      X = Math.abs(e.changedTouches[0].pageX - startTouch.pageX)

    if (this.data.scroll[index] > 10) {
      return false
    }
    this.data.endTouches = e.changedTouches[0]
    if (Y > 50 && X < 200) {
      if (wx.startPullDownRefresh) {
        wx.startPullDownRefresh()
        paging(this, sTypeList[index], 'up', function() {
          wx.stopPullDownRefresh()
        })
      } else {
        wx.showLoading({
          title: '加载中...',
        })
        paging(this, sTypeList[index], 'up', function() {
          wx.hideLoading()
        })
      }
    }
  },
  onPullDownRefresh() {
    let index = this.data.currentTab,
      sTypeList = this.data.sType
    paging(this, sTypeList[index], 'up', function() {
      wx.stopPullDownRefresh()
    })
  },
  scroll: function(e) {
    let index = this.data.currentTab
    this.data.scroll[index] = e.detail.scrollTop
  },
  lower: function() {
    var index = this.data.currentTab
    var sTypeList = this.data.sType
    paging(this, sTypeList[index], 'down')
  },
  onLoad: function(options) { //页面加载
    var that = this;
    var id = options.id ? options.id : 0
    var systemInfo = wx.getSystemInfoSync()
    this.ActionsheetSet({
      item: [{
          name: '支付类型',
          content: '转账',
          more: false,
          fn: '',
          index: 0,
          data: null
        },
        {
          name: '付款方式',
          content: '微信支付',
          more: true,
          fn: 'changeMethod',
          index: 1,
          data: null
        }
      ]
    })

    this.PayTempSet({
      iconFn: 'returnChangeMethod'
    })
    this.setData({
      currentTab: id,
      winHeight: systemInfo.windowHeight
    })
  },
  onShow() {
    var that = this
    var id = that.data.currentTab
    paging(that, that.data.sType[id], 'up', function() {
      for (var i = 0; i < that.data.sType.length; i++) {
        if (i == id) {
          continue
        }
        paging(that, that.data.sType[i], 'up')
      }
    })
  },
  PayTempSuccess(val) {
    var that = this
    var sTypeList = this.data.sType
    var index = this.data.currentTab
    var sn = this.ActionsheetGetItem(1).sn
    wx.showToast({
      title: '支付请求中',
      icon: 'loading',
      mask: true,
      duration: 50000
    })
    getPwd(val, function(pwd) {
      new Order(function(data) {
        wx.showToast({
          title: data.message.content,
          icon: 'success'
        })
        setTimeout(() => {
          util.navigateTo({
            url: '/pages/pay/success?sn=' + sn
          })
        }, 500)
        paging(that, sTypeList[index], 'up')
        that.PayTempClose()
      }, function() {
        that.PayTempClear()
      }).paymentSubmit({
        paymentPluginId: 'balancePayPlugin',
        enPassword: pwd,
        sn: sn
      })
    })
  },
  returnChangeMethod() {
    this.PayTempClose()
    this.ActionsheetShow()
  },
  changeMethod() { //修改支付方式
    var data = ['微信支付', '余额支付'],
      that = this
    wx.showActionSheet({
      itemList: data,
      success: function(res) {
        if (typeof res.tapIndex !== 'undefined') {
          that.ActionsheetSetItem({
            fn: 'changeMethod',
            content: data[res.tapIndex],
            more: true,
            data: {
              type: res.tapIndex == 0 ? 'weixinPayPlugin' : 'balancePayPlugin',
              sn: that.ActionsheetGetItem(1).sn
            }
          }, 1)
        }
      },
      fail: function(res) {
        that.ActionsheetSetItem({
          content: data[0]
        }, 1)
      }
    })
  },
  weixinPayCanClick: true,
  actionsheetConfirm(e) { //弹框确定
    var selectData = this.ActionsheetGetItem(1)
    var that = this
    var sTypeList = this.data.sType
    var index = this.data.currentTab
    if (selectData.type == 'weixinPayPlugin') {
      if (!this.weixinPayCanClick) {
        return
      }
      that.weixinPayCanClick = false
      new Order(function(data) {

        wx.requestPayment({
          'timeStamp': data.data.timeStamp,
          'nonceStr': data.data.nonceStr,
          'package': data.data.package,
          'signType': data.data.signType,
          'paySign': data.data.paySign,
          'success': function(res) {
            that.weixinPayCanClick = true
            paging(that, sTypeList[index], 'up')
            that.ActionsheetHide()
          },
          'fail': function(res) {
            that.weixinPayCanClick = true

          },
          'complete': function() {
            that.weixinPayCanClick = true
          }
        })
      }).paymentSubmit({
        paymentPluginId: 'weixinPayPlugin',
        sn: selectData.sn
      })
      return
    }
    this.ActionsheetHide()
    this.PayTempShow()
  },

  //用于表单提交模板推送
  formSubmit(e) {

    var formId = e.detail.formId;
    var info = e.detail.target.dataset.info
    var sTypeList = this.data.sType
    var index = this.data.currentTab
    var that = this
    wx.showToast({
      title: '信息获取中',
      icon: 'loading',
      duration: 50000
    })
    new Order((a) => {
      // new Order((data) => {
      //   wx.hideToast()
      //   that.ActionsheetSet({ "header": "￥" + data.data.amount.toFixed(2) })
      //   that.ActionsheetSetItem({ content: data.data.memo }, 0)
      //   that.ActionsheetSetItem({
      //     fn: data.data.useBalance ? 'changeMethod' : '',
      //     content: '微信支付',
      //     more: data.data.useBalance,
      //     data: {
      //       type: 'weixinPayPlugin',
      //       sn: res.data
      //     }
      //   }, 1)
      //   that.ActionsheetShow()
      // }).paymentView({
      //   sn: res.data
      // })
      new Order(function(res) {
        wx.hideToast()
        that.jumpPayShow()
        that.setData({
          jumpPay_path: 'pages/pay/payjump?sn=' + a.data + '&tenantId=' + app.globalData.tenantId,
          jumpPay_amount: res.data.amount,
          jumpPay_type: res.data.memo,
          jumpPay_closeUrl: '/pages/member/order/order?id=0'
        })
      }).paymentView({
        sn: a.data
      })


    }).tradePayment({
      id: info,
      formId: formId
    })
  },

  //分享
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '分享红包给好友',
        imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513153921871&di=a0573973131999f9028fe2d629bb6fbc&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150801%2Fmp25280062_1438402600048_1.png',
        path: 'pages/member/share/share?&id=' + that.data.couponId + '&username=' + that.data.username,
        success: function(res) {
          // 转发成功
          wx.showToast({
            title: '转发成功',
            icon: 'success'
          })
          // that.popupHidden()
        },
        fail: function(res) {
          // 转发失败
        }
      }
    }
    return {
      title: '分享',
      path: 'pages/home/home?&extension=' + app.globalData.memberInfo.id,
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
  },

  methodBtn(e) {
    var info = e.currentTarget.dataset.info
    var opType = e.currentTarget.dataset.type
    var sTypeList = this.data.sType
    var index = this.data.currentTab
    var that = this
    if (!opType) return
    switch (opType) {
      case 'refund': //取消订单
        wx.showModal({
          title: '提示',
          content: '是否确认取消该订单',
          success: function(res) {
            if (res.confirm) {
              new Order((data) => {
                wx.showToast({
                  title: data.message.content,
                  icon: 'success',
                  duration: 1000
                })
                paging(that, sTypeList[index], 'up')
              }).refund({
                id: info
              })
            } else if (res.cancel) {

            }
          }
        })
        break;
      case 'return': //退货
        wx.showModal({
          title: '提示',
          content: '是否确认申请退货',
          success: function(res) {
            if (res.confirm) {
              new Order((data) => {
                wx.showToast({
                  title: data.message.content,
                  icon: 'success',
                  duration: 1000
                })
                paging(that, sTypeList[index], 'up')
              }).return({
                id: info
              })
            } else if (res.cancel) {

            }
          }
        })
        break;
      case 'confirm': //签收

        wx.showModal({
          title: '提示',
          content: '是否确认收货',
          success: function(res) {
            if (res.confirm) {
              new Order((data) => {
                wx.showToast({
                  title: data.message.content,
                  icon: 'success',
                  duration: 1000
                })
                if (data.data.canShare) {
                  that.popupShow()
                  that.setData({
                    couponId: data.data.couponId,
                    username: data.data.username
                  })
                }
                paging(that, sTypeList[index], 'up')
              }).confirm({
                id: info
              })
            } else if (res.cancel) {

            }
          }
        })
        break;
      case 'remind': //提醒卖家发货/退货
        new Order((data) => {
          wx.showToast({
            title: data.message.content,
            icon: 'success',
            duration: 1000
          })
        }).remind({
          id: info
        })
        break;
      case 'evaluate': // 前去评价
        util.navigateTo({
          url: 'orderEvaluate/orderEvaluate?id=' + info,
        })
        break;
      case 'waitpay': //付款
        wx.showToast({
          title: '信息获取中',
          icon: 'loading',
          duration: 50000
        })
        new Order((res) => {
          // new Order((data) => {
          //   wx.hideToast()
          //   that.ActionsheetSet({ "header": "￥" + data.data.amount.toFixed(2) })
          //   that.ActionsheetSetItem({ content: data.data.memo }, 0)
          //   that.ActionsheetSetItem({
          //     fn: data.data.useBalance ? 'changeMethod' : '',
          //     content: '微信支付',
          //     more: data.data.useBalance,
          //     data: {
          //       type: 'weixinPayPlugin',
          //       sn: res.data
          //     }
          //   }, 1)
          //   that.ActionsheetShow()
          // }).paymentView({
          //   sn: res.data
          // })

          wx.redirectTo({
            url: '/pages/member/order/order?id=0',
          })
          wx.navigateToMiniProgram({
            appId: 'wx441dd0c007894173',
            path: 'pages/pay/payjump?sn=' + res.data,
            extraData: {},
            // envVersion: 'develop',
            success(res) {
              // 打开成功
              console.log(res);

            },
            fail: function(err) {
              console.log(err)
            }
          })

        }).tradePayment({
          id: info
        })
        break;
      case 'logistics':
        util.navigateTo({
          url: '/pages/member/order/logistics/logistics?no=' + info,
        })
        break;
    }
  },
  pageModel: {
    'all': {
      pageNumber: 0,
      pageSize: 5,
      totalPages: 999
    },
    'unpaid': {
      pageNumber: 0,
      pageSize: 5,
      totalPages: 999
    },
    'unshipped': {
      pageNumber: 0,
      pageSize: 5,
      totalPages: 999
    },
    'unreciver': {
      pageNumber: 0,
      pageSize: 5,
      totalPages: 999
    },
    'unreview': {
      pageNumber: 0,
      pageSize: 5,
      totalPages: 999
    }
  }
}))

function paging(that, sType, direction, cb) {
  var tips = that.data[sType + 'Tips']
  var info = that.data[sType]
  if (direction == 'up') {
    info = []
  }
  if (direction !== 'up' && that.pageModel[sType].pageNumber + 1 > that.pageModel[sType].totalPages) {
    return
  }
  that.setData({
    [sType + 'Tips']: '加载中...'
  })
  new Order(function(data) {
    that.pageModel[sType].totalPages = data.pageModel.totalPages
    if (data.pageModel.totalPages == 0) {
      that.setData({
        [sType + 'Tips']: '您还没有相关的订单！',
        [sType]: []
      })
      cb ? cb() : ''
      return
    }
    info = info.concat(data.data)
    if (data.pageModel.totalPages <= data.pageModel.pageNumber) {
      that.setData({
        [sType + 'Tips']: '',
        [sType]: info
      })
      if (data.pageModel.totalPages < data.pageModel.pageNumber) {
        cb ? cb() : ''
        return
      }
    } else {
      that.setData({
        [sType + 'Tips']: "上拉加载",
        [sType]: info
      })
    }
    cb ? cb() : ''
  }).list({
    type: sType,
    pageNumber: direction == 'up' ? that.pageModel[sType].pageNumber = 1 : ++that.pageModel[sType].pageNumber,
    pageSize: that.pageModel[sType].pageSize,
    tenantId: app.globalData.tenantId
  })
}