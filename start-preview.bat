@echo off
echo ======================================
echo 华诚集团高潜储干选拔系统 - 预览服务器
echo ======================================
echo.
echo 正在启动预览服务器...
echo.
echo 访问地址将在浏览器中自动打开
echo.
echo 按 Ctrl+C 可以停止服务器
echo ======================================
echo.

start "" "http://localhost:4173"

npm run preview
