@echo off
echo Starting Shoufly Delivery App on Windows...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if database schema is up to date
echo Updating database schema...
npm run db:push
if %errorlevel% neq 0 (
    echo Warning: Database push failed. Please check your DATABASE_URL
)

REM Start the application
echo Starting server...
set NODE_ENV=development
npx tsx server/index.ts

pause