@echo off
title Bhutta Khussa Mehal - Store Runner
cls
echo ================================================================
echo           BHUTTA KHUSSA MEHAL - FULL MERN STORE
echo ================================================================
echo.
echo [1/2] Starting Backend API Server (Port 5001)...
start "Bhutta Khussa Mehal - Backend API (5001)" cmd /k "cd server && npm start"
echo.
timeout /t 3 /nobreak >nul
echo [2/2] Starting Frontend React Application (Port 3000)...
start "Bhutta Khussa Mehal - Frontend React (3000)" cmd /k "cd client && npm start"
echo.
echo ================================================================
echo  Servers are starting in separate windows:
echo.
echo  * Store Frontend : http://localhost:3000
echo  * Admin Login    : http://localhost:3000/admin/login
echo    - Email        : admin@bhuttakhussamehal.com
echo    - Password     : admin123
echo  * Backend API    : http://localhost:5001/api
echo  * API Health     : http://localhost:5001/api/health
echo ================================================================
echo.
echo Keep this window or the server windows open while using the store.
echo Press any key to close this runner launcher...
pause >nul
