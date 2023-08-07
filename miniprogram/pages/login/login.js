const db=wx.cloud.database();
const app=getApp();
const chat_users=db.collection('chat_users');

Page({
  data: {
    student_no:'',
    password:''
  },

  password(e) {
    this.setData({
      password: e.detail.value
    })
  },

  student_no(e) {
    this.setData({
      student_no: e.detail.value
    })
  },

    formSubmit(e) {
        var that = this
        if(e.student_no === ""){
            wx.showToast({
                title: '请输入学号',
                icon: "none",
                duration: 1000,
                mask: true,
            })
        }
        if (e.detail.value.password === "") {
        wx.showToast({
            title: '请输入密码',
            icon: "none",
            duration: 1000,
            mask: true,
        })
        } else {
            wx.showLoading({
                title: '正在登录...',
            });
            setTimeout(()=>{
                wx.hideLoading({
                  success: (res) => {},
                })
            },2000)
            that.sureRelease()
        }
    },
    sureRelease:function(){
        console.log(this.data.student_no)
        var that=this
        db.collection('users').where({
            student_no:that.data.student_no
        }).get({
            success:function(res){
                console.log(res)
                if(res.data[0].password == that.data.password){
                    app.globalData.name=res.data[0].name
                    app.globalData.student_no=res.data[0].student_no
                    wx.showToast({
                        title: '登录成功！',
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
                }
                else{
                    wx.showToast({
                        title: '请检测学号或密码！',
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
                }
            }
        })
    },
})