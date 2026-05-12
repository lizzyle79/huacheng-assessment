@echo off
echo ========================================
echo 🌟 华诚测评系统 - Python启动
echo ========================================
echo.
echo 🚀 正在启动Python服务器...
echo 📱 将自动打开浏览器
echo.
echo ========================================

cd dist

echo ✅ 服务器启动中...
echo 📱 请访问: http://localhost:8888
echo 🎯 关闭窗口停止服务器
echo ========================================

start "" "http://localhost:8888"

python -m http.server 8888

pause
