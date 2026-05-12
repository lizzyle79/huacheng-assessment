@echo off
cls
echo ========================================
echo Huacheng Assessment Server
echo ========================================
echo.
echo Starting server...
echo Browser will open automatically
echo Close this window to stop server
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo Checking environment...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not found, trying Python...
    where python >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo Please install Node.js or Python
        pause
        exit /b 1
    )
    echo Starting Python server...
    cd dist
    start "" "http://localhost:8888"
    python -m http.server 8888
    pause
    exit /b 0
)

echo Starting Node.js server...
echo.

node start-cors-server.cjs

if errorlevel 1 (
    echo.
    echo Server failed to start
    pause
)