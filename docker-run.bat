@echo off
echo 🚀 Starting StackCompare with Docker...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

REM Build and start all services
echo 📦 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Check service health
echo 🔍 Checking service health...

REM Check Python API
curl -f http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Python AI API is not responding
) else (
    echo ✅ Python AI API is running on http://localhost:8000
)

REM Check Hono Backend
curl -f http://localhost:4000/api/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Hono Backend is not responding
) else (
    echo ✅ Hono Backend is running on http://localhost:4000
)

REM Check Next.js Frontend
curl -f http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ❌ Next.js Frontend is not responding
) else (
    echo ✅ Next.js Frontend is running on http://localhost:3000
)

echo.
echo 🎉 StackCompare is now running!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:4000
echo 🤖 AI API: http://localhost:8000
echo.
echo To stop all services, run: docker-compose down
echo To view logs, run: docker-compose logs -f
pause 