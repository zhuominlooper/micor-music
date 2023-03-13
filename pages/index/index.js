
import request from '../../api/request'
Page({
  data: {
    bannerListData:[],
    recommendListData:[],
    topListData:[]
  },
  getBannerData(){
   request('/banner',{type:2}).then(res=>{
    this.setData({ 
     bannerListData:res.banners||[] 
    })
 })
  },
  getRecommendData(){
    request('/personalized',{limit:10}).then(res=>{
      this.setData({ 
       recommendListData:res.result||[] 
      })
   }) 
  },
  getTopData(){
    let promisePool=[]
     for(let i=0;i<6;i++){
      promisePool.push( request('/top/list',{id:i}))
     }
     Promise.all(promisePool).then(res=>{
       console.log('res',res)
      this.setData({
        topListData:res.map(item=>{
          return { 
            name:item.playlist.name,
            tracks:item.playlist.tracks.slice(0,10)
          } 
        }) 
      })
     })
  },
  onLoad(options) {
     //获取轮播数据
    this.getBannerData()
    //推荐歌单
    this.getRecommendData()
    //排行榜
    this.getTopData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})