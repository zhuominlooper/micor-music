import request from '../../api/request';
let isSend=false
Page({
  data: {
    placeholderText: '',
    hotListData: [],
    searchContent: '', //表单数据
    searchListData: [] //搜索出的关键字
  },
  onLoad() {
    this.getPlaceholderText();
    //获取热搜榜数据
    this.getHotData();
  },
  getPlaceholderText() {
    
    request('/search/default').then((res) => {
      this.setData({
        placeholderText: res.data.showKeyword,
      });
    }); 
  },
  getHotData() {
    
    request('/search/hot/default').then((res) => {
      this.setData({
        hotListData: res.result.hots.map((item, index) => {
          item.id = index;
          return item;
        }),
      });
    });
  
  },
  //搜素变化
  handleInputChange(e) {
    this.setData({
      searchContent: e.detail.value.trim(),
    });
    //节流
    if(isSend){
      return 
    }
    isSend=true
    this.getSearchData();
     setTimeout(()=>{
      isSend=false
    },1000)
    
  },
  getSearchData() {

    this.data.searchContent&& request('/search', {
        keywords: this.data.searchContent,
        limit: 10,
      }).then((res) => {
        this.setData({
          searchListData:res.result.songs
        })
      });
    
  
  },
});
