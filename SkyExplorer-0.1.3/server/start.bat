@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "SERVER_JAVA=java"
if defined JAVA_HOME set "SERVER_JAVA=%JAVA_HOME%\bin\java.exe"
if exist java_path.txt set /p SERVER_JAVA=<java_path.txt
"%SERVER_JAVA%" -version
if errorlevel 1 (
 echo 请安装 64 位 Java 21，或在 java_path.txt 中填写 java.exe 的完整路径。
 pause
 exit /b 1
)
echo 正在启动 SkyExplorer 0.1.3 服务端，请使用 Java 21。
"%SERVER_JAVA%" @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.249/win_args.txt nogui
pause
