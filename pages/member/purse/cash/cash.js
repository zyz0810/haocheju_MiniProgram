let app = getApp(),
  util = require('../../../../utils/util.js'),
  getPwd = require('../../../../utils/getPassword.js'),
  countdown = require("../../../../utils/util.js").countdown,
  member = require('../../../../service/member.js'),
  balance = require('../../../../service/balance.js'),
  config = require('../../../../utils/config.js'),
  payTemp = require("../../../../template/password/payPassword"),
  timer = null

Page(Object.assign({}, payTemp, {
  data: {
    currentTab: 0,
    cash: 0,//可提现金额
    fee: 0,//手续费
    feeBank: 0,
    trueAmountBank: 0,
    trueAmount: 0,//实际到账
    inputAmount: '',//输入金额
    mybank: [],//银行卡数据
    bankitemindex: 0,//选中银行卡index
    formContent: {},
    cardNum: 0,
    load: {
      bankload: 0,
      weixinload: 0
    },
    payInputEvent: "bindCashBank"
  },
  bindChange: function (e) {
    var that = this;
    this.data.currentTab = e.detail.current
    this.setData({ currentTab: e.detail.current })
    if (this.data.eventClick) {
      this.data.eventClick = false
      return
    }
    this.swichNav(e.detail.current, 1)
  },
  swichNav: function (e, t) {
    if (!t) this.data.eventClick = true
    var current = t ? e : e && e.currentTarget.dataset.current
    if (current == 1 && !this.data.mybank.length > 0) {
      wx.hideToast()
      wx.showModal({
        title: '提示',
        content: '请先绑定银行卡',
        cancelText: '不了',
        confirmText: '前去绑定',
        success: function (res) {
          if (res.confirm) {
            util.navigateTo({
              url: '../../bank/bank',
              success() {
                that.setData({
                  currentTab: 0
                })
              }
            })
          } else {
            that.setData({
              currentTab: 0
            })
          }
        }
      })
    }
    var that = this;
    if (this.data.currentTab === current) {
      return false;
    } else {
      that.setData({
        currentTab: current
      })
    }
  },
  onLoad: function () {
    var that = this;
    var sessionId = wx.getStorageSync('sessionId');
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
  },
  pwdInputTap() {
    var currentTab = this.data.currentTab
    if (currentTab == 1) {//银行卡
      if (parseFloat(this.data.inputMoneyBank) > parseFloat(this.data.cash)) {
        util.errShow('余额不足')
        return
      }
      if (parseFloat(this.data.inputMoneyBank) <= 0) {
        util.errShow('请输入正确金额')
        return
      }
      this.PayTempShow()
      this.PayTempSet({
        price: this.data.inputMoneyBank
      })
    }
    if (currentTab == 0) {//微信
      if (parseFloat(this.data.inputAmount) > parseFloat(this.data.cash)) {
        util.errShow('余额不足')
        return
      }
      if (parseFloat(this.data.inputAmount) < 2) {
        util.errShow("最少提现2元")
        return
      }
      this.PayTempShow()
      this.PayTempSet({
        price: this.data.inputAmount
      })
    }
  },
  PayTempSuccess(val) {
    var currentTab = this.data.currentTab
    var that = this
    switch (currentTab) {
      case 1:
        wx.hideKeyboard();
        wx.showToast({
          title: '- 请求中 -',
          icon: 'loading',
          duration: 20000,
          mask: true
        })
        getPwd(val, function (pwd) {
          new balance(function (res) {
            wx.hideToast()
            var newCash = that.data.cash - that.data.inputMoneyBank;
            wx.showToast({
              title: res.message.content,
              icon: 'success',
              duration: 1000,
              mask: true,
            });
            that.PayTempClose()
            that.setData({
              cash: newCash,
              fee: 0,//手续费
              feeBank: 0,
              trueAmountBank: 0,
              trueAmount: 0,//实际到账
              inputMoneyBank: '',
              inputAmount: '',//输入金额
            })
            new balance((data) => {
              that.setData({
                cash: data.data.balance
              })
            }).balance()
          }, function (data) {
            that.PayTempClear()
          }).cashBank({
            memberBankId: that.data.mybank[that.data.bankitemindex].id,
            amount: that.data.inputMoneyBank,
            enPassword: pwd
          })
        })
        break
      case 0:
        wx.hideKeyboard();
        wx.showToast({
          title: '- 请求中 -',
          icon: 'loading',
          duration: 20000,
          mask: true
        })
        getPwd(val, function (pwd) {
          new balance(function (res) {
            var newCash = that.data.cash - that.data.inputAmount;
            wx.showToast({
              title: res.message.content,
              icon: 'success',
              duration: 1000,
              mask: true,
            });
            that.PayTempClose()
            that.setData({
              formContent: { password: '' },
              cash: newCash,
              fee: 0,//手续费
              feeBank: 0,
              trueAmountBank: 0,
              trueAmount: 0,//实际到账
              inputAmount: '',//输入金额
            })
            new balance((data) => {
              this.setData({
                cash: data.data.balance
              })
            }).balance()
          }, function () {
            that.PayTempClear()
          }).cashWeixin({
            amount: that.data.inputAmount,
            enPassword: pwd
          })
        })
        break
    }
  },
  onShow: function () {
    //读取我的银行卡列表
    var that = this;
    new member(function (data) {
      that.setData({
        mybank: data.data
      })
    }).bankList()
    new balance((data) => {
      this.setData({
        cash: data.data.balance
      })
    }).balance()
  },
  bindPickerChange: function (e) {
    var data = this.data.mybank
    this.setData({
      bankitemindex: e.detail.value,
      bankIdInit: data[e.detail.value].id
    })
  },

  //手续费计算
  calcfeeBank: function (e) {
    var that = this;
    var formContent = {};
    var inputMoneyBank = e.detail.value.trim();
    clearTimeout(timer)
    var load = this.data.load
    load.bankload = 1
    this.setData({
      load: load,
      inputMoneyBank: inputMoneyBank
    })
    timer = setTimeout(function () {
      new balance(function (res) {
        load.bankload = 0
        that.setData({
          load: load,
          feeBank: res.data,
          trueAmountBank: parseInt((inputMoneyBank - res.data) * 100) / 100
        })
      }).calcFee({ amount: inputMoneyBank ? inputMoneyBank : 0 })
    }, 500)

  },

  //计算提现手续费
  calcfee: function (e) {
    var that = this;
    var formContent = {};
    var inputMoney = e.detail.value.trim()
    var sessionId = wx.getStorageSync('sessionId');
    var load = this.data.load
    load.weixinload = 1
    this.setData({
      load: load,
      inputAmount: inputMoney
    })
    clearTimeout(timer)
    timer = setTimeout(function () {
      new balance(function (res) {
        load.weixinload = 0
        that.setData({
          load: load,
          fee: res.data,
          trueAmount: parseInt((inputMoney - res.data) * 100) / 100
        })
      }).calcFee({ amount: inputMoney ? inputMoney : 0 })
    }, 500)
  },
  losepwd: function () {
    util.navigateTo({
      url: '../../password/password?id=cash'
    })
  },
  //是否有银行卡绑定
  hasCard: function () {
    var that = this;
    util.navigateTo({
      url: '../../bank/bank'
    })
    this.setData({
      currentTab: 0
    })
  }

}))
