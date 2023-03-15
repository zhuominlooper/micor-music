// 热搜列表
module.exports = (query, request) => {
  let code = query.code
  let appId = 'wxdb5e6370f363b305'
  let appSecret = '4ab7f11cde17b8669bfcf823134d47e4'
  return request(
    'GET',
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
  )
}
