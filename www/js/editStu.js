
var index = location.search.split('?index=')[1];
// console.log(index);

// 发送请求获取当前编辑页面的数据
$.get('/editStu?index=' + index, function (res) {
    // console.log(res);
    $('#StuID').val(res.StuID);
    $('#name').val(res.name);
    $('#age').val(res.age);
    $('#phone').val(res.phone);
    $('#email').val(res.email);
    $("#intro").val(res.intro);
})

// 触发form的submit事件
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
    var updateData = { StuID, name, age, phone, email, intro };
    // console.log(updateData);

    // console.log(index);
    $.post('/update?index=' + index, updateData, function (res) {
        if (res.success == 0) {
            alert(res.message);
        } else {
            alert(res.message);
            location.href = 'index.html';
        }
    })
})

