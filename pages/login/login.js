// pages/login/login.js
import {validatePhone} from '../../utils/index'
Page({
  data: {
     phone:'',

  },
  onBindInoput(e){ 
     this.setData({
       [e.target.id]:e.detail.value.replace(/\s+/g,'')
     })
     console.log(233,this.data.phone)
  },
  onLogin(){
    let {phone,password}=this.data
    if(!validatePhone(phone)){
        return wx.showToast({
          title:'请输入正确的手机号',
          icon:'none',
          mask:true  
        })   
    }
    if(!password){
      return wx.showToast({
        title:'请输入密码',
        icon:'none',
        mask:true  
      })  
    }
  },
  onLoad(options) {

  },
  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

})