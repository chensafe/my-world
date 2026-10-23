@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "SERVER_JAVA=%~dp0runtime\java25\bin\java.exe"
if exist java_path.txt set /p SERVER_JAVA=<java_path.txt
"%SERVER_JAVA%" -version
if errorlevel 1 (
 echo Java启动失败。请完整解压，或在java_path.txt填写64位Java25的java.exe路径。
 pause
 exit /b 1
)
echo SkyExplorer v0.1.5 / Minecraft 1.21.1 / NeoForge 21.1.249
"%SERVER_JAVA%" @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.249/win_args.txt nogui
pause
