@echo off
cd %~dp0
node --version
node --experimental-modules ./main.js
pause