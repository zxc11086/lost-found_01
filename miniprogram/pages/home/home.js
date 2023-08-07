import { request } from "../../request/home.js";

Page({

    /**
     * 页面的初始数据
     * 
     */
    data: {
        swiperList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSwiperList();   
    },

    getSwiperList(){
        this.setData({
            swiperList:[
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/微信图片_20230723153211.png",
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/86211eb5f8f191d69998aee4af2d05f - 副本.png",
                "cloud://cloud1-6gevrsnyc0bd63e0.636c-cloud1-6gevrsnyc0bd63e0-1319618595/虎哥.jpg"
            ]
        })
    },

    gotoLost(){
        wx.navigateTo({
          url: '../lost/lost'
        })
    },

    gotoFound(){
         wx.navigateTo({
            url:'../found/found'
         })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})