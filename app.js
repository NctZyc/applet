// app.js
App({
  onLaunch() {
    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
        that.globalData.openid = wx.getStorageSync("openid");
        that.globalData.session_key = wx.getStorageSync("session_key");
      },

      fail: function (res) {
        console.log("需要重新登录");
        //登录
        wx.login({
          success: (res) => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.errMsg == "login:ok") {
              wx.request({
                url: "http://192.168.11.28:8888/omszyc/api/yygy/jscode2session",
                data: { code: res.code },
                header: {
                  "content-type": "application/json", // 默认值，返回的数据设置为json数组格式
                },
                success: (res) => {
                  if (res.data.openid != "") {
                    console.log("获取到了openid");
                    that.globalData.openid = res.data.openid;
                    that.globalData.session_key = res.data.session_key;
                    wx.setStorageSync("openid", res.data.openid);
                    wx.setStorageSync("session_key", res.data.session_key);
                    console.log(that.globalData);
                  } else {
                    console.log("获取openId!");
                  }
                },
              });
            } else {
              console.log("登录失败！" + res.errMsg);
            }
          },
        });
      },
    });
  },
  globalData: {
    userInfo: null,
    openid: null,
    session_key: null,
    serverUrl: "http://192.168.11.28:8888/omszyc",
  },
});
