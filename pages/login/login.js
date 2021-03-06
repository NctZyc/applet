// pages/login/login.js
var app = getApp(); //写在页面顶部page()外
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
  },
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.log("可去解密吧！");
      wx.request({
        url: app.globalData.serverUrl + "/api/yygy/decodePhone",
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: app.globalData.session_key,
        },
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          console.log("有没有获取到手机号呀");
          if (res.data.phoneNumber != undefined) {
            console.log("获取到了手机号为：");
            console.log(res);
            that.setData({
              phoneNumber: res.data.phoneNumber,
            });
            wx.switchTab({
              url: "/pages/index/index",
            });
          } else {
            console.log("很遗憾！没有。。。");
          }
        },
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
