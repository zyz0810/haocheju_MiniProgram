// pages/circle/circle.js
let app = getApp(),
  swiperAutoHeight = require("../../template/swiperIndex/swiper.js"),
  Contact = require("../../service/contact.js"),
  Member = require("../../service/member.js"),
  util = require("../../utils/util.js")
Page(Object.assign({}, swiperAutoHeight, {

  /**
   * 页面的初始数据
   */
  data: {

    replyInput: false,
    name: '',
    focus: false
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
    var that = this
    var userId = wx.getStorageSync('userId')
    new Member(res => {
      console.log(res)
      this.setData({
        myname: res.data.nickname ? res.data.nickname : res.data.username,
      })
    }).view({
      userId: userId
    })
    new Contact(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        list: res.data.return_new.data,
        listPage: res.data.return_new.pageTotal,
        currentPage: res.data.return_new.currentPage
      })

      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        list[i].show = true
        list[i].replyInput = true
        list[i].focus = false
      }
      this.setData({
        list: list
      })

    }).list({
      page: 1,
      pageSize: 10,
      userId: userId,
      type: 1
    })

    // console.log(that.data.list.length)



  },
  publish: function() {
    util.navigateTo({
      url: 'edit/edit',
    })
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
    var that = this
    console.log(e)
    var current = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(that.data.list[index])
    wx.previewImage({
      current: current,
      urls: that.data.list[index].images
    })

  },
  like: function(e) {
    console.log(e)
    var that = this
    var userId = wx.getStorageSync('userId')
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log('inde12c' + id)
    new Contact(function(res) {
      var list = that.data.list
      console.log(list[index])
      if (res.data.isspot == '1') {
        list[index].isspot = '1'
        list[index].spotlist = res.data.spotlist
        that.setData({
          list: list
        })
      } else {
        list[index].isspot = '0'
        list[index].spotlist = res.data.spotlist
        that.setData({
          list: list
        })
      }

    }).liked({
      pid: id,
      userId: userId
    })
  },
  // cancelLike:function(e){

  // },
  goPReply: function(e) {


    console.log(1212)
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    this.setData({
      name: name
    })

    var that = this,
      listArr = that.data.list,
      index = e.currentTarget.dataset.index;
    console.log(index)

    listArr[index].replyInput = false
    listArr[index].focus = true

    that.setData({
      list: listArr
    })

  },
  goReply: function(e) {
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    this.setData({
      name: name
    })

    var that = this,
      listArr = that.data.list,
      index = e.currentTarget.dataset.index;
    console.log(index)
    if (listArr[index].show == false) {
      listArr[index].show = true
      listArr[index].replyInput = false
      listArr[index].focus = true
    } else {
      listArr[index].show = false
      listArr[index].replyInput = true
      listArr[index].focus = false
    }

    // new Contact(function(res) {

    // }).reply({
    //   pauthor: '',
    //   author: myname,
    //   cid: id,
    //   comment: content
    // })

    that.setData({
      list: listArr
    })

  },

  content: function(e) {
    // console.log(e)
    this.setData({
      content: e.detail.value
    })
  },


  goSend: function(e) {
    let cont = e.currentTarget.dataset.cont;
    var that = this
    var id = e.target.dataset.id;
    var index = e.currentTarget.dataset.index;
    new Contact(function(res) {


      var listArr = that.data.list
      var comment = that.data.list[index].comment

      var commentCont = {}

      commentCont.pname = that.data.name
      commentCont.comment = that.data.content
      commentCont.author = that.data.myname
      comment.push(commentCont)

      console.log(comment)

      listArr[index].replyInput = true
      listArr[index].focus = false

      that.setData({
        list: listArr,
        content: ''
      })


    }).reply({
      pauthor: that.data.name,
      author: that.data.myname,
      cid: id,
      comment: that.data.content
    })
  },
  inputCont: function(e) {
    this.setData({
      cont: e.detail.value
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
    var that = this
    var userId = wx.getStorageSync('userId')
    new Member(res => {
      console.log(res)
      this.setData({
        myname: res.data.nickname ? res.data.nickname : res.data.username,
      })
    }).view({
      userId: userId
    })
    new Contact(res => {
      console.log(res)
      this.setData({
        banner: res.data.return_banner,
        list: res.data.return_new.data,
        listPage: res.data.return_new.pageTotal,
        currentPage: res.data.return_new.currentPage
      })

      var list = res.data.return_new.data
      for (let i = 0; i < list.length; i++) {
        list[i].show = true
        list[i].replyInput = true
        list[i].focus = false
      }
      this.setData({
        list: list
      })

    }).list({
      page: 1,
      pageSize: 10,
      userId: userId,
      type: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var userId = wx.getStorageSync('userId')
    var that = this;
    wx.showNavigationBarLoading();
    // var pageModel = this.data.pageModel;
    var listPage = this.data.listPage;
    var currentPage = this.data.currentPage;
    var list = this.data.list;


    console.log(currentPage)

    new Contact(res => {
      console.log(res)
      wx.hideNavigationBarLoading() //完成停止加载
      if (res.data.return_new.pageTotal < res.data.return_new.currentPage) {
        wx.hideNavigationBarLoading()
        that.setData({
          tips: '',
          showtips: false
        })
      } else {
        // list = list.concat(res.data.return_new.data)
        var list1 = res.data.return_new.data
        for (let i = 0; i < list1.length; i++) {
          list1[i].show = true
          list1[i].replyInput = true
          list1[i].focus = false
        }
        list = list.concat(list1)
        this.setData({
          list: list,
          currentPage: res.data.return_new.currentPage
        })
      }

    }).list({
      page: ++currentPage,
      pageSize: 10,
      userId: userId,
      type: 1
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: that.data.title,
      path: '/pages/circle/circle',
      imageUrl: '/resources/images/logo.png',
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
  }
}))