
// 1、导入模块
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// 2/创建服务器
const server = http.createServer();

// 3、监听request请求
server.on('request', (req, res) => {

    // 5、判断文件类型并反馈页面
    // const regex = /.js|.css|.html|\/$/;
    // const regex = /(\.js|\.html|\.css|\/$)|(fonts+)/;
    const regex = /(\.js|\.html|\.css|\/$)|(.html+)|(fonts+)/;
    const reqUrl = req.url.split('?')[0];
    const id = req.url.split('id=')[1];
    // console.log(url);
    // console.log(req.url);
    // console.log(id);

    if (regex.test(req.url)) {
        const r = fs.createReadStream('www' + (req.url == '/' ? '/index.html' : reqUrl));
        r.pipe(res);
    }
    // console.log(res);

    // console

    if (reqUrl === '/addStu') {
        // 处理添加学生页面的请求
        addStuHandle(req, res);
    }

    if (reqUrl === '/getStu') {
        // 处理首页得到学生信息数据的请求
        getStuHandle(req, res);
    }

    // 处理修改学生页面的初始信息的请求
    if (reqUrl === '/editStu') {
        editStuHandle(req, res, id);
    }

    // 处理修改后提交的请求
    if (reqUrl === '/update') {
        updateHandle(req, res, id);
    }

    // 处理确认删除的请求
    if (reqUrl === '/delete') {
        deleteHandle(req, res, index);
    }


})

// 4、监听端口
server.listen(3000, () => {
    console.log('====3000...');
})

// 错误函数
function errHandle(err, res) {
    res.end({ success: 0, message: '系统错误，请再次尝试' });
}

// 点击提交保存数据到students.json文件
function addStuHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // 从请求中获取数据
    var total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', (data) => {
        // console.log(total);
        // 解析接收到的数据 变成一个对象 并存入students.json文件中
        const studentObj = querystring.parse(total);
        const id = studentObj.StuID;
        // console.log(id);
        fs.readFile('students.json', (err, data) => {
            if (err) return errHandle(err, res);
            const studentsArr = JSON.parse(data);
            for (let i = 0; i < studentsArr.length; i++) {
                if (id == studentsArr[i].StuID) {
                    res.end(JSON.stringify({ success: 0, message: '该学号已存在，请搜索该学号进行修改' }));
                    return;
                }
            }
            // studentsArr.unshift(studentObj);
            studentsArr.push(studentObj);
            // console.log(studentsArr);
            fs.writeFile('students.json', JSON.stringify(studentsArr), (err) => {
                if (err) return errHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: '添加学生成功' }));
            })
        })
    })
}

// 首页得到学生信息数据
function getStuHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const r = fs.createReadStream('students.json');
    r.pipe(res);
}

// 处理修改学生页面的初始信息
function editStuHandle(req, res, id) {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('students.json', (err, data) => {
        // console.log(data);
        // console.log(id);
        var dataArr = JSON.parse(data);
        // console.log(dataArr[0].StuID);
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].StuID == id) {
                const studentObj = dataArr[i];
                res.end(JSON.stringify(studentObj))
            }
        }
    })
}

// 处理修改后提交的请求
function updateHandle(req, res, id) {
    res.setHeader('Content-Type', 'application/json');
    // console.log(index);
    // 从请求中获取数据
    var total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', (data) => {
        // 解析接收到的数据
        var updateObj = querystring.parse(total);
        // console.log(updateObj);
        var updateID = updateObj.StuID;

        // 获取students.json文件的数据
        fs.readFile('students.json', (err, data) => {
            const studentsArr = JSON.parse(data);
            // console.log(updateID);

            for (let i = 0; i < studentsArr.length; i++) {
                if ((updateID != studentsArr[i].StuID) || (updateID == id)) {
                    if (id == studentsArr[i].StuID) {
                        studentsArr.splice(i, 1, updateObj);
                    }
                } else {
                    res.end(JSON.stringify({ success: 0, message: '该学号已存在，请重新修改' }));
                    return;
                }
            }
            fs.writeFile('students.json', JSON.stringify(studentsArr), (err) => {
                if (err) return errHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: '修改信息成功' }));
            })

        })
    })
}



// 处理确认删除的请求
function deleteHandle(req, res, index) {
    res.setHeader('Content-Type', 'application/json');
    // console.log(index);
    fs.readFile('students.json', (err, data) => {
        if (err) return errHandle(err, res);
        const studentsArr = JSON.parse(data);
        studentsArr.splice(index, 1);
        fs.writeFile('students.json', JSON.stringify(studentsArr), (err) => {
            if (err) return errHandle(err, res);
            res.end(JSON.stringify({ success: 1, message: '删除成功' }))
        })
    })
}


// 语句中的object_id( ) 是系统函数，作用是返回对应表名在数据库中的ID


/**
 * 
 * 
 *  {
        "StuID": "11111",
        "name": "",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "2222",
        "name": "",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "4444",
        "name": "",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "333",
        "name": "",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "208140",
        "name": "雯雯",
        "age": "21",
        "phone": "15851831235",
        "email": "158962@qq.com",
        "intro": "我是人安稳"
    },
    {
        "StuID": "208140",
        "name": "淳儿",
        "age": "20",
        "phone": "15851830320",
        "email": "1240409716@qq.com",
        "intro": "小鹿迷"
    },
    {
        "StuID": "208140",
        "name": "后羿",
        "age": "24",
        "phone": "15137306985",
        "email": "151@163.com",
        "intro": "不日"
    },
    {
        "StuID": "208140",
        "name": "妲己",
        "age": "21",
        "phone": "15895952185",
        "email": "110@qq.com",
        "intro": "哎呀"
    },
    {
        "StuID": "208140",
        "name": "曹宇",
        "age": "20",
        "phone": "15251321694",
        "email": "1317244865@qq.com",
        "intro": "我是王者"
    },
    {
        "StuID": "208140",
        "name": "嘿嘿",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "",
        "name": "范冰冰",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": "我是李晨的女朋友"
    },
    {
        "StuID": "21058",
        "name": "刘诗诗",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "208140",
        "name": "杨幂",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    },
    {
        "StuID": "返回",
        "name": "返回",
        "age": "21",
        "phone": "",
        "email": "",
        "intro": ""
    }
 */