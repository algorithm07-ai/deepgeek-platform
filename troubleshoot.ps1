# 故障排除脚本
Write-Host "开始DeepGeek平台故障排除..." -ForegroundColor Green

# 检查环境
Write-Host "环境信息:" -ForegroundColor Cyan
Write-Host "Node.js版本: $(node -v)"
Write-Host "NPM版本: $(npm -v)"

# 清理缓存和临时文件
Write-Host "清理缓存和临时文件..." -ForegroundColor Yellow
if (Test-Path -Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host ".next目录已删除"
}
if (Test-Path -Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "node_modules/.cache已删除"
}

# 检查package.json
Write-Host "检查package.json..." -ForegroundColor Yellow
$packageJson = Get-Content -Raw -Path "package.json" | ConvertFrom-Json
Write-Host "项目名称: $($packageJson.name)"
Write-Host "项目版本: $($packageJson.version)"
Write-Host "Next.js版本: $($packageJson.dependencies.next)"

# 尝试安装依赖
Write-Host "重新安装依赖..." -ForegroundColor Yellow
npm install

# 尝试构建
Write-Host "尝试构建项目..." -ForegroundColor Yellow
npm run build

# 检查构建结果
if (Test-Path -Path ".next") {
    Write-Host "构建成功! .next目录已创建" -ForegroundColor Green
} else {
    Write-Host "构建失败! 未找到.next目录" -ForegroundColor Red
}

Write-Host "故障排除完成" -ForegroundColor Green
