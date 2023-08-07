const app=getApp();
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'',
        info:'',
        p1:'',
        p2:'',
        p3:'',
        photoUrl:[],
        name:'',
        student_no:'',
        Height:0,
    },
    getHeight:function(e){
        var winWId=wx.getSystemInfoSync().windowWidth;
        var imgh=e.detail.height;
        var imgw=e.detail.width;
         var swiperH=winWId*imgh/imgw;
         this.setData({
             Height:swiperH
         })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e){
        let that=this
        console.log(e)
        this.setData({
            title:e.title,
            info:e.info,
            p1:e.p1,
            p2:e.p2,
            p3:e.p3,
            openid:e.openid,
            goods_id:e.goods_id,
            myopenid:app.globalData.openid,
            name:e.name,
            student_no:e.student_no
        })
        if(this.data.photoUrl === undefined) {
            this.data.photoUrl = []
        }
        if(this.data.p1!=''){
            this.data.photoUrl.push(this.data.p1)
            this.setData({
                photoUrl:this.data.photoUrl
            })
        }
        if(this.data.p2!=''){
            this.data.photoUrl.push(this.data.p2)
            this.setData({
                photoUrl:this.data.photoUrl
            })
        }
        if(this.data.p3!=''){
            this.data.photoUrl.push(this.data.p3)
            this.setData({
                photoUrl:this.data.photoUrl
            })
        }
   },



    clickImg: function(e){
        console.log(e)
        var imgUrl = this.data.photoUrl;
        wx.previewImage({
            urls: imgUrl, //需要预览的图片http链接列表，注意是数组
           // current: '', // 当前显示图片的http链接，默认是第一个
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

   onReady(){
       wx.setNavigationBarTitle({
         title: this.data.title,
       })
   },

})