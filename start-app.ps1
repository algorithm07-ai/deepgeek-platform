# 简化的DeepGeek应用启动脚本
Write-Host "正在准备启动DeepGeek应用..." -ForegroundColor Green

# 清理缓存和构建文件
Write-Host "清理缓存和构建文件..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "已删除.next目录" -ForegroundColor Green
}
npm cache clean --force

# 重新安装依赖
Write-Host "重新安装所有依赖..." -ForegroundColor Yellow
npm install

# 构建项目
Write-Host "构建项目..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# 检查构建是否成功
if (Test-Path ".next") {
    # 启动应用
    Write-Host "启动应用..." -ForegroundColor Green
    Write-Host "应用将在以下地址可用: http://localhost:3000" -ForegroundColor Cyan
    npm run start
} else {
    Write-Host "构建失败，无法启动应用。" -ForegroundColor Red
    Write-Host "请检查是否有错误信息。" -ForegroundColor Red
}
