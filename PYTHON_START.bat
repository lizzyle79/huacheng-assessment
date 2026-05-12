@echo off
cls
echo ========================================
echo Huacheng Assessment - Python Server
echo ========================================
echo.
echo Starting Python server...
echo Visit: http://localhost:8888
echo Close this window to stop server
echo ========================================
echo.

cd /d "%~dp0\dist"

start "" "http://localhost:8888"

python -m http.server 8888

pause