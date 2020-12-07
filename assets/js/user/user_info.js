$(function () {

    var form = layui.form
    var layer = layui.layer
    // 1.为昵称添加验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
    // 调用获取用户信息的函数
    initUserInfo()

    // 2.获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户数据失败')
                }

                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()

        // 调用获取用户信息的函数
        initUserInfo()
    })

    // 4.监听表单的提交事件
    $('.layui-form').on('submit', function (e) {

        // 阻止默认跳转
        e.preventDefault()

        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }

                layer.msg('更新用户信息成功！')


                // 调用父页面中的方法，重新渲染用户的头像和用户名
                // 在子页面中想调用父页面中的函数时 用window.parent.具体的函数名
                // 需要用此方法调用的函数必须写在入口函数之外 否则调用不到
                // 或者就是挂载在window之下
                window.parent.getUserInfo()
            }
        })
    })
})