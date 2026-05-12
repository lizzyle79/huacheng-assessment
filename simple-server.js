const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const DIST_PATH = path.join(__dirname, 'dist');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_PATH, req.url === '/' ? 'index.html' : req.url);

    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🌟 华诚测评系统服务器启动成功！');
    console.log(`📱 请在浏览器中访问: http://localhost:${PORT}`);
    console.log('🎯 关闭这个窗口会停止服务器');
    console.log('========================================');
});

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
    });
}, 1000);