// pages/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    list: [{
      id:0,
        img: ['http://www.chexiangguan.com/Upload/Carfans/image/2018-07-25/5b57f4b26a147.JPG',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
        show: true
      },
      {
        id:1,
        img: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'],
        show: true
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  contBtn: function(e) {
    var that = this,
      listArr = that.data.list,
      index = e.currentTarget.dataset.index;
    console.log(index)
    if (listArr[index].show == false) {
      listArr[index].show = true
    } else {
      listArr[index].show = false
    }
    that.setData({
      list: listArr
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    var index = e.target.dataset.id;
    console.log(this.data.list[index].img)
    wx.previewImage({
      current: current,
      urls: this.data.list[index].img
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})