let app = getApp();
let actionsheet = require("../../template/actionsheet/payactionsheet.js");
let util = require('../../utils/util.js');
let receiver = require('../../service/receiver.js');
let order = require('../../service/order.js');
let member = require('../../service/member.js');
let tenant = require('../../service/tenant.js');
let jumpPay = require("../../template/jumpPay/jumpPay")

Page(Object.assign({}, actionsheet, jumpPay, {

  /**
   * 页面的初始数据
   */
  data: {
    ifshowGuide: true,
    index: 0,
    express: false,
    since: true,
    freight: false,
    storeAdress: ['合肥市瑶海区', '合肥市庐阳区'],
    addressId: 0,
    showCouponSelect: false,
    selectCoupon: {
      name: '未使用',
      code: ''
    },
    memo: '',
    codes: [],
    addressIsGet: true,
    getAddressCount: 10,
    showMemo: true
  },

  //单选按钮选择配送方式
  radioChange: function(e) {
    var that = this;
    var shippingMethodId = this.data.objectshippingMethods[e.detail.value].id;
    var shippingMethodCode = this.data.objectshippingMethods[e.detail.value].method;
    //如果是到店提货，隐藏运费，显示选择提货地址
    if (shippingMethodCode == 'F2F') {
      this.setData({
        express: true,
        since: false,
        freight: true,
        showMemo: true
      })

      //获取所有门店列表，默认选择第一个门店
      new tenant(function(data) {

        that.setData({
          deliveryCenterList: data.data,
          deliveryCenterId: data.data[0].id
        })
      }).deliveryCenterList({
        id: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
      })
    } else if (shippingMethodCode == 'TPL') {
      this.setData({
        express: false,
        since: true,
        freight: false,
        showMemo: true
      })
    } else if (shippingMethodCode == 'PRIVY') {
      this.setData({
        express: true,
        since: true,
        freight: true,
        showMemo: false
      })
    }
    this.setData({
      index: e.detail.value,
      shippingMethodId: shippingMethodId,
      shippingMethodCode: shippingMethodCode
    })
    //调用价格计算
    this.calcu()
  },


  bindPickerChange: function(e) {

    var that = this;
    var shippingMethodId = this.data.objectshippingMethods[e.detail.value].id;
    var shippingMethodCode = this.data.objectshippingMethods[e.detail.value].method;
    //如果是到店提货，隐藏运费，显示选择提货地址
    if (shippingMethodCode == 'F2F') {
      this.setData({
        express: true,
        since: false,
        freight: true,
      })

      //获取所有门店列表，默认选择第一个门店
      new tenant(function(data) {

        that.setData({
          deliveryCenterList: data.data,
          deliveryCenterId: data.data[0].id
        })
      }).deliveryCenterList({
        id: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
      })
    } else if (shippingMethodCode == 'TPL') {
      this.setData({
        express: false,
        since: true,
        freight: false,
      })
    }
    this.setData({
      index: e.detail.value,
      shippingMethodId: shippingMethodId,
      shippingMethodCode: shippingMethodCode
    })
    //调用价格计算
    this.calcu()
  },




  //选择提货地址
  storeAdressChange: function(e) {
    var deliveryCenterId = this.data.deliveryCenterList[e.detail.value].id;
    this.setData({
      addressId: e.detail.value
    })
  },

  //选择服务导购
  guideChange: function(e) {
    var extensionId = this.data.guideList[e.detail.value].id;
    this.setData({
      guideId: e.detail.value,
      extensionId: extensionId
    })
  },

  //收货地址
  chooseAddress: function() {
    var that = this;
    try {
      wx.chooseAddress({
        success: function(res) {
          //获取国家地址码
          new receiver(function(data) {

            //保存地址
            new receiver(function(sd) {
              console.log(sd)
              that.getAddress()
            }).save({
              areaId: data.data,
              consignee: res.userName,
              address: res.detailInfo,
              phone: res.telNumber
            })
          }).getAreaId({
            code: res.nationalCode
          })
        },
        fail: function(err) {

          if (err.errMsg.indexOf('auth deny') > -1) {
            wx.showModal({
              title: '提示',
              content: '未授予地址权限，是否前往设置',
              success: function(res) {
                if (res.confirm) {
                  wx.openSetting()
                }
              }
            })
          }
        }
      })
    } catch (e) {
      util.errShow('微信版本过低')
    }
  },


  validatemobile: function(mobile) {

    this.setData({
      phone: mobile.detail.value
    })
    if (mobile.detail.value.length == 0) {
      util.errShow('手机号有误');
    }
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (mobile.detail.value.length != 11 || !myreg.test(mobile.detail.value)) {
      util.errShow('手机号有误');
      return false;
    }


    return true;
  },

  //输入提货人姓名
  f2fName: function(e) {
    this.setData({
      f2fName: e.detail.value
    })
  },


  onLoad: function(options) {
    if (options.shelvesNo) {
      this.setData({
        shelvesNo: options.shelvesNo,
        express: true,
        since: true,
        freight: true,
        showMemo: false,
        isSelfGet: true
      })
    }
    var that = this;
    if (options.payType) {
      this.data.isSelfGet = true
      this.setData({
        isSelfGet: this.data.isSelfGet,
        express: true,
        since: true,
        freight: true
      })
    }

    //存储分享者Id
    if (wx.getStorageSync('extension')) {
      that.setData({
        extensionId: wx.getStorageSync('extension')
      })
    }
    this.getAddress();
  },

  getAddress(fn) {
    var that = this
    this.data.addressIsGet = false
    new order(function(data) {
      that.data.addressIsGet = true
      //存储默认在线付款的支付方式id
      for (var i = 0; i < data.data.paymentMethods.length; i++) {
        //'online'为在线付款  'offline'为线下付款
        if (data.data.paymentMethods[i].method == 'online') {
          that.setData({
            paymentMethodId: data.data.paymentMethods[i].id
          })
        }
      }
      //存储默认配送方式为同城快递的id
      for (var i = 0; i < data.data.shippingMethods.length; i++) {
        //'TPL'为同城快递  'F2F'到店提货
        if (that.data.isSelfGet && data.data.shippingMethods[i].method == 'PRIVY') {
          that.setData({
            shippingMethodId: data.data.shippingMethods[i].id,
            shippingMethodCode: data.data.shippingMethods[i].method
          })
          break
        } else if (data.data.shippingMethods[i].method == 'TPL') {
          that.setData({
            shippingMethodId: data.data.shippingMethods[i].id,
            shippingMethodCode: data.data.shippingMethods[i].method
          })
        }
      }
      var availableCoupons = data.data.order.trades[0].availableCoupons,
        code = availableCoupons.length > 0 ? availableCoupons[0].code : '',
        codeName = availableCoupons.length > 0 ? availableCoupons[0].title : '未使用'
      that.setData({
        receiver: data.data.receiver,
        objectshippingMethods: data.data.shippingMethods,
        order: data.data.order,
        amount: data.data.order.amount,
        discount: data.data.order.discount,
        receiverId: data.data.receiver ? data.data.receiver.id : '',
        phone: data.data.receiver ? data.data.receiver.phone : '',
        f2fName: data.data.receiver ? data.data.receiver.consignee : '',
        codes: code,
        selectCoupon: {
          code: code,
          name: codeName
        }
      })
      that.calcu()
    }).confirmOrder({
      shelvesNo: that.data.shelvesNo ? that.data.shelvesNo : '',
      cartType: 'mall',
    })

    //获取货架员工列表
    if (wx.getStorageSync('shelvesNo')) {
      if (wx.getStorageSync('extension')) {
        that.setData({
          ifshowGuide: true
        })
        return
      }
      new member(function(data) {
        if (data.data.length > 0) {
          that.setData({
            ifshowGuide: false
          })
        }
        that.setData({
          guideList: data.data
        })
      }).employeeShelves({
        shelvesNo: wx.getStorageSync('shelvesNo')
      })
    }



  },

  //计算价格方法
  calcu: function() {
    var that = this;
    new order(function(data) {

      that.setData({
        calcuPrice: data.data.trades,
        amount: data.data.amountPayable,
        discount: data.data.discount
      })
    }).calculate({
      paymentMethodId: that.data.paymentMethodId,
      shippingMethodId: that.data.shippingMethodId,
      codes: that.data.codes,
      receiverId: that.data.receiver.id
    })
  },
  //显示
  toogleCouponSelect() {
    this.setData({
      showCouponSelect: !this.data.showCouponSelect
    })
  },
  //选择优惠券
  selectCoupon(e) {
    let code = e.currentTarget.dataset.code,
      name = e.currentTarget.dataset.name,
      codes = [];
    codes.push(code);
    this.setData({
      selectCoupon: {
        code: code ? code : '',
        name: name ? name : (code ? '已使用' : '未使用')
      },
      showCouponSelect: false,
      codes: codes
    })
    this.calcu()
  },

  //买家留言
  inputMemo: function(e) {
    this.setData({
      memo: e.detail.value
    })
  },

  //确认下单提交
  formSubmit: function(e) {
    var formId = e.detail.formId;
    var that = this;
    that.ActionsheetShow(Object.assign({}, {
      closeJump: '/pages/member/order/order?id=1',
      successJump: '/pages/pay/success'
    }))
  }
}))