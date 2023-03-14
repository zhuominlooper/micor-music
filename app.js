// app.js
App({
  //全局数据，在每个文件的this上挂载
  globalData: {
    isMusicPlay: false,//是否有乐音在播放
    musicId: '',
  },
  onLaunch() {
    // 登录
    wx.login({
      success: (res) => {
        console.log(111, res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  globalData: {
    userInfo: null,
  },
});
