

// 监听form表单中的submit事件
$('form').submit(function (event) {
    event.preventDefault();
    // console.log(this);

    // 获取用户输入的数据
    var StuID = $(this).find('#StuID').val();
    var name = $(this).find('#name').val();
    var age = $(this).find('#age').val();
    var phone = $(this).find('#phone').val();
    var email = $(this).find('#email').val();
    var intro = $(this).find('#intro').val();

    var data = { StuID, name, age, phone, email, intro };
    // console.log(data);

    // 向服务端发送post请求
    $.post('/addStu', data, function (res) {
        // console.log('----');
        if (res.success == 0) {
            alert(res.message);
        } else {
            alert(res.message);
            location.href = 'index.html';
        }
    })
})

$('.container form #back').click(function () {
    location.href = 'index.html';
})
