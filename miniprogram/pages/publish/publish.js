const db=wx.cloud.database();
const app=getApp();

Page({
    data: {
        array: ['失物招领', '寻物启事'],
        title: "",
        info: "",
        detail: [],
        detailNew:[],
        photourl:[],
        chooseViewShowDetail: true,
        chooseViewShowBanner: true,
        status : true,
        openid: '',
    },

    onLoad(options) {
      if(app.globalData.student_no==null){
        wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask:true,
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000) //延迟时间
            },
        })
    }
    },

    // 获取发布类型
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index: e.detail.value
        })
        if(e.detail.value=='0'){
            this.setData({
                status: true
              })
        }
        else{
            this.setData({
                status: false
            })
        }
      },


    /**
   * 获取物品名称
   */
  titleBlur(e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 获取物品信息
   */
  infoBlur(e) {
    this.setData({
      info: e.detail.value
    })
  },
  
  /**发布提交 */
  formSubmit(e) {
    let that = this
    if (e.detail.value.title === "") {
      wx.showToast({
        title: '请输入物品名称',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.title.length > 60) {
      wx.showToast({
        title: '物品名称不得大于60字',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.info === "") {
      wx.showToast({
        title: '请输入物品信息',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.detail.length === 0) {
      wx.showToast({
        title: '请选择详情图片',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定发布物品',
        success:(res)=> {
          if (res.confirm) {
            wx.showLoading({
                title: '发布中...',
            });
            let that = this
            let detail=this.data.detail
            let photourl=this.data.photourl
            var j=0
            for(var i=0;i<detail.length;i++){
              let filePath=detail[i]
              wx.cloud.uploadFile({
                cloudPath: (new Date()).valueOf() + '.png',//文件名 //云存储图片名字
                filePath,
                success: res => {
                  console.log('[上传图片] 成功：', res)
                  photourl=photourl.concat(res.fileID)
                  j++;
                  console.log(detail.length)
                  that.setData({
                     photourl:photourl
                  })
                  if(j==detail.length){
                    that.sureRelease()
                }
                },
              });
            }
          }
        }
      })
    }
  },
 




  /**确认发布 */
  sureRelease(){
        console.log(123)
        db.collection('goods').add({
            data:{
                student_no:app.globalData.student_no,
                name:app.globalData.name,
                title:this.data.title,
                info:this.data.info,
                photourl:this.data.photourl,
                status:this.data.status
            },
            success:function(res){
                wx.hideLoading({})
                console.log('发布完成')
                wx.showToast({
                    title: '发布成功！',
                    icon: 'none',
                    mask:true,
                    duration: 1500,
                    success: function() {
                        setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                        }, 1000) //延迟时间
                    },
                })
            },
            fail:console.error
        })
  },
 
  /** 选择图片detail */
  chooseDetail: function() {
    var that = this;
    if (that.data.detail.length < 3) {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(photo) {
          //detail中包含的可能还有编辑页面下回显的图片，detailNew中包含的只有所选择的图片
          let detail = that.data.detail;
          detail = detail.concat(photo.tempFilePaths);
          let detailNew = that.data.detailNew
          detailNew = detailNew.concat(photo.tempFilePaths)
          that.setData({
            detail: detail,
          })
          that.chooseViewShowDetail();
          console.log(detail)
        }
      })
    } else {
      wx.showToast({
        title: '限制选择3个文件',
        icon: 'none',
        duration: 1000
      })
    }
  },
 
  /** 删除图片detail */
  deleteImvDetail: function(e) {
    var that = this;
    var detail = that.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    if (that.data.productID != 0) {
      wx.showModal({
        title: '提示',
        content: '删除不可恢复，请谨慎操作',
        success(res) {
          if (res.confirm) {
            console.log(detail[itemIndex]);
            detail.splice(itemIndex, 1);
            that.setData({
              detail: detail,
              checkUp: false
            })
            that.chooseViewShowDetail();
          }
        }
      })
    } else {
      detail.splice(itemIndex, 1);
      that.setData({
        detail: detail,
        checkUp: false
      })
      that.chooseViewShowDetail();
    }
  },
 
  /** 是否隐藏图片选择detail */
  chooseViewShowDetail: function() {
    if (this.data.detail.length >= 3) {
      this.setData({
        chooseViewShowDetail: false
      })
    } else {
      this.setData({
        chooseViewShowDetail: true
      })
    }
  },
 
  /** 查看大图Detail */
  showImageDetail: function(e) {
    var detail = this.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: detail[itemIndex], // 当前显示图片的http链接
      urls: detail // 需要预览的图片http链接列表
    })
  },
 
})