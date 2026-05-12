const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const DIST_PATH = path.join(__dirname, 'dist');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);

    // 处理根路径
    let filePath = path.join(DIST_PATH, req.url === '/' ? 'index.html' : req.url);

    // 获取文件扩展名
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // 添加CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 读取文件
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log(`❌ 文件不存在: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - 文件未找到</h1><p>请确保dist文件夹中有所需文件</p>', 'utf-8');
            } else {
                console.log(`❌ 服务器错误: ${error.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>500 - 服务器错误</h1><p>' + error.code + '</p>', 'utf-8');
            }
        } else {
            console.log(`✅ 成功发送: ${filePath}`);
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('🌟 华诚测评系统服务器启动成功！');
    console.log('📱 请在浏览器中访问: http://localhost:' + PORT);
    console.log('🎯 关闭此窗口停止服务器');
    console.log('=' .repeat(60));

    // 自动打开浏览器
    setTimeout(() => {
        const url = `http://localhost:${PORT}`;
        const command = process.platform === 'win32' ? 'start' :
                       process.platform === 'darwin' ? 'open' : 'xdg-open';
        exec(`${command} ${url}`, (error) => {
            if (error) {
                console.log('💡 请手动在浏览器中打开: ' + url);
            } else {
                console.log('✅ 浏览器已自动打开');
            }
            console.log('=' .repeat(60));
        });
    }, 1000);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('❌ 端口 ' + PORT + ' 已被占用！');
        console.log('💡 请尝试关闭其他程序或更改端口');
    } else {
        console.log('❌ 服务器错误: ' + err);
    }
    process.exit(1);
});