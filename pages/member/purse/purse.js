let app = getApp();
let member = require('../../../service/member.js')
let balance = require('../../..//service/balance.js')
let util = require('../../../utils/util.js')
let config = require('../../../utils/config.js')


Page({
  data: {
    balance: 0.00,
    freezeBalance: 0.00
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    new balance(function (data) {
      that.setData({
        balance: data.data.balance,
        freezeBalance: data.data.freezeBalance,
        withdrawBalance: data.data.withdrawBalance
      })
    }).balance()
  },

  //充值
  charge: function () {
    util.navigateTo({
      url: 'charge/charge',
    })
  },

  //提现
  cash: function () {
    util.navigateTo({
      url: 'cash/cash',
    })
  },
  //银行卡
  toBankList: function () {
    util.navigateTo({
      url: 'bankList/bankList',
    })
  },
  //账单
  toBill: function () {
    util.navigateTo({
      url: 'bill/bill',
    })
  }
});
