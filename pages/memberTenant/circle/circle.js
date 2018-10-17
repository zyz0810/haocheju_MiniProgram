// pages/member/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { show: true},
      { show: true}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  contBtn: function (e) {
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


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})