import request from '../../api/request';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startY: 0,
    moveY: 0,
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: null,
    recentPlayList: [],
  },
  onGotoLogin() {
    wx.reLaunch({
      url: '/pages/login/login',
    });
  },
  onBindtouchstart(e) {
    this.setData({
      startY: e.touches[0].clientY,
    });
  },
  onBindtouchmove(e) {
    this.setData({
      moveY: e.touches[0].clientY,
      coverTransition: '',
    });
    let moveData = this.data.moveY - this.data.startY > 200 ? 200 : this.data.moveY - this.data.startY;
    if (moveData >= 0) {
      this.setData({
        coverTransform: `translateY(${moveData}rpx)`,
      });
    }
  },
  onBindtouchend() {
    this.setData({
      coverTransform: `translateY(0)`,
      coverTransition: 'all 1s linear',
    });
  },

  //获取用户的播放记录
  recentPlayList() {
    request('/user/record', {
      uid: this.data.userInfo.userId,
      type: 0,
    }).then((res) => {
      this.setData({
        recentPlayList: res.allData.slice(0, 10).map((item, index) => {
          item.id = index;
          return item;
        }),
      });
      console.log(111,this.data.recentPlayList)
    });
  },
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      //更新状态
      this.setData({
        userInfo: JSON.parse(userInfo),
      });
      //获取用户播放记录
      this.recentPlayList();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
