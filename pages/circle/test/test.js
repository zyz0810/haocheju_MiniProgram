Page({
  data: {
    img_l: ''
  },
  chooseImg: function () {
    var _this = this;
    wx.chooseImage({

      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(res)
        _this.setData({
          img_l: res.tempFilePaths
        })
        console.log(res)

      }
    })
  },
  up_img: function () {
    var _this = this;
    wx.uploadFile({
      url: 'https://che.0556360.com/Api/Circle/xcxpullcircle',
      filePath: _this.data.img_l[0],
      // header: {
      //   'content-type': 'multipart/form-data'
      // },
      name: 'images',
      formData: {
        userId: '36',
        content:'1212'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        //do something
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  preview_img: function () {
    wx.previewImage({
      current: this.data.img_l, // 当前显示图片的http链接
      urls: this.data.img_l // 需要预览的图片http链接列表
    })
  }
})
