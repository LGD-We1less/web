$(function () {
    var layer = layui.layer

    look()
    function look() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res.data.user_pic);
                $('#image')[0].setAttribute('src', res.data.user_pic)

                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', res.data.user_pic) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })

    }

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {

        // 纵横比
        aspectRatio: 1,

        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    var layer = layui.layer

    // 2.当点击上传按钮的时候，模拟点击文件上传事件
    $('.scBtn').on('click', function () {
        $('#file').click();
    })

    // 3.为文件上传绑定change事件
    $('#file').on('change', function (e) {
        // 3.1获取用户上传的文件
        var fileList = e.target.files

        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 3.2拿到用户上传的文件
        var file = fileList[0]

        // 3.3将选择的文件转换成路径
        var imgURL = URL.createObjectURL(file)

        console.log(imgURL);
        // 3.4 重新初始化裁剪区域/先销毁旧的裁剪区域/重新设置图片路径/重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })


    // 4.为确定按钮绑定点击事件
    $('.okbtn').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('头像上传失败')
                }
                layer.msg('头像上传成功！')

                window.parent.getUserInfo()
            }
        })
    })



})