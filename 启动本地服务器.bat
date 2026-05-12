@echo off
echo ========================================
echo 🌟 华诚测评系统 - 本地服务器启动
echo ========================================
echo.
echo 🚀 正在启动本地服务器...
echo 📱 将自动打开浏览器
echo 🎯 按 Ctrl+C 可停止服务器
echo.
echo ========================================
echo.

cd dist
start "" "http://localhost:8080"

python -m http.server 8080

pause
