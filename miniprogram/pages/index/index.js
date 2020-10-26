//index.js
const app = getApp();
const tmplId = '3W9SI0bIfHftnSETagBLP7yZjLOra8CmrtrcrfFQFy0';

Page({
  data: {
  },

  onLoad: function() {
  },
  preview:function(){

    wx.previewImage({
      current: '/images/qr.jpg', // 当前显示图片的http链接
      urls: ['/images/qr.jpg'] // 需要预览的图片http链接列表
    })
  },
  onSubscribe:function(){
    console.log('订阅')
    wx.requestSubscribeMessage({
      tmplIds: [tmplId],
      success(res){
        if (res.errMsg === 'requestSubscribeMessage:ok'){
          // 将订阅的信息调用云函数存入云开发数据
          wx.cloud
            .callFunction({
              name: 'subscribe',
              data: {
                templateId: tmplId,
              },
            })
            .then(() => {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
            })
            .catch(() => {
              wx.showToast({
                title: '订阅失败',
                icon: 'success',
                duration: 2000,
              });
            });
        }
      },
      fail(err){
        console.warn(err);
      }
    })
  },
  onShareAppMessage:function(){
    return {
      title: '美团饿了么优惠券，下单可以叠加用！',
      path: '/pages/index/index',
      imageUrl: '/images/share.jpg'
    }
  },
  onShareTimeline:function(){
    return {
      title: '定外卖前，先领个优惠券吧~~',
      imageUrl: '/images/share.jpg'
    }
  }

})
