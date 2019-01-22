// let aldstat = require("./utils/ald-stat.js");
let Member = require('/service/member.js')
let util = require('/utils/util.js')
let config = require('/utils/config.js')

App({
  globalData: {
    LOGIN_STATUS: false,
    sys: wx.getSystemInfoSync()
  },
  onShow(opData) {

  },
  loginOkCallbackList: [],
  onLaunch(opData) {
    let that = this
    let username = '',
      headImg = '';

    wx.login({
      success(data) {


        console.log(data.code)
        //用户登陆成功
        tryLogin({
          code: data.code
        }, (res) => {
          that.globalData.LOGIN_STATUS = true

          // new Member(res => {

          //   that.globalData.memberInfo = res.data
          //   wx.setStorageSync('memberInfo', res.data)

          //   if (that.loginOkCallback) {
          //     that.loginOkCallback()
          //   }
          //   if (that.loginOkCallbackList.length > 0) {
          //     for (let i = 0; i < that.loginOkCallbackList.length; i++) {
          //       if (typeof that.loginOkCallbackList[i] === 'function') {
          //         that.loginOkCallbackList[i]()
          //       }
          //       continue
          //     }
          //   }
          // }).view({
          //   appid: config.APPID
          // })
        })
      }

    })


    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })


    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/scope/index',
          })
        }
      }
    })
  }
})

//登陆，获取sessionid
var tryLogin = (function() {
  let count = 0
  return function(data, fn) {
    if (count >= config.LOGIN_ERROR_TRY_COUNT) {
      util.errShow('登陆超时')
      return
    }

    new Member(function(res) {
      if (res.data.openid || res.data.unionid !== null) {
        //设置请求session到本地
        wx.setStorageSync('openid', res.data.openid)
        wx.setStorageSync('unionid', res.data.unionid)

        fn ? fn(res) : ''
      } else {
        console.log(8722)
        setTimeout(function() {
          tryLogin(data.code)
          count++
        }, config.LOGIN_ERROR_TRY_TIMEOUT)
      }
    }, function(err) {

      util.errShow('登陆失败', 50000)
    }).loginC({
      code: data.code,
    })
  }
})()