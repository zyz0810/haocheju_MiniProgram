let app = getApp()
let util = require('../../utils/util')
let config = require('../../utils/config')
let Product = require('../../service/product')
let tenant = require('../../service/tenant')
let order = require('../../service/order')
let CartShelves = require('../../service/cartShelves')
let coupon = require('../../service/coupon')

function throttle(fn, delay, mustRunDelay) {
  var timer = null;
  var t_start;
  return function () {
    var context = this,
      args = arguments,
      t_curr = +new Date();
    clearTimeout(timer);
    if (!t_start) {
      t_start = t_curr;
    }
    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args);
      t_start = t_curr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}

Page({
  data: {
    sys: app.globalData.sys,
    showModel: 'bigImage',
    winHeight: 0, //用于scroll-view高度
    bottomHeight: 60, //用于scroll-view高度，当显示bottom
    asAnimation: {}, //
    asMaskAnimation: {},
    dialogAnimation: {},
    dialogMaskAnimation: {},
    actionsheetShow: false,
    dialogShow: false,
    list: [], //商品列表
    listAll: [], //商品列表
    swiperCurrentIndex: 0, //swiper当前index
    //购物车
    cartList: [],
    cartListById: {},
    effectivePrice: 0, //已选价格
    btnDisable: {},
    hidePage: false,
    cartNum: 0,
    couponShow: false
  },
  asToggle() {
    // var asAnimation = wx.createAnimation({
    //     duration: 300,
    //     timingFunction: 'ease',
    // })
    // this.data.actionsheetShow ?
    //     asAnimation.bottom("-100%").step() :
    //     asAnimation.bottom(50).step()

    this.setData({
      // asAnimation: asAnimation.export(),
      actionsheetShow: !this.data.actionsheetShow
    })
  },
  dialogToggle() {
    // var animation = wx.createAnimation({
    //     duration: 300,
    //     timingFunction: 'ease',
    // })
    // this.data.dialogShow ?
    //     animation.left("100%").step()
    //     : animation.left(0).step()
    this.setData({
      // dialogAnimation: animation.export(),
      dialogShow: !this.data.dialogShow
    })
  },
  //滚动至
  scrollInto(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      scrollIntoId: `to${id}`,
      tagActiveId: id
    })
  },
  /**
   * swiper
   */
  //滚动显示active
  setActiveFloor: throttle(function () {
    const list = this.data.list
    const query = wx.createSelectorQuery()
    const scrollHeight = this.data.winHeight - this.data.bottomHeight - 60
    try {
      query.selectAll('.lineTitleSign').boundingClientRect((rect) => {
        if (rect.length === 0) return
        if (rect.length === 1) {
          this.setData({
            tagActiveId: rect[0].id
          })
          return
        }
        for (let i = 0; i < rect.length - 1; i++) {
          if (rect[i].top < 0 && rect[i + 1].top > 0 && rect[i + 1].top < this.data.winHeight / 2) {
            this.setData({
              tagActiveId: rect[i + 1].id
            })
            return
          }
          if (rect[i].top < 0 && rect[i + 1].top > 0 && rect[i + 1].top > this.data.winHeight / 2) {
            this.setData({
              tagActiveId: rect[i].id
            })
            return
          }
        }
        if (rect[rect.length - 1].bottom < this.data.winHeight / 2) {
          this.setData({
            tagActiveId: rect[rect.length - 1].id
          })
          return
        }
        this.setData({
          tagActiveId: rect[0].id
        })
      }).exec()
    } catch (error) {
      console.log(error)
    }
  }, 30, 50),
  swiperChange(e) {
    this.setData({
      swiperCurrentIndex: e.detail.current
    })
  },
  //swiper control
  swiperControl(e) {
    const direction = e.currentTarget.dataset.direction
    const swiperCurrentIndex = this.data.swiperCurrentIndex
    this.setData({
      swiperCurrentIndex: direction === 'left' ?
        (swiperCurrentIndex == 0 ? this.data.listAll.length - 1 : swiperCurrentIndex - 1) :
        (swiperCurrentIndex == this.data.listAll.length - 1 ? 0 : swiperCurrentIndex + 1)
    })
  },
  //swiper
  showSwiper(e) {
    const {
      id,
      tagname
    } = e.currentTarget.dataset
    const listAll = this.data.listAll
    for (let i = 0, j = listAll.length; i < j; i++) {
      if (listAll[i].id == id && listAll[i].tagName == tagname) {
        this.setData({
          swiperCurrentIndex: i
        })
        break
      }
    }
    this.dialogToggle()
  },

  //跳转商品详情
  goProductDetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + id + '&shelvesNo=' + that.data.shelvesNo,
    })
  },


  //取消优惠券
  cancelCoupon: function (e) {
    this.setData({
      couponShow: false
    })
  },

  //领取优惠券
  reviceCoupon: function (e) {
    var id = e.currentTarget.dataset.id
    new coupon((res) => {
      wx.showToast({
        title: '领取成功',
        duration: 1000
      })

      //加载优惠券
      new coupon(data => {
        var item = [];
        var couponList = data.data
        this.setData({
          couponList: couponList
        });
      }).listT({
        tenantId: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
      });


    }).pickup({
      id: id
    })
  },

  //前往我的券包
  myCoupon: function (e) {
    util.navigateTo({
      url: '/pages/member/coupon/list',
    })
  },


  //收藏商品
  favorite: function (e) {
    var id = e.currentTarget.dataset.id
    var hasFavorite = e.currentTarget.dataset.status
    const setFavorite = bool => {
      this.data.list.forEach(v => {
        v.productListModels && v.productListModels.length > 0 && v.productListModels.forEach(vc => {
          if (vc.id === id) {
            vc.hasFavorite = bool
          }
        })
      })
      this.setData({
        list: this.data.list
      })
    }
    if (hasFavorite) {
      new Product((res) => {
        wx.showToast({
          title: '取消成功',
          duration: 1000
        })
        setFavorite(false)
      }).delFavorite({
        id: id
      })
    } else {
      new Product((res) => {
        wx.showToast({
          title: '收藏成功',
          duration: 1000
        })
        setFavorite(true)
      }).favorite({
        id: id
      })
    }
  },

  /**
   * cart
   */
  //获取购物车列表并设值
  getCartList() {
    return new Promise((resolve, reject) => {
      //购物车列表
      new CartShelves(res => {
        this.data.cartListById = {}
        let cartNum = 0
        res.data.cartItems && res.data.cartItems.length > 0 && res.data.cartItems.forEach(item => {
          this.data.cartListById[item.productId] = item
          cartNum += item.quantity
        })
        this.setData({
          cartListById: this.data.cartListById,
          cartList: res.data.cartItems || [],
          effectivePrice: res.data.effectivePrice && res.data.effectivePrice.toFixed(2),
          cartId: res.data.id,
          cartNum
        })
        resolve && resolve(res.data)
      }, err => {
        reject && reject(err)
      }).list({
        tenantId: this.data.tenantId,
        shelvesNo: this.data.shelvesNo,
        cartType: 'shelves'
      })
    })
  },
  //编辑购物车
  editCart(id, cartItemId, quantity) {
    return new Promise((resolve, reject) => {
      new CartShelves(res => {
        this.data.cartListById[id].quantity = quantity
        this.setData({
          cartListById: this.data.cartListById,
          effectivePrice: res.data.effectivePrice.toFixed(2)
        })
        resolve(res)
      }, err => {
        reject && reject(err)
      }).edit({
        id: cartItemId,
        quantity,
        shelvesNo: this.data.shelvesNo,
        cartType: 'shelves'
      })
    })
  },
  //添加购物车
  addCart(id, quantity) {
    return new Promise((resolve, reject) => {
      new CartShelves(res => {
        this.getCartList().then(() => {
          resolve && resolve(res)
        })
      }, (err) => {
        reject && reject(err)
      }).add({
        'type': 'buy',
        'quantity': quantity || 1,
        id,
        shelvesNo: this.data.shelvesNo,
        cartType: 'shelves'
      })
    })
  },
  //删除购物车
  delCart(id) {
    return new Promise((resolve, reject) => {
      new CartShelves(res => {
        this.getCartList().then(() => {
          resolve && resolve(res)
          if (this.data.actionsheetShow && Object.keys(this.data.cartListById).length === 0) {
            this.asToggle()
          }
        })
      }, err => {
        reject && reject(err)
      }).delete({
        ids: [id],
        shelvesNo: this.data.shelvesNo,
        cartType: 'shelves'
      })
    })
  },
  //清空购物车
  clearCart() {
    wx.showModal({
      title: '提示',
      content: '是否确认清空购物车',
      success: res => {
        if (res.confirm) {
          new CartShelves(res => {
            this.getCartList().then(() => {
              this.data.actionsheetShow && this.asToggle()
            })
          }).clear({
            shelvesNo: this.data.shelvesNo,
            cartType: 'shelves'
          })
        }
      }
    })
  },
  //edit事件
  editCartFn(e) {
    const {
      id,
      utype
    } = e.currentTarget.dataset
    const cartListById = this.data.cartListById
    let quantity = -1,
      cartItemId
    //按钮多击禁止
    if (this.data.btnDisable[id]) return
    this.data.btnDisable[id] = true

    if (this.data.cartListById[id] && this.data.cartListById[id].id) {
      quantity = parseInt(cartListById[id].quantity)
      cartItemId = cartListById[id].id
    } else {
      this.data.cartListById[id] = {
        quantity: 0
      }
    }
    switch (utype) {
      case 'add':
        if (quantity === -1) {
          this.addCart(id).then(res => {
            this.data.btnDisable[id] = false
          }, err => {
            this.data.btnDisable[id] = false
            delete this.data.cartListById[id]
          })
        } else {
          this.editCart(id, cartItemId, quantity + 1).then(res => {
            this.data.btnDisable[id] = false
            this.setData({
              cartNum: this.data.cartNum + 1
            })
          }, err => {
            this.data.btnDisable[id] = false
          })
        }
        break
      case 'reduce':
        if (quantity === -1 || quantity - 1 === -1) {
          this.data.btnDisable[id] = false
          return false
        } else if (quantity - 1 === 0) {
          this.delCart(cartItemId).then(res => {
            this.data.btnDisable[id] = false
            this.setData({
              cartNum: this.data.cartNum - 1
            })
          }, err => {
            this.data.btnDisable[id] = false
          })
        } else {
          this.editCart(id, cartItemId, quantity - 1).then(res => {
            this.data.btnDisable[id] = false
            this.setData({
              cartNum: this.data.cartNum - 1
            })
          }, err => {
            this.data.btnDisable[id] = false
          })
        }
        break
      default:
        this.data.btnDisable[id] = false
    }
  },
  //切换购物车列表
  cartListToggle() {
    if (Object.keys(this.data.cartListById).length === 0) return
    if (this.data.actionsheetShow) {
      this.asToggle()
    } else {
      this.getCartList().then(res => {
        this.asToggle()
      })
    }
  },

  //去商城
  goStoreIndex: function () {
    util.navigateTo({
      url: '/pages/home/index',
    })
  },

  //确认购买
  orderCreat: function () {
    if (!this.data.actionsheetShow) {
      this.asToggle()
      return
    }
    util.navigateTo({
      url: './pay/pay?shelvesNo=' + this.data.shelvesNo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene) {
      var scene = decodeURIComponent(options.scene);
      this.setData({
        scene: scene
      })
    }

  },
  loginSuccessCallback() {
    //判断货架商品模板
    new CartShelves(res => {
      if (res.data == 'smallImage') {
        this.setData({
          showModel: 'smallImage'
        })
      } else {
        this.setData({
          showModel: 'bigImage'
        })
      }
    }).productModel({
      shelvesNo: this.data.shelvesNo
    })


    //每次进来清空购物车
    new CartShelves(res => { }).clear({
      shelvesNo: this.data.shelvesNo,
      cartType: 'shelves'
    })

    //商品列表
    new Product(res => {
      let list = res.data,
        listAll = []
      for (let i = 0; i < list.length; i++) {
        listAll = listAll.concat(list[i].productListModels)
      }
      this.setData({
        list,
        listAll,
        tagActiveId: res.data.length > 0 && res.data[0].id
      }, this.setActiveFloor)
    }).shelvesList({
      shelvesNo: this.data.shelvesNo,
      cartType: 'shelves',
      tenantId: this.data.tenantId,
      appid: config.APPID
    })

    //修改页面title
    new tenant(data => {
      wx.setNavigationBarTitle({
        title: data.data.name
      })
    }).view({
      id: this.data.tenantId
    })

    //获取购物车
    this.getCartList().then(({
      storeName,
      address
    }) => {
      this.setData({
        storeName,
        address
      })
    })

    //是否显示优惠券
    new coupon(data => {
      this.setData({
        couponShow: data.data
      })

    }).tenantCoupon({
      tenantId: this.data.tenantId
    })

    //加载优惠券
    new coupon(data => {
      var item = [];
      var couponList = data.data
      this.setData({
        couponList: couponList
      });
    }).listT({
      tenantId: this.data.tenantId
    });


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //设置winheigh
    wx.getSystemInfo({
      success: res => {
        this.setData({
          winHeight: res.windowHeight
        })
      }
    })
  },

  goMember: function () {
    util.navigateTo({
      url: '/pages/shelf/member/member',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var scene = this.data.scene
    new Product(res => {
      wx.setStorageSync('tenantId', scene.split("#")[0])
      wx.setStorageSync('shelvesNo', res.data)
      wx.setStorageSync('extension', '')
      this.setData({
        tenantId: scene.split("#")[0],
        shelvesNo: res.data
      })
      if (app.globalData.LOGIN_STATUS) {
        this.loginSuccessCallback()
      } else {
        app.loginOkCallbackList.push(() => {
          this.loginSuccessCallback()
        })
      }
      this.getCartList().then(res => {
        if (!res.cartItems || res.cartItems.length === 0) {
          this.setData({
            actionsheetShow: false
          })
        }
      })
    }).getShelfNoByCode({
      id: scene.split("#")[1]
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   hidePage: true
    // })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //分享
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '好友给您的分享',
      path: 'pages/home/home?&extension=' + app.globalData.memberInfo.id + '&shelvesNo=' + wx.getStorageSync('shelvesNo'),
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
})