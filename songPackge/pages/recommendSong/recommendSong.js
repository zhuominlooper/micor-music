import request from '../../../api/request';
import PubSub, { publish } from 'pubsub-js';
Page({
  data: {
    day:'',
    month:'',
    scrollListData:[],
    index:null,//歌曲在数组中的索引
  },
  onLoad(){
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth()+1
    })
    //获取每日推荐数据
    this.getRecommendData()
    PubSub.subscribe('switchType',(type,data)=>{
      let {index,scrollListData}=this.data
      data==='pre'?--index:++index
      index<0&&(index=0)
      index>scrollListData.length-1&&(index=scrollListData.length-1)
      this.setData({
        index
      })
      let musicId=scrollListData[index].id
      PubSub.publish('musicId',musicId)
    }) 

  },
  getRecommendData(){
    request('/recommend/songs').then(res=>{
      this.setData({
        scrollListData:res.data.dailySongs
      })
    })
  },
  //跳转到音乐播放页面
  toSongDetail(e){
    let  {song,index}=e.currentTarget.dataset
     this.setData({
      index
     })
    wx.navigateTo({
      url: `/songPackge/pages/songDetail/songDetail?musicId=${song.id}`,
    })
  }
})