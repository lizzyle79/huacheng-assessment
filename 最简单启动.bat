@echo off
echo ========================================
echo 🌟 华诚测评系统 - 一键启动
echo ========================================
echo.
echo 🚀 正在启动...
echo 📱 将自动打开浏览器
echo.
echo ========================================

cd dist

echo ✅ 服务器启动中...
echo 📱 请访问: http://localhost:3000
echo 🎯 关闭窗口停止服务器
echo ========================================

start "" "http://localhost:3000"

npx serve -s . -p 3000

pause
