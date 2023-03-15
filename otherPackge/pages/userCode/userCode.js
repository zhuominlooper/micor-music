import request from '../../../api/request';
Page({
  data: {
  },
  onGetId(){
    wx.login({
      success: (res) => {
       this.getUserOpenId(res.code)
      },
    })
    
  },
  getUserOpenId(code){
    request('/user/openid',{code}).then(res=>{
      console.log(222,res)
    })
  }
})