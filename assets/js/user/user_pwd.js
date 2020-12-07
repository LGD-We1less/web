$(function () {

    var form = layui.form
    var layer = layui.layer

    // 1.为三个密码框添加正则验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 2.监听表单的提交事件
    $('.layui-form').on('submit', function (e) {

        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('原密码输入错误！')
                }
                layer.msg('更新密码成功！')

                // 重置表单
                // 将jquery对象改成dom对象然后调用reset方法重置表单
                // $('.layui-form')[0].reset()
                $('#resetBtn').click()
            }
        })
    })


})