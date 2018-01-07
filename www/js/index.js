
// 监听添加学生按钮的点击事件
$('.container #add').click(function add() {
    location.href = 'addStu.html';
})
// 监听搜索选项按钮的点击事件
$('.container ul').on('click', 'li', function search() {
    console.log(this);
    // input 定义ID $("#id").attr("placeholder","更改的值");
    $('.toolbar input').attr("placeholder", "按" + $(this).attr('name') + "进行搜索");
    // $('.toolbar input').val() == "";
})

// 向服务端发送请求,添加学生信息到首页
$.get('/getStu', function (res) {

    console.log(res);
    // console.log({ data: res });
    var html = template('student', { data: res });
    $('.container tbody').append(html);
    // console.log(html);
    // 监听input事件
    $('.toolbar input').on('input', function (value) {
        var value = $(this).val();
        console.log(value);
        // 添加过滤器  找出满足要求的选项
        const searchArr = res.filter((item, index, arr) => {
            if ($('.toolbar input').attr('placeholder') == "按学号进行搜索") {
                return item.StuID.includes(value);
            } else if ($('.toolbar input').attr('placeholder') == "按姓名进行搜索") {
                return item.name.includes(value);
            } else if ($('.toolbar input').attr('placeholder') == "按年龄进行搜索") {
                return item.age.includes(value);
            } else if ($('.toolbar input').attr('placeholder') == "按联系方式进行搜索") {
                return item.phone.includes(value);
            } else if ($('.toolbar input').attr('placeholder') == "按邮箱进行搜索") {
                return item.email.includes(value);
            } else {
                return item.StuID.includes(value) || item.name.includes(value) || item.age.includes(value) || item.phone.includes(value) || item.email.includes(value);
            }
        })
        console.log(searchArr);

        // 把新的数据和模板结合生成html内容
        var searchHtml = template('student', { data: searchArr });
        // 清空学生信息页面 只展示符合要求的学生信息页面
        $('.container tbody').html(searchHtml);

    })




    // 监听编辑的点击事件
    editStu();

    // 监听确认删除的点击事件
    $('tbody>tr').on('click', 'td:eq(6)', function () {
        // console.log(this);
        var index = $(this).parent().index();

        $('.modal').on('click', '#delete', function () {
            // console.log(index);
            $.get('/delete?index=' + index, function (res) {
                if (res.success == 0) {
                    alert(res.message);
                } else {
                    alert('删除成功');
                    // 重新加载当页
                    location.reload();
                    // location.href = 'index.html';
                }
            })
        })
    })

})

/**
 * 
 * $('#students').delegate('td:last-child span','click',function(){
    var id = $(this).data('id')
    var name = $(this).data('name')
    $('#deleteModal .modal-body').text('点击确定将删除'+name)
    $('#deleteModal').modal('show')
    $('#deleteModal .modal-footer button:first').click(function(){
        $.get('/remove/'+ id,

    })
})

//获取数据 
//获取搜索的结果，也是用这个方法，搜索的条件是点击搜索按钮，弹出表单上填充的数据
function show(page){
    console.log($('#search').serialize())
    $.post('/'+page,
        $('#search').serialize(),
        function(responseData){
                //模板化
                var html = template('template',responseData)
                $('#students').html(html)
        }
    )
}


$(show(1))
 */

// // 数组常见操作
// const arr = [1, 12, 113, 4, 5, 1];

// // 10、数组中元素用分隔符连接，得到一个字符串；
// const value = arr.join('|');
// console.log(value);
// console.log(value.split('|'));
// console.log(arr);


// // para1:start;从那个开始;
// // para2:deleteCount:删除几个
// // para3...:在删除的位置插入元素
// // arr.splice(1,2);
// arr.splice(1, 0, 200, 300, 4000);
// console.log(arr);

// // 8、获取一个子数组
// // para1:start;从哪个元素开始
// // para2:end; 【start,end]
// const subArr = arr.slice(1, 3);
// console.log(subArr);


// 编辑学生信息
function editStu() {
    // 监听编辑的点击事件
    $('tbody>tr').on('click', 'td:eq(5)', function () {
        var index = $(this).parent().index();
        // console.log(index);
        location.href = "editStu.html?index=" + index;
        // console.log(location.href);
    })
}