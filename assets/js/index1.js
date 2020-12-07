$(function () {

    // 1.1调用获取用户信息的函数
    getUserInfo()

    // 3.为退出按钮绑定点击事件
    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        // 3.1提示用户是否退出登录
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {

            // 3.2清空本地存储中的token
            localStorage.removeItem('token')

            // 3.3重新跳转到登录页面
            location.href = '/login.html'

            // 3.4关闭consirm询问框
            layer.close(index)
        })
    })
})


// 1.获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 以my开头的请求路径，需要在请求头中加上Authorization身份认证字段，才能正常访问
        url: '/my/userinfo',
        // 请求头配置对象

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败')
            }

            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },

       
    })
}

// 2.渲染用户头像
function renderAvatar(user) {
    // 2.1获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 2.2按需渲染用户头像
    if (user.user_pic !== null) {
        // 2.3 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        // 2.4渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}