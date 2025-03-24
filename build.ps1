# 构建脚本
Write-Host "开始构建 DeepGeek 平台..." -ForegroundColor Green

# 检查环境
Write-Host "Node.js 版本:" -ForegroundColor Cyan
node -v

Write-Host "NPM 版本:" -ForegroundColor Cyan
npm -v

# 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
npm install

# 执行构建
Write-Host "执行构建..." -ForegroundColor Yellow
npm run build

# 构建完成
Write-Host "构建完成!" -ForegroundColor Green
