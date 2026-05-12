@echo off
echo ========================================
echo 🌟 华诚测评系统 - 一键启动
echo ========================================
echo.
echo 🚀 正在启动本地服务器...
echo 📱 将自动打开浏览器
echo 🎯 关闭Claude后仍可继续使用！
echo.
echo ========================================
echo.

cd dist
start "" "http://localhost:8000"

python -m http.server 8000
