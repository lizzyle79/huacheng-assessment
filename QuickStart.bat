@echo off
echo Starting Huacheng Assessment System...
echo.
echo Server will start at: http://localhost:3000
echo Browser will open automatically
echo.
echo Keep this window open to keep the server running
echo Close this window to stop the server
echo ========================================
echo.

cd dist

echo Installing and starting server...
timeout /t 2 /nobreak

start "" "http://localhost:3000"

npx serve -s . -p 3000

pause
