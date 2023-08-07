const app = getApp();
const db=wx.cloud.database();
const chat_users=db.collection('chat_users');


Page({

    /**
     * 页面的初始数据
     */
    data: {
      code:[],
      Img:'/images/icon/login.png',
      nickName:'点击登录'
    },

    onShow(){
        this.setData({
          nickName:app.globalData.name
        })
    },

   gotoPublish:function(options){
    wx.navigateTo({
      url: '../publish/publish',
    })
   },

   gotoMylost:function(options){
    wx.navigateTo({
      url: '../published/published?id=0',
    })
   },

   gotoMyfound:function(options){
    wx.navigateTo({
      url: '../published/published?id=1',
    })
   },

   gotoChat:function(options){
    wx.navigateTo({
      url: '../chat/chat',
    })
   },


   //用户点击右上角分享给朋友
   onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
    return {
      title:'北化咸鱼',
      imageUrl:''
    }
  },

  //用户点击右上角分享朋友圈
  onShareTimeline:function(){
    return {
      title:'北化咸鱼',
      query:{
        key:123
      },
      imageUrl:''
    }
  },

  //如果该用户未登陆过，则跳转到登录页面
   gotoLogin:function(options){
       if(app.globalData.name==null){
        wx.navigateTo({
            url: '../login/login',
          })
       }
   },

//    onLoad:function(){
//         wx.cloud.callFunction({
//             name:'get_openid',
//             success: (res) => {
//                 console.log(res)
//               }        
//         })
//    }

})