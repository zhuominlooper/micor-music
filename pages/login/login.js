import request from '../../api/request';
Page({
  data: {
    qrCodeData: null,
    userInfo: null,
  },
  async handleLogin() {
    //由于现在网易不支持短信邮箱登录，只能进行扫码登录
    try {
      //获取key
      const unikeyData = await request('/login/qr/key');
      //获取二维码展示
      const result = await request(`/login/qr/create`, {
        key: unikeyData.data.unikey,
        qrimg: true,
      });
      this.setData({
        qrCodeData: result.data,
      });
      wx.hideLoading();
      this.handleLoginStatus(unikeyData);
    } catch (error) {
      wx.showToast({
        icon: 'error',
        title: error.mgs || error.message || '请求异常',
      });
    }
  },
  handleLoginStatus(unikeyData) {
    let timer = setInterval(() => {
      request(`/login/qr/check`, {
        key: unikeyData.data.unikey,
      }).then((res) => {
        if (res.code === 803) {
          wx.showToast({
            title: res.message,
            icon:'success'
          })  
          clearInterval(timer);
          this.getuserInfo();
          //缓存cookie
          this.handleCookie(res.cookie)
        }
      });
    }, 3000);
  },
  handleCookie(cookieStr){
    let allCookieArr=cookieStr.split('Path=/;;')
    let VideoCookieArr=allCookieArr[2].split('Path=/;')
    wx.setStorageSync('cookie', VideoCookieArr[0])
  },
  getuserInfo() {
    request(
      `/login/status`,
      {
        cookie: this.data.cookie,
      },
      'POST'
    ).then((res) => {
      this.setData({
        userInfo: res.data,
      });
      //存储用户信息
      wx.setStorageSync('userInfo', JSON.stringify(res.data.profile))
      wx.switchTab({
        url: '/pages/personal/personal',
      })
    });
  },
  onReady() {
    wx.showLoading({
      title: '二维码加载中',
    });
    this.handleLogin();
  },
});
