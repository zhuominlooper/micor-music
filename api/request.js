
//发送请求的函数
const URLBASEPATH='http://www.octoveau.cn/micor-music'
export default (url = "", data = {}, method = "GET",callBack) => {
  return new Promise((resolve, reject) => {
    wx.request({ 
      url:URLBASEPATH+url, 
      data,
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
