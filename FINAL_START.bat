@echo off
cls
echo ========================================
echo 🌟 华诚测评系统 - 终极启动方案
echo ========================================
echo.
echo 🚀 正在启动专用服务器...
echo 📱 将自动打开浏览器
echo 🎯 关闭此窗口停止服务器
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo ✅ 检查环境...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 未找到Node.js，尝试使用Python...
    where python >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ 未找到Python，请安装Node.js或Python
        echo 💡 或者使用在线版本
        pause
        exit /b 1
    )
    echo ✅ 使用Python启动服务器...
    cd dist
    start "" "http://localhost:8888"
    python -m http.server 8888
    pause
    exit /b 0
)

echo ✅ 使用Node.js启动服务器...
echo.

node start-cors-server.js

if errorlevel 1 (
    echo.
    echo ❌ Node.js服务器启动失败
    echo 💡 尝试使用备用方法...
    echo.
    pause
)