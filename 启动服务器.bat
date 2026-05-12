@echo off
echo ========================================
echo 🌟 华诚测评系统 - 启动服务器
echo ========================================
echo.
echo 🚀 正在启动本地服务器...
echo 📱 服务器地址: http://localhost:8080
echo 🎯 关闭这个窗口会停止服务器
echo.
echo ========================================
echo.

timeout /t 2 /nobreak

start "" "http://localhost:8080"

node simple-server.js

if errorlevel 1 (
    echo.
    echo ❌ 服务器启动失败！
    echo 💡 请尝试其他启动方法
    echo.
    pause
)
