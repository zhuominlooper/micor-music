import request from '../../api/request';
Page({
  data: {
    bannerListData: [],
    recommendListData: [],
    topListData: [],
  },
  getBannerData() {
    request('/banner', { type: 2 }).then((res) => {
      this.setData({
        bannerListData: res.banners || [],
      });
    });
  },
  getRecommendData() {
    request('/personalized', { limit: 10 }).then((res) => {
      this.setData({
        recommendListData: res.result || [],
      });
    });
  },
  //跳转到每日推荐
  onGotoRecommend() {
    wx.navigateTo({
      url: '/songPackge/pages/recommendSong/recommendSong',
    });
  },
  //跳转到用户openid获取页面
  onGotoCode(){
    wx.navigateTo({
      url: '/otherPackge/pages/userCode/userCode',
    })
  },
  getTopData() {
    let promisePool = [];
    for (let i = 0; i < 6; i++) {
      promisePool.push(request('/top/list', { idx: i }));
    }
    Promise.all(promisePool).then((res) => {
      console.log('res', res);
      this.setData({
        topListData: res.map((item) => {
          return {
            name: item.playlist.name,
            tracks: item.playlist.tracks.slice(0, 10),
          };
        }),
      });
    });
  },
  onLoad(options) {
    //获取轮播数据
    this.getBannerData();
    //推荐歌单
    this.getRecommendData();
    //排行榜
    this.getTopData();
  },
});
