// let aldstat = require("./utils/ald-stat.js");
let Member = require('/service/member.js')
let First = require('/service/first.js')
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

    new First(function(res) {
      wx.setTabBarItem({
        index: 1,
        text: res.data.name
      })
    }).nav()

    wx.login({
      success(data) {
        console.log(data.code)
        //用户登陆成功
        tryLogin({
          code: data.code
        }, (res) => {
          that.globalData.LOGIN_STATUS = true
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

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.navigateTo({
    //         url: '/pages/scope/index',
    //       })
    //     }
    //   }
    // })
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