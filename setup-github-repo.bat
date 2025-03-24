@echo off
echo ===== DeepGeek GitHub仓库初始化脚本 =====
echo.

REM 设置变量
set REPO_NAME=deepgeek-platform
set GITHUB_USERNAME=algorithm07-ai

echo 当前工作目录: %CD%
echo 目标GitHub仓库: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo 请确认以上信息正确，如需修改请编辑此脚本。
echo.
pause

REM 初始化Git仓库（如果尚未初始化）
if not exist .git (
    echo 初始化Git仓库...
    git init
    echo Git仓库已初始化
) else (
    echo Git仓库已存在，跳过初始化步骤
)

REM 添加.gitignore文件（如果不存在）
if not exist .gitignore (
    echo 创建.gitignore文件...
    echo node_modules> .gitignore
    echo .next>> .gitignore
    echo .env>> .gitignore
    echo .env.local>> .gitignore
    echo .DS_Store>> .gitignore
    echo *.log>> .gitignore
    echo .vercel>> .gitignore
    echo 已创建.gitignore文件
) else (
    echo .gitignore文件已存在
)

REM 添加所有文件到Git
echo 添加文件到Git...
git add .
echo 文件已添加

REM 创建初始提交
echo 创建初始提交...
git commit -m "初始提交: DeepGeek平台"
echo 初始提交已创建

REM 添加GitHub远程仓库
echo 添加GitHub远程仓库...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo GitHub远程仓库已添加

echo.
echo ===== 准备工作已完成 =====
echo.
echo 接下来，您需要:
echo 1. 在GitHub上创建名为 %REPO_NAME% 的新仓库（不要初始化）
echo 2. 运行以下命令推送代码:
echo    git push -u origin main
echo.
echo 3. 在GitHub仓库设置中添加以下Secrets用于GitHub Actions:
echo    - VERCEL_TOKEN
echo    - VERCEL_ORG_ID
echo    - VERCEL_PROJECT_ID
echo    - NEXTAUTH_SECRET
echo    - 其他必要的环境变量
echo.
echo 完成后，GitHub Actions将自动部署您的项目到Vercel。
echo.
pause
