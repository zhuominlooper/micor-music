
//发送请求的函数

 //const URLBASEPATH='http://www.octoveau.cn/micor-music'  
const URLBASEPATH='http://localhost:3000'   
export default (url = "", data = {}, method = "GET",callBack) => {
  return new Promise((resolve, reject) => {
    wx.request({ 
      header:{
        cookie:'MUSIC_U=279b6b8ab597de0425e44c8a0de3b79553ad76d8917050e144091385b7d76113993166e004087dd3d7773206379e06095985febfadc3dc701688a401c25b9bdd37e869597e91057ad4dbf082a8813684; Max-Age=15552000; Expires=Sat, 09 Sep 2023 08:45:07 GMT;'
      },
      url:URLBASEPATH+url, 
      data:{
        ...data,
        timestamp:new Date().getTime()
      },
      method,
      success: (res) => {
        resolve(res.data);
        callBack?callBack(res.data):void 0
      },
      fail: (error) => {
        reject(error);
        callBack?callBack(error):void 0
      },
    });
  });
};
