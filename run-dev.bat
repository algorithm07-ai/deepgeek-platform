@echo off
echo Starting DeepGeek Platform...
cd /d %~dp0
set NODE_OPTIONS=--max-old-space-size=4096
call npm run dev
pause
