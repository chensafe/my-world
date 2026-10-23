@echo off
setlocal
cd /d "%~dp0"
set "JAVA_HOME=%~dp0.minecraft\versions\SkyExplorer\runtime\java-runtime-25"
set "PATH=%JAVA_HOME%\bin;%PATH%"
start "" "%~dp0Plain Craft Launcher 2.exe"
