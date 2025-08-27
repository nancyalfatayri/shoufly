@echo off
echo Building and starting Shoufly Delivery App in production mode...

REM Build the application
echo Building application...
npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

REM Start in production mode
echo Starting in production mode...
set NODE_ENV=production
node dist/index.js

pause