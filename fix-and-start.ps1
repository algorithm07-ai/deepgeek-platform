# DeepGeek应用修复和启动脚本
Write-Host "开始修复和启动DeepGeek应用..." -ForegroundColor Green

# 设置更大的Node.js内存限制
$env:NODE_OPTIONS="--max-old-space-size=4096"
Write-Host "已设置Node.js内存限制为4GB" -ForegroundColor Cyan

# 清理项目
Write-Host "清理项目..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "已删除.next目录" -ForegroundColor Green
}
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "已删除node_modules目录" -ForegroundColor Green
}
npm cache clean --force
Write-Host "已清理npm缓存" -ForegroundColor Green

# 检查next.config.js文件
$nextConfigPath = "next.config.js"
if (Test-Path $nextConfigPath) {
    Write-Host "检查next.config.js文件..." -ForegroundColor Yellow
    $nextConfig = Get-Content $nextConfigPath -Raw
    
    # 创建简化版的next.config.js
    $simpleConfig = @"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
"@
    
    Set-Content -Path $nextConfigPath -Value $simpleConfig
    Write-Host "已简化next.config.js配置" -ForegroundColor Green
}

# 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
npm install

# 构建项目
Write-Host "构建项目..." -ForegroundColor Yellow
npm run build

# 检查构建是否成功
if (Test-Path ".next") {
    # 启动应用
    Write-Host "构建成功！正在启动应用..." -ForegroundColor Green
    Write-Host "应用将在以下地址可用: http://localhost:3000" -ForegroundColor Cyan
    npm run start
} else {
    Write-Host "构建失败，尝试使用开发模式启动..." -ForegroundColor Yellow
    Write-Host "应用将在以下地址可用: http://localhost:3000" -ForegroundColor Cyan
    npm run dev
}
