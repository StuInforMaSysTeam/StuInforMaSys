
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
    const regex = /(\.js|\.css|\.html|\/$)|(fonts+)/;

    if (regex.test(req.url)) {
        const r = fs.createReadStream('www' + (req.url == '/' ? '/index.html' : req.url));
        r.pipe(res);
    }
    console.log(req.url);





})






// 4、监听端口
server.listen(3000, () => {
    // console.log('====3000...');
})