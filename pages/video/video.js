import request from '../../api/request';
Page({
  data: {
    videoGroupList: [],
    videolistData: [], //视频列表数据
    navId: null,
    videoId: null,
    videoPlayTimeObj: null,
    triggered: false,
    offset: 0,
  },
  onReady() {
    this.getVideoGroupData();
  },
  onsearchSong(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //获取导航数据
  getVideoGroupData() {
    request('/video/group/list').then((res) => {
      this.setData({
        videoGroupList: res.data.slice(0, 10),
        navId: res.data[0].id,
      });
      this.getCurrentVideoData();
    });
  },
  getCurrentVideoData(isPullData = false) {
    request('/video/group', { id: this.data.navId, offset: this.data.offset }).then((res) => {
      console.log(22233,res,isPullData)
      if (isPullData) {
        let data = this.data.videolistData;
        data.push(
          ...res.datas.map((item, index) => {
            item.id = index + data.length;
            return item;
          })
        );
        this.setData({
          videolistData:data,
          triggered: false,
        })
        return;
      }
      this.setData({
        videolistData: res.datas.map((item, index) => {
          item.id = index;
          return item;
        }),
        triggered: false,
      });
      //根据videoID去获取视频播放地址
      this.getVideoAdress();
    });
  },
  //获取视频播放地址
  getVideoAdress() {
    let cloneVideolistData = JSON.parse(JSON.stringify(this.data.videolistData));
    let count = 0;
    cloneVideolistData.forEach(async (item, index) => {
      let result = await request('/video/url', { id: item.data.vid });
      item.videoUrl = result.urls[0]?.url;
      count++;
      if (count === cloneVideolistData.length) {
        this.setData({
          videolistData: cloneVideolistData,
        });
      }
    });
  },
  //获取点击时长
  onBindtimeupdate(e) {
    this.setData({
      videoPlayTimeObj: { ...this.data.videoPlayTimeObj, ...{ [e.currentTarget.id]: e.detail.currentTime } },
    });
  },
  //视频播放结束
  onBindended(e) {
    let id = e.currentTarget.id;
    let videoPlayTimeObj = this.data.videoPlayTimeObj;
    videoPlayTimeObj[id] = 0;
    this.setData({
      videoPlayTimeObj,
    });
  },
  //处理点击播放
  handlePlay(e) {
    let vid = e.currentTarget.id;
    this.setData({
      videoId: vid,
    });
    this.videoContext = wx.createVideoContext(vid);
    this.data.videoPlayTimeObj[vid] && this.videoContext.seek(this.data.videoPlayTimeObj[vid]);
  },
  //下拉刷新 
  onBindrefresherrefresh() {
    this.getCurrentVideoData();
  },
  //滑动到底部刷新
  onBindscrolltolower(e) {
    this.setData({
      offset:++this.data.offset
    })
    this.getCurrentVideoData(true);
  },
  //动态改变你导航栏
  chnageNav(e) {
    this.setData({
      navId: e.currentTarget.id >> 0,
      offset: 0,
    });
    this.getCurrentVideoData();
  },
  onPullDownRefresh() {
   console.log(343434)
  },
  //右上角分享
  onShareAppMessage({from}){
    return {
      title: '来自微云分享',
      path: '/pages/video/video',
      imageUrl:'/static/images/song/needle.png'
    }
  }
});
