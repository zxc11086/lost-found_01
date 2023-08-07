import { request } from "../../request/home.js";
const app = getApp();
const db=wx.cloud.database();
const dc=db.command

Page({

    data: {
        swiperList:[],
        isloading: false,
        num:20,
        cateList:[
        "../../images/ele.png",
        "../../images/book.png",
        "../../images/cloth.png",
        "../../images/education.png"],
        goodslist:[]
    },
    //页面加载时触发
    onLoad:function(options) {
        let that=this
        db.collection('goods').where({
            status:true
        }).get({
            success(res){
                console.log(res)      
                that.setData({
                    goodslist:res.data
                })
                console.log(that.data.goodslist)
            }
        })
        this.getSwiperList();
    },

    //获取轮播图数据
    getSwiperList(){
        this.setData({
            swiperList:[
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/微信图片_20230723153211.png",
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/86211eb5f8f191d69998aee4af2d05f - 副本.png",
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/虎哥.jpg"
            ]
        })
    },

    //用户点击右上角分享给好友，要现在分享到好友这个设置menu的两个参数，才可以实现分享到朋友圈
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
 
    return {
      title:'北化失物招领',
      imageUrl:''
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline:function(){
    return {
      title:'北化失物招领',
      query:{
        key:123
      },
      imageUrl:''
    }
  },
   

    onPullDownRefresh: function(e) {   
        wx.stopPullDownRefresh();
    },

    onReachBottom: function () {
        let that=this
        if(this.data.isloading==false){
            console.log(1)
            that.getGoodsList()// 重新获取列表数据
        }
    },
 
    //获取商品数据
    getGoodsList(){
        let that=this
        this.setData({
          isLoading:true
        })
        db.collection('goods').where({
            status:true
        }).skip(that.data.goodslist.length).get({
            success(res){
                console.log(res)     
                if(res.data.length==0){
                    wx.showToast({
                        title: '没有更多物品辣！',
                        icon: 'none',
                        mask:true,
                        duration: 1500,
                    })
                }
                else{ 
                    that.setData({
                        isloading:false,
                        goodslist:that.data.goodslist.concat(res.data)
                    })
                    console.log(that.data.goodslist)
                }
            }
        })
    }
})