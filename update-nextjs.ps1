# 更新Next.js版本以支持Node.js 22.x
Write-Host "更新Next.js版本以支持Node.js 22.x..." -ForegroundColor Green

# 检查当前Node.js版本
$nodeVersion = node -v
Write-Host "当前Node.js版本: $nodeVersion" -ForegroundColor Cyan

# 备份原始package.json
Copy-Item -Path "package.json" -Destination "package.json.backup"
Write-Host "已备份原始package.json到package.json.backup" -ForegroundColor Yellow

# 更新Next.js和相关依赖
Write-Host "更新Next.js和相关依赖..." -ForegroundColor Yellow
npm install next@latest react@latest react-dom@latest

# 更新ESLint配置
Write-Host "更新ESLint配置..." -ForegroundColor Yellow
npm install eslint-config-next@latest --save-dev

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
npm run build

# 完成
Write-Host "Next.js更新完成!" -ForegroundColor Green
Write-Host "要启动应用，请运行: npm start" -ForegroundColor Cyan
Write-Host "应用将在以下地址可用: http://localhost:3000" -ForegroundColor Cyan
