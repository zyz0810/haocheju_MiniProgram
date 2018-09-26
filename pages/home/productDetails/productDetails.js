let swiperAutoHeight = require("../../../template/swiperProduct/swiper.js"),
  Cart = require("../../../service/cart.js"),
  Product = require("../../../service/product.js"),
  member = require("../../../service/member.js"),
  WxParse = require('../../wxParse/wxParse.js'),
  app = getApp(),
  util = require("../../../utils/util.js"),
  config = require("../../../utils/config.js")


function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page(Object.assign({}, swiperAutoHeight, {

  onReady: function(res) {
    this.videoContext = wx.createVideoContext('myVideo')
    this.animation = wx.createAnimation()
  },
  inputValue: '',
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  /**
   * 页面的初始数据
   */
  data: {
    sys: app.globalData.sys, //系统信息
    productData: {}, //数据
    showAction: false, //显示弹窗
    buyType: 'buy', //buy or cart
    specification: {}, //商品规格
    canClick: [],
    selectArr: [],
    pageLoad: false, //页面加载完成
    videoShow: false,
    showShortcut: false,
    animation: '',
    canvasw: '',
    canvash: '',
    canvasHide: true
  },
  catchActionMask(e) {
    return false;
  },
  technical() {
    wx.navigateTo({
      url: '/pages/technical/technical',
    })
  },
  scroll(e) {
    this.setData({
      toUpShow: e.detail.scrollTop > 650
    })
  },
  scrollto(e) {
    let to = e.currentTarget.dataset.to
    this.setData({
      scrollIntoId: to
    })
  },

  //点击商品分享按钮，判断用户是否授权信息（获取用户微信头像、昵称）
  productShare(e) {
    let that = this
    //未授权
    if (e.detail.errMsg.indexOf('fail') > -1) {
      wx.showToast({
        title: '请授权用户信息!',
        icon: 'none'
      })
    } else {
      //授权成功，更新用户信息给后台
      new member(res => {
        const globalMemberInfo = getApp().globalData.memberInfo
        globalMemberInfo.username = e.detail.userInfo.nickName
        globalMemberInfo.userhead = e.detail.userInfo.avatarUrl
        wx.showLoading({
          title: '头像昵称获取中',
        })
        new member(res => {
          that.setData({
            nickName: res.data.nickName
          })
          wx.downloadFile({
            url: res.data.headImg,
            success: function(res) {
              that.setData({
                headImg: res.tempFilePath,
              })
              wx.hideLoading()
              //弹出
              that.animation.translate3d(0, 0, 0).step();
              that.setData({
                animation: that.animation.export(),
                showShortcut: false,
                showShareMenu: true
              })
            }
          })
        }).view()
      }).update({
        headImg: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
    }
  },
  /**
   * 保存分享事件
   */
  saveShare: function(e) {
    let that = this
    this.cancelShare();
    that.setData({
      canvasHide: false
    })
    wx.showLoading({
      title: '图片生成中',
      mask: true
    })
    var canvasBg = '/resources/images/product/canvasBg.jpg'
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          canvasw: res.windowWidth + 'px',
          canvash: res.windowHeight + 'px'
        })
        var w = res.windowWidth;
        var h = res.windowHeight;
        const ctx = wx.createCanvasContext('myCanvas')
        ctx.setFillStyle("#dcdcdc")
        ctx.fillRect(0, 0.1 * h, w, 0.80 * h)
        ctx.drawImage(canvasBg, 0, 0.1 * h, w, 0.8 * h) //背景图大
        ctx.save();
        ctx.beginPath()
        ctx.drawImage(that.data.picImg, 0.1 * w, 0.14 * h, 0.8 * w, 0.8 * w) //商品图
        //头像裁剪成圆形
        ctx.arc(0.1 * w + 0.1 * w / 2, 0.15 * h + 0.8 * w + 0.1 * w / 2, 0.1 * w / 2, 0, 2 * Math.PI);
        ctx.setStrokeStyle('#ffffff')
        ctx.clip();
        ctx.drawImage(that.data.headImg, 0.1 * w, 0.15 * h + 0.8 * w, 0.1 * w, 0.1 * w) //头像
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //canvas推荐人昵称头像填充
        ctx.setTextAlign('left')
        ctx.setFillStyle('rgb(156,156, 156)')
        ctx.setFontSize(16)
        ctx.fillText('    ' + that.data.nickName + '  为你推荐好物', 0.17 * w, 0.19 * h + 0.8 * w) //昵称
        ctx.setFillStyle('rgb(0,0, 0)')
        var productName = that.data.productData.name
        var chr = productName.split(""); //这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < 0.53 * w) {
            temp += chr[a];
          } else {
            temp += chr[a];
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);
        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
          var rowCut = row.slice(0, 2);
          var rowPart = rowCut[1];
          var test = "";
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < 0.53 * w) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          var group = empty[0] + "..." //这里只显示两行，超出的用...表示
          rowCut.splice(1, 1, group);
          row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
          ctx.fillText(row[b], 0.1 * w, 0.26 * h + 0.8 * w + b * 20, 0.53 * w) //商品名称
        }
        ctx.setFillStyle('rgb(255,68, 68)')
        ctx.setFontSize(14)
        ctx.fillText('￥', 0.1 * w, 0.35 * h + 0.8 * w, 0.53 * w) //商品现价
        ctx.setFontSize(26)
        ctx.fillText(that.data.productData.price, 0.13 * w, 0.35 * h + 0.8 * w, 0.53 * w) //商品现价

        ctx.setFillStyle('rgb(155,155, 155)')
        ctx.setFontSize(14)
        ctx.fillText('￥' + that.data.productData.marketPrice, 0.3 * w, 0.35 * h + 0.8 * w, 0.53 * w) //商品原价

        //价格下划线
        ctx.setLineWidth(1); //设置线条的宽度  
        ctx.setStrokeStyle('#9c9c9c'); //设置线条的样式  
        ctx.moveTo(0.3 * w, 0.34 * h + 0.8 * w); //设置线条的起始路径坐标  
        ctx.lineTo(0.45 * w, 0.34 * h + 0.8 * w); //设置线条的终点路径坐标
        ctx.stroke(); //对当前路径进行描边  
        ctx.closePath(); //关闭当前路径  

        //小程序二维码
        ctx.drawImage(that.data.qrcode, 0.65 * w, 0.21 * h + 0.8 * w, 0.24 * w, 0.24 * w)
        ctx.draw();
        setTimeout(function() {
          wx.canvasToTempFilePath({
            //通过id 指定是哪个canvas
            canvasId: 'myCanvas',
            success(res) {
              wx.hideLoading()
              that.setData({
                canvasHide: true
              })
              //成功之后保存到本地
              wx.previewImage({
                current: res.tempFilePath, // 当前显示图片的http链接
                urls: [res.tempFilePath], // 需要预览的图片http链接列表
                success: function() {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(res) {
                      wx.showToast({
                        title: '图片已保存相册',
                        icon: 'success',
                        duration: 2000
                      })
                    },
                    fail: function(res) {

                    }
                  })
                }
              })
            }
          })
        }, 500)
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },
  /**
   * 分享事件
   */
  share: function() {
    console.log(12121)
    //弹出
    this.animation.translate3d(0, 0, 0).step();
    this.setData({
      animation: this.animation.export(),
      showShortcut: false
    })
  },
  /**
   * 取消分享事件
   */
  cancelShare: function() {
    //收起
    this.animation.translate3d(0, 1000, 0).step();
    this.setData({
      animation: this.animation.export()
    })
  },

  onLoad: function(options) {
    if (app.globalData.LOGIN_STATUS) {
      this.getData(options)
    } else {
      app.loginOkCallbackList.push(() => {
        this.getData(options)
      })
    }
  },
  getData(options) {
    this.setData({
      mainColor: app.globalData.mainColor
    })
    let id;
    if (options.scene) {
      var scene = decodeURIComponent(options.scene);
      id = scene.split("#")[0];
      this.setData({
        showAction: true,
        selfGet: true,
        shelvesNo: scene.split("#")[1]
      })
      wx.setStorageSync('shelvesNo', scene.split("#")[1])
    } else {
      id = options.id;
      if (options.tenantId) {
        wx.setStorageSync('tenantId', options.tenantId)
        app.globalData.tenantId = options.tenantId
      }
      //有货架号和推广人id不显示货架自拿
      if (options.shelvesNo && options.extension) {
        wx.setStorageSync('shelvesNo', options.shelvesNo)
        this.setData({
          shelvesNo: options.shelvesNo
        })
      } else if (options.shelvesNo && !options.extension) {
        wx.setStorageSync('shelvesNo', options.shelvesNo)
        this.setData({
          selfGet: true,
          shelvesNo: options.shelvesNo
        })
      }
    }
    let that = this;
    this.data.id = id;
    var extension = options.extension;
    if (extension) {
      wx.setStorageSync('extension', extension)
    }
    new Product((res) => {
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      let select = res.data.specification,
        all = res.data.specifications,
        selectList = res.data.productSpecifications,
        selectArr = []
      if (select.length == 1) {
        selectArr = [select[0].specificationValueId]
      } else if (select.length == 2) {
        selectArr = [select[0].specificationValueId, select[1].specificationValueId]
      }

      // var attributes = res.data.attributes;
      var introduction = res.data.introduction;
      var attributesList = res.data.attributes;
      this.setData({
        title: res.data.name,
        productData: res.data,
        selectArr: selectArr,
        specification: {
          select: res.data.specification,
          all: res.data.specifications,
          selectList: res.data.productSpecifications,
          // attributes: res.data.attributes,
        },
        introduction: res.data.introduction,
        videoCover: res.data.videoCover,
        videoUrl: res.data.videoUrl,
        attributesList: res.data.attributes
      })

      if (res.data.review && res.data.review.anonym) {
        this.setData({
          reviewName: res.data.review.nickName.replace(/^(.).*/, "$1***")
        })
      } else {
        this.setData({
          reviewName: res.data.review ? res.data.review.nickName : ''
        })
      }
      if (res.data.attributes.length < 1) {
        that.setData({
          showAttribute: false
        })
      } else {
        that.setData({
          showAttribute: true
        })
      }

      this.getSpecifications();
      // if (attributes.length != 0) {
      // WxParse.wxParse('attributes', 'html', attributes, that, 5);
      // }
      if (introduction != null) {
        WxParse.wxParse('introduction', 'html', introduction, that, 5);
      }
      setTimeout(res => {
        this.setData({
          pageLoad: true
        })
      }, 200)

      //小程序海报生成：提前下载指定分享海报图片或第一张主图base64地址，提高海报生成速度
      wx.downloadFile({
        url: res.data.poster ? res.data.poster.replace('http', 'https') : res.data.productImages[0].medium.replace('http', 'https'),
        success: function(res) {
          that.setData({
            picImg: res.tempFilePath
          })
        }
      })

      //小程序海报生成：提前下载商品分享小程序码的base64
      new Product((res) => {
        wx.downloadFile({
          url: res.data.replace('http', 'https'),
          success: function(res) {
            that.setData({
              qrcode: res.tempFilePath
            })
          }
        })
      }, function(err) {
        that.setData({
          canvasHide: true
        })
      }).code({
        productId: this.data.id,
        tenantId: this.data.productData.tenantId
      })
    }).view({
      id: id,
      appid: config.APPID,
      tenantId: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
    })

    new Product(function() {

    }).record({
      productId: id,
      visitType: 'weixin',
      machineType: 'mobile'
    })



    //小店推荐商品
    new Product((data) => {
      this.setData({
        tenantRecomList: data.data,
        pageModel: data.pageModel
      })
    }).recommend({
      id: this.data.id,
      pageNumber: 1,
      pageSize: 6
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (app.globalData.LOGIN_STATUS) {
      //更新购物车数量
      new Cart(function(data) {
        that.setData({
          cartCount: data.data
        })
      }).count({
        tenantId: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
      })
    } else {
      app.loginOkCallback = res => {
        //更新购物车数量
        new Cart(function(data) {
          that.setData({
            cartCount: data.data
          })
        }).count({
          tenantId: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
        })
      }
    }
  },
  //选择规格
  checkout(e) {
    let id = e.currentTarget.dataset.id,
      idx = e.currentTarget.dataset.idx,
      can = e.currentTarget.dataset.can
    if (!can) return
    if (id == this.data.selectArr[idx]) {
      this.data.selectArr[idx] = ''
    } else {
      this.data.selectArr[idx] = id
    }
    this.setData({
      selectArr: this.data.selectArr
    })
    this.getSpecifications()
  },
  revisenum(e) {
    let stype = e.currentTarget.dataset.type,
      min = this.data.selectData.minReserve,
      max = this.data.selectData.availableStock,
      quantity = parseInt(this.data.selectData.quantity)

    switch (stype) {
      case 'input':
        quantity = (!isNaN(e.detail.value) && e.detail.value >= min && e.detail.value <= max) ? e.detail.value : this.data.selectData.quantity
        break;
      case 'add':
        quantity = quantity + 1 <= max ? (quantity < min ? min : ++quantity) : max
        if (quantity == max) {
          wx.showToast({
            title: '已达最大库存',
          })
        }
        break;
      case 'reduce':
        quantity = quantity - 1 < min ? 0 : --quantity
        break;
    }
    this.data.selectData.quantity = quantity
    this.setData({
      selectData: this.data.selectData
    })
  },
  //可选组合判断并修改值
  getSpecifications() {
    let selectArr = this.data.selectArr,
      selectList = this.data.specification.selectList,
      canClick = {},
      selectData = {},
      len = selectArr.length
    if (len === 0) {
      selectData = this.data.specification.selectList[0]
      selectData.quantity = selectData.cartItemQuantity == 0 ? selectData.minReserve : selectData.cartItemQuantity
      this.setData({
        selectData: selectData
      })
    } else if (len === 1) {

      for (let i = 0, j = selectList.length; i < j; i++) {
        if (selectList[i].specifications[0].specificationValueId == selectArr[0]) {
          selectData = selectList[i]
          break
        }
      }
      selectData.quantity = selectData.cartItemQuantity == 0 ? selectData.minReserve : selectData.cartItemQuantity
      this.setData({
        selectData: selectData
      })
    } else if (len === 2) {
      selectArr.forEach((val, idx) => {
        selectList.forEach((vals, idxs) => {
          if (val == vals.specifications[idx].specificationValueId) {
            if (selectArr[1 - idx] == vals.specifications[1 - idx].specificationValueId) {
              selectData = vals
            }
            if (!canClick[val]) canClick[val] = []
            canClick[val].push(vals.specifications[1 - idx].specificationValueId)
          }
        })
      })
      this.data.canClick = canClick
      selectData.quantity = selectData.cartItemQuantity == 0 ? selectData.minReserve : selectData.cartItemQuantity
      this.data.selectData = selectData
      this.setData({
        canClick: this.data.canClick,
        selectData: this.data.selectData
      })
    }
  },
  //进入购物车
  toCart() {
    this.setData({
      showAction: false
    })
    util.navigateTo({
      url: '/pages/cart/index'
    })
  },
  //收藏
  favorite() {
    if (this.data.productData.hasFavorite) {
      new Product((res) => {
        this.data.productData.hasFavorite = false;
        wx.showToast({
          title: '取消成功',
          duration: 1000
        })
        this.setData({
          productData: this.data.productData
        })
      }).delFavorite({
        id: this.data.id
      })
    } else {
      new Product((res) => {
        this.data.productData.hasFavorite = true;
        wx.showToast({
          title: '收藏成功',
          duration: 1000
        })
        this.setData({
          productData: this.data.productData
        })
      }).favorite({
        id: this.data.id
      })
    }
  },
  //弹出框toggle

  toggleMask(e) {

    this.data._swiper.top.videoShow = !this.data.showAction;
    this.data._swiper.top.videoShow = true;

    this.setData({
      showAction: !this.data.showAction,
      buyType: e.currentTarget.dataset.type,
      _swiper: this.data._swiper
    })
  },
  // 评价
  ecaluate: function(e) {
    util.navigateTo({
      url: 'evaluate/evaluate?id=' + this.data.id
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var pageModel = this.data.pageModel;
    var tenantRecomList = this.data.tenantRecomList;
    new Product(function(data) {
      wx.hideNavigationBarLoading() //完成停止加载
      if (data.pageModel.totalPages < data.pageModel.pageNumber) {
        that.setData({
          tips: '没有更多啦~',
          showtips: false
        })
      } else {
        tenantRecomList = tenantRecomList.concat(data.data)
        that.setData({
          tenantRecomList: tenantRecomList,
          loading: false,
          tips: '努力加载中',
          showtips: false
        })
      }
    }).recommend({
      id: that.data.id,
      pageSize: 6,
      pageNumber: ++pageModel.pageNumber
    });
  },


  //加入购物车和立即购买确认按钮
  paySubmit: function() {
    let that = this;
    //立即购买
    for (var i = 0; i < this.data.selectArr.length; i++) {
      if (!this.data.selectArr[i]) {
        wx.showToast({
          title: '请选择' + that.data.specification.all[i].name,
          icon: 'none'
        })
        return false
      }
    }
    if (that.data.buyType == 'buy') {
      new Cart(function() {
        that.setData({
          showAction: false
        })
        if (that.data.selfGet) {
          util.navigateTo({
            url: '/pages/pay/pay?type=selfGet&shelvesNo=' + that.data.shelvesNo
          })
        } else {
          util.navigateTo({
            url: '/pages/pay/pay'
          })
        }

      }).add({
        id: that.data.selectData.id,
        quantity: that.data.selectData.quantity,
        type: 'buy'
      })
      //加入购物车
    } else if (that.data.buyType == 'cart') {
      new Cart(function() {
        that.setData({
          showAction: false
        })
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        //更新购物车数量
        new Cart(function(data) {
          that.setData({
            cartCount: data.data
          })
        }).count({
          tenantId: wx.getStorageSync('tenantId') ? wx.getStorageSync('tenantId') : app.globalData.tenantId
        })
      }).add({
        id: that.data.selectData.id,
        quantity: that.data.selectData.quantity
      })
    }
  },


  onShareAppMessage: function(res) {
    this.cancelShare()
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: that.data.title,
      path: 'pages/home/productDetails/productDetails?id=' + that.data.id + '&extension=' + app.globalData.memberInfo.id + '&shelvesNo=' + wx.getStorageSync('shelvesNo'),
      imageUrl: that.data.productData.productImages[0].medium,
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
  openShortcut() {
    this.setData({
      showShortcut: !this.data.showShortcut
    })
  },
  //快捷导航点击事件
  bindgetuserinfo: function(e) {
    let that = this
    console.log(e)
    if (e.detail.errMsg.indexOf('fail') > -1) {
      wx.showToast({
        title: '请授权用户信息!',
        icon: 'none'
      })
    } else {
      new member(res => {
        const globalMemberInfo = getApp().globalData.memberInfo
        globalMemberInfo.username = e.detail.userInfo.nickName
        globalMemberInfo.userhead = e.detail.userInfo.avatarUrl
        this.setData({
          showShortcut: !this.data.showShortcut
        })
      }).update({
        headImg: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
    }
  },
  toggleshowShortcut: function() {
    this.setData({
      showShortcut: false
    })
  },

  //店铺首页
  goHome: function() {
    // util.navigateTo({
    //   url: '/pages/home/index',
    // })
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  //收藏
  goFavorite: function() {
    util.navigateTo({
      url: '/pages/member/favorite/favorite',
    })
  },
  //搜索
  goSearch: function() {
    util.navigateTo({
      url: '/pages/home/productList/productList',
    })
  },
  //购物车
  goCart: function() {
    util.navigateTo({
      url: '/pages/cart/index',
    })
  },
  __pt_toDetail(e) {
    wx.navigateTo({
      url: '/pages/home/productDetails/productDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  //联系我们
  callUs: function() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.productData.phone,
      success(res) {

      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          util.errShow(that.data.productData.phone, 5000)
        }

      }
    })
  }


}))